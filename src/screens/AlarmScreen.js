import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
// import { isAM, isPM } from "is-am-pm";
// import format from "formatter-datetime";
import axios from "axios";

import Item from "./../components/Item";

const AlarmScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(null);
  useEffect(() => {
    const fetchAlarms = async () => {
      let reqOptions = {
        url: "http://3.252.69.159:8080/alarm",
        method: "GET",
      };

      let response = await axios.request(reqOptions);
      setAlarms(response.data.alarm_times);
    };
    fetchAlarms();
  }, [alarms]);
  let updatedAlarms={};
  if (alarms.length > 0) {
    updatedAlarms = alarms.map((alarm) => {
      const [hour, minute] = alarm.alarm_time.split(":");
      const updatedHour = (parseInt(hour) + 1) % 24; // increment hour and wrap around to 0 at 24
      return {
        ...alarm,
        alarm_time: `${updatedHour.toString().padStart(2, "0")}:${minute}`, // pad zero to single-digit hour
      };
    });

    // setAlarms(updatedAlarms);
  }
  const handleFloatingPress = () => {
    setTime(new Date());
    setModalVisible(true);
  };
  const getValue = (timeNow) => {
    const hour = timeNow.getHours() - 1;
    const minutes = timeNow.getMinutes();
    let min = "";
    if (minutes < 10) min = "0" + minutes;
    else min = "" + minutes;
    if (hour < 10) h = "0" + hour;
    else h = "" + hour;
    const formatted_time = h + ":" + min;
    // console.log(formatted_time);
    return formatted_time;
  };
  const generateDate = () => {
    const date = new Date();
    // console.log(date)
    let d = "" + date.getDate();
    let m = "" + (date.getMonth() + 1);
    let y = "" + date.getFullYear();
    let finalDate = "";
    if (d.length < 2) {
      d = "0" + d;
    }
    if (m.length < 2) {
      m = "0" + m;
    }
    finalDate = y + "-" + m + "-" + d;
    // console.log(finalDate);
    return finalDate;
  };
  generateDate();
  const onChange = async (event, selectedTime) => {
    const currentTime = selectedTime;
    // console.log(currentTime);
    setModalVisible(false);
    setTime(currentTime);
    const t = getValue(currentTime);
    // console.log(t);
    const newDate = generateDate();
    const newAlarm = {
      id: "" + new Date(),
      time: t,
      date: newDate,
    };
    const newAlarmState = {
      id: "" + new Date(),
      alarm_time: t,
      alarm_date: newDate,
    };

    let reqOptions = {
      url: "http://3.252.69.159:8080/alarm",
      method: "POST",
      data: newAlarm,
    };

    let response = await axios.request(reqOptions);
    // console.log(response.data.status);
    setAlarms(alarms.concat(newAlarmState));
  };
  // console.log(time);
  // console.log(alarms);
  return (
    <View style={styles.container}>
      {modalVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={true}
          onChange={onChange}
          // onChange={onChange}
        />
      )}
      <FlatList
        data={updatedAlarms}
        renderItem={({ item }) => (
          <Item
            time={item.alarm_time}
            date={item.alarm_date}
            setAlarms={setAlarms}
            key={item.id}
            id={item.id}
            alarms={alarms}
          />
        )}
      />
      <Pressable
        style={styles.floatingIcon}
        onPress={() => handleFloatingPress()}
      >
        <Ionicons name="add" size={34} color="#fefefe" />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // marginTop: 22,
  },
  floatingIcon: {
    // borderWidth: 1,
    // borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#044B7F",
    borderRadius: 50,
  },
  modalView: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default AlarmScreen;
