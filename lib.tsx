declare module "sendsms" {

  import React from "react";

  class SendSms {
    constructor();

    infor_obj: any;
    phone_array: any[];

    checkTimeActive(): void;
    saveInformation(name: String, slot: number,type :String): void;
    setInfor(infor : any) : void
  }
  const regexPhoneNumber: (phone: String) => boolean;



  interface ModalFillPhoneProps {
    open: boolean;
    onShow: () => void;
    changeTextPhone: (text: String) => void;
    changeTextComfirmPhone: (text: String) => void;
    pressCancle: () => void;
    pressConfirm: () => void;
    check_phone: number; // or whatever type CHECK is
    valuePhone: String;
    valueConfirmPhone: String;
  }
  const ModalFillPhone: React.FC<ModalFillPhoneProps>;

  export {regexPhoneNumber,SendSms,ModalFillPhone}
}

/// "<reference path="../../node_modules/TcpLib/src/lib/lib.tsx" />" // example to use type module file
