import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { getDateTimeCurrent } from "./utils";
moment.locale("vi");

export class SendSms {
  constructor() {
    this.infor_obj = {};
    this.phone_array = [];
  }

  saveInformation(phone, slot,type) {
    this.obj =
      this.infor_obj === undefined || this.infor_obj.length === 0 ? {} : this.infor_obj;
    this.obj_save = {
      [`${type}${slot}`]: {
        phone: phone,
        active :  getDateTimeCurrent()
      },
    };

    this.infor_obj = Object.assign(this.obj, this.obj_save);
    return this.infor_obj

  }
  checkTimeActive() {
    let temp_phone_array = [];
    for (const ele in this.infor_obj) {
      if (moment().diff(moment(this.infor_obj[ele].active), "seconds") > 5) {
        console.log(this.infor_obj[ele], " heet han");
        temp_phone_array.push(this.infor_obj[ele]);
      } else {
        continue
      }
    }

    this.phone_array = temp_phone_array;
    return this.phone_array
  }

  setInfor(infor) {
    this.infor_obj = infor
  }

}
