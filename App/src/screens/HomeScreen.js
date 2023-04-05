import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingIndicator from "./../components/LoadingIndicator";
import Chart from "./../components/Chart";
import ChartM from "./../components/ChartM";
import { client } from "./../../request";

const HomeScreen = () => {
  const [sensorData, setSensorData] = useState([]);
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        await client.get("/sensors").then((response) => {
          setSensorData(response.data.sensors);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSensorData();
  }, []);
  if (sensorData !== []) {
    const labels = [];
    const soundData = [];
    tiltData = [];
    sensorData.forEach((data) => {
      const timestamp = new Date(data.timestamp);
      const tilt = data.tilt;
      const sound = data.sound;
      labels.push(timestamp.toString());
      soundData.push(sound);
      tiltData.push(tilt);
    });
    const soundDataReq = sensorData.map((item) => ({
      x: item.id,
      y: item.sound,
    }));
    const tiltDataReq = sensorData.map((item) => ({
      x: item.id,
      y: item.tilt,
    }));
    let totalTemp = 0;
    let totalHumidity = 0;
    for (let i = 0; i < sensorData.length; i++) {
      totalTemp += sensorData[i].temperature;
      totalHumidity += sensorData[i].humidity;
    }
    const avgTemp = (totalTemp / sensorData.length).toFixed(1);
    const avgHumidity = (totalHumidity / sensorData.length).toFixed(1);
    // console.log(sensorData);
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.chartContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 16, padding: 10 }}>
            Sound:{" "}
          </Text>
          <Chart plotData={soundDataReq} />
          <Text style={{ fontWeight: "bold", fontSize: 16, padding: 10 }}>
            Motion:{" "}
          </Text>
          <ChartM plotData={tiltDataReq} />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.singleButtonContainer}>
            <View style={styles.buttonBackground}>
              <ImageBackground
                source={require("../../assets/images/temp.gif")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 5,
                }}
              >
                <View style={styles.buttonText}>
                  <Text
                    style={{
                      color: "#256",
                      fontWeight: "bold",
                      fontSize: 22,
                    }}
                  >
                    Average Temperature
                  </Text>
                  <Text style={{ color: "#256", fontSize: 18 }}>
                    {avgTemp} °C
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.singleButtonContainer}>
            <View style={styles.buttonBackground}>
              <ImageBackground
                source={require("../../assets/images/rainfall.gif")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 5,
                }}
              >
                <View style={styles.buttonText}>
                  <Text
                    style={{
                      color: "#ff8c00",
                      fontWeight: "bold",
                      fontSize: 22,
                    }}
                  >
                    Average Humidity
                  </Text>
                  <Text style={{ color: "#ff8c00", fontSize: 18 }}>
                    {avgHumidity} %
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return <LoadingIndicator />;
  }
};
const styles = StyleSheet.create({
  chartContainer: {
    // height: "75%",
    justifyContent: "space-around",
    flex: 0.75,
  },
  buttonContainer: {
    height: "25%",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
    flex: 0.25,
  },
  singleButtonContainer: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBackground: {
    backgroundColor: "#841584",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    borderRadius: 5,
    flex: 0.9,
  },
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  buttonText: {
    justifyContent: "center",
    alignItems: "flex-end",
    color: "#fefefe",
    height: "100%",
    padding: 10,
    elevation: 3,
  },
});
export default HomeScreen;
