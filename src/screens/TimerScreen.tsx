import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonDateTimePicker from '../components/ButtonDateTimePicker';
import colors from '../utils/colors';
import moment from 'moment';


const URL_REQUEST = "http://40.127.85.53:8080/add-job"

function TimerScreen({navigation}) {
  const [isDatePickerStartVisible, setDatePickerStartVisibility] = useState(false);
  const [isDatePickerEndVisible, setDatePickerEndVisibility] = useState(false);
  const [startOrEnd, setStartOrEnd] = useState<string>();
  const [modePicker, setModePicker] = useState<string>("date");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [isDatePickerStartAndroidVisible, setIsDatePickerStartAndroidVisible] = useState(false);
  const [isTimePickerStartAndroidVisible, setIsTimePickerStartAndroidVisible] = useState(false);

  const showDateStartPicker = () => {
    if (Platform.OS == "android") {
      setIsDatePickerStartAndroidVisible(true);
      setStartOrEnd("start");
    } else {
      setDatePickerStartVisibility(true);
      setStartOrEnd("start");
    }
  };

  const showDateEndPicker = () => {
    if(Platform.OS == "android") {
      setIsDatePickerStartAndroidVisible(true);
      setStartOrEnd("end");
    }
    setDatePickerEndVisibility(true);
    setStartOrEnd("end");
  };

  const shouldHidePopUp = () => {
    if (Platform.OS == "android") {
      if(modePicker == "date") {
        setModePicker("time")
        setIsDatePickerStartAndroidVisible(false);
        setIsTimePickerStartAndroidVisible(true);
      } else {
        setModePicker("date");
        setIsDatePickerStartAndroidVisible(false);
        setIsTimePickerStartAndroidVisible(false);
      }
    } else {
      if (modePicker == "date") {
        setModePicker("time");
      } else {
        setModePicker("date");
        setDatePickerStartVisibility(false);
        setDatePickerEndVisibility(false);
      }
    }
  };

  const handleConfirm = (date: Date) => {
    startOrEnd == "start" ? setDateTimeAfterPick(date) : setDateTimeAfterPick(date);
    shouldHidePopUp();
  };

  const setDateTimeAfterPick = (date: Date) => {
    date.setSeconds(0);
    if (startOrEnd == "start" && modePicker == "date") {
      setStartDate(date);
    } else if (startOrEnd == "start" && modePicker == "time") {
      setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    } else if (startOrEnd == "end" && modePicker == "date") {
      setEndDate(date);
    } else if (startOrEnd == "end" && modePicker == "time") {
      setEndDate(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }
  }

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  async function sendRequest() {
    const startDateRequest = moment(startDate).format("MM-DD-YYYY HH:mm:ss");
    const endDateRequest = moment(endDate).format("MM-DD-YYYY HH:mm:ss");
    console.log(startDateRequest);
    console.log(endDateRequest);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ "start": startDateRequest, "stop": endDateRequest })
    }
    fetch(URL_REQUEST, requestOptions)
        .then(async response => {
            const data = await response.json();
            console.log(data);
            navigation.navigate('Monitor')
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                console.log(response)
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

  }

  return (
    <SafeAreaView>
     <View style={styles.container}>
       <Text style={styles.title}>Chọn thời gian bắt đầu và kết thúc</Text>
      <DateTimePickerModal
        isVisible={isDatePickerStartVisible}
        mode={modePicker}
        onConfirm={handleConfirm}
        onCancel={shouldHidePopUp}
      />
      <DateTimePickerModal
        isVisible={isDatePickerEndVisible}
        mode={modePicker}
        onConfirm={handleConfirm}
        onCancel={shouldHidePopUp}
      />
      <ButtonDateTimePicker type="Mở máy bơm" date={startDate.toLocaleString("en-US", options)} onPress={showDateStartPicker} startOrEnd="start" />
      <ButtonDateTimePicker type="Tắt máy bơm" date={endDate.toLocaleString("en-US", options)} onPress={showDateEndPicker} startOrEnd="end" />
      <DateTimePickerModal
        isVisible={isDatePickerStartAndroidVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={shouldHidePopUp}
      />
      <DateTimePickerModal
        isVisible={isTimePickerStartAndroidVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={shouldHidePopUp}
      />

      <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={sendRequest}>
          <Text style={styles.textButton}>Hẹn giờ</Text>
     </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
    position: "relative"
  },
  title: {
    fontSize: 16,
    color: "#434657",
    marginBottom: 16
  },
  buttonSubmit: {
    backgroundColor: colors.WATER_COLORS_DEFAULT,
    color: colors.WATER_COLORS_DEFAULT,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 5
  },
  textButton: {
    color: colors.WHITE
  }
})

export default TimerScreen;