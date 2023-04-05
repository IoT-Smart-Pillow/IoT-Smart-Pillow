import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./HomeScreen";
import AlarmScreen from "./AlarmScreen";

const RootStack = createBottomTabNavigator();
const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Alarms") {
              iconName = focused ? "alarm" : "alarm-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#044B7F",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Alarms" component={AlarmScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
