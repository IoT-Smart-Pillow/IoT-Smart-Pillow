import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import RootStackScreen from "./src/screens/RootStackScreen";

export default function App() {
  return (
    // <NavigationContainer>
    // <View style={styles.conatainer}>
      <RootStackScreen />
    // </View>
    // </NavigationContainer>
  );
}

