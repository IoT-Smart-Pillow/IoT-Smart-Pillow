import { View, Text, StyleSheet, Switch, Pressable,Button } from "react-native";
import React, { useState } from "react";

const Item = (props) => {
  const { time, date, on, title, count, setAlarms, id } = props;
  const [isEnabled, setIsEnabled] = useState(on);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const handleDelete = (id) => {
    console.log(id);
  };
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.time}>{time}</Text>
        <Text style={{ flex: 1, fontSize: 12 }}>{date}</Text>
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 12 }}>Alarm</Text>
      </View>
      <Button title="DELETE"style={{ elevation: 100 }} onClick={()=>console.log(id)}>
        <Text
          style={{
            color: "red",
            borderWidth: 1,
            borderColor: "red",
            padding: 5,
          }}
        >
          DELETE
        </Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    // backgroundColor: "lightblue",
    paddingVertical: 20,
    // marginVertical: 3,
    // marginHorizontal: 16,
    fles: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    // elevation:1
  },
  time: {
    paddingHorizontal: 10,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Item;
