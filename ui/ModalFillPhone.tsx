import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const CHECK = {
  W_FORMAT: -1,
  W_CONFIRM: -2,
  CORRECT: 0,
  NULL: -3,
  SUCCESS: 1,
  FAIL: -4,
};

const Touch = (props: any) => {
  const {name, onPress, backgroundColor} = props;
  return (
    <TouchableOpacity
      style={[{backgroundColor: backgroundColor}, styles.touch]}
      onPress={onPress}>
      <Text style={styles.textTouch}>{name}</Text>
    </TouchableOpacity>
  );
};

const FillPhoneNumber = (props: any) => {
  const {label, placeholder, value, onChangeText} = props;
  return (
    <View>
      <Text style={styles.labelInput}>{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={styles.textinput}
        keyboardType="number-pad"
        placeholder={placeholder}
        placeholderTextColor={'#BDBDBD'}
      />
    </View>
  );
};

export const ModalFillPhone = (props: any) => {
  const {
    open,
    onShow,
    changeTextPhone,
    changeTextComfirmPhone,
    pressCancle,
    pressConfirm,
    check_phone,
    valuePhone,
    valueConfirmPhone,
  } = props;

  const ShowText = () => {
    const styleText =
      check_phone === CHECK.SUCCESS
        ? [{color: 'green'}, styles.checkPhoneText]
        : [{color: 'red'}, styles.checkPhoneText];
    return (
      <>
        {check_phone === CHECK.W_FORMAT ? (
          <Text style={styleText}>Số điện thoại không đúng định dạng</Text>
        ) : check_phone === CHECK.W_CONFIRM ? (
          <Text style={styleText}>Số điện thoại không trùng nhau</Text>
        ) : check_phone === CHECK.NULL ? (
          <Text style={styleText}>Số điện thoại không được để trống</Text>
        ) : check_phone === CHECK.SUCCESS ? (
          <Text style={styleText}>Đăng ký nhận thông báo thành công</Text>
        ) : check_phone === CHECK.FAIL ? (
          <Text style={styleText}>Đăng ký nhận thông báo thất bại</Text>
        ) : null}
      </>
    );
  };

  return (
    <View>
      <Modal transparent={true} visible={open} onShow={onShow}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textNotifi}>
              Nhập số điện thoại để nhận thông báo {'\n'} khi máy hoàn thành
            </Text>
            <FillPhoneNumber
              onChangeText={changeTextPhone}
              label={'Số điện thoại'}
              placeholder="Ví dụ : 0123456789"
              value={valuePhone}
            />
            <FillPhoneNumber
              onChangeText={changeTextComfirmPhone}
              label={'Xác nhận số điện thoại'}
              value={valueConfirmPhone}
            />
            <ShowText />
            <View style={styles.viewTouch}>
              <Touch
                backgroundColor={'red'}
                name={'Hủy'}
                onPress={pressCancle}
              />
              <Touch
                backgroundColor={'blue'}
                name={'Xác nhận'}
                onPress={pressConfirm}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: (width * 80) / 100,
    height: (height * 55) / 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 10,
  },
  viewTouch: {
    width: (width * 80) / 100,
    height: (height * 15) / 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  textNotifi: {
    fontSize: (height * 1.8) / 100,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  textinput: {
    width: (width * 70) / 100,
    height: (height * 8) / 100,
    backgroundColor: '#f2f1f1',
    borderRadius: 15,
    paddingLeft: (width * 4) / 100,
    fontSize: (height * 1.6) / 100,
    color: 'black',
    fontWeight: '500',
  },
  textTouch: {
    fontSize: (height * 1.6) / 100,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  touch: {
    width: (width * 30) / 100,
    height: (height * 7) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  labelInput: {
    fontSize: (height * 1.6) / 100,
    fontWeight: 'bold',
    color: 'black',
    padding: (height * 1) / 100,
  },
  checkPhoneText: {
    fontSize: (height * 1.6) / 100,
    fontWeight: 'bold',
  },
});
