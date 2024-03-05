import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { getDateTimeCurrent } from "./utils";
moment.locale("vi");

const STATUS = {
  SUCCESS: 1,
  FAIL: -1,
  SENDED: 2,
};

export class SendSms {
  constructor() {
    this.infor_obj = {};
    this.phone_array = [];
    this.array_upload_log = [];
  }

  saveInformation(phone, slot, type) {
    this.obj =
      this.infor_obj === undefined || this.infor_obj.length === 0
        ? {}
        : this.infor_obj;
    this.obj_save = {
      [`${type}${slot}`]: {
        phone: phone,
        active: getDateTimeCurrent(),
        slot: slot,
      },
    };

    this.infor_obj = Object.assign(this.obj, this.obj_save);
    return this.infor_obj;
  }

  checkTimeActive() {
    let temp_phone_array = [];
    for (const ele in this.infor_obj) {
      if (this.infor_obj[ele].status === undefined) {
        if (moment().diff(moment(this.infor_obj[ele].active), "seconds") > 5) {
          let obj = {
            [`${ele}`]: this.infor_obj[ele],
          };
          temp_phone_array.push(obj);
        }
      }
    }

    this.phone_array = temp_phone_array;
    return this.phone_array;
  }

  // set data to infor_obj.

  setInfor(infor) {
    this.infor_obj = infor;
  }

  // change status when send success
  handleSendToBoard(key) {
    this.infor_obj[`${key}`].status = STATUS.SENDED;
  }
  // remove value when module sim send sms to user sucess or fail
  handleArrayInfor(key) {
    delete this.infor_obj[`${key}`];
  }
  // return object to upload log to server
  changeStatusToUpload(key, status) {
    this.infor_obj[key].status =
      status === STATUS.SUCCESS ? STATUS.SUCCESS : STATUS.FAIL;
  }

  getLogToUPload(deviceId) {
    this.array_upload_log = [];
    for (const ele in this.infor_obj) {
      let infor = this.infor_obj[ele];
      if (infor.status === undefined) {
        continue;
      } else {
        let flag = false;
        if (infor.status === STATUS.SENDED) {
          if (moment().diff(moment(infor.active), "seconds") > 5) {
            flag = true;
          }
        } else {
          flag = true;
        }
        if (flag) {
          let slot = key.includes("wash")
            ? key.replaceAll("wash")
            : key.replaceAll("dry");
          let log = {
            active: infor.active,
            slot: Number(slot),
            phone: infor.phone,
            status: infor.status,
          };
          let data = {
            deviceId: deviceId,
            log: log,
          };

          this.array_upload_log.push(data);
        }
      }
    }
  }
}
