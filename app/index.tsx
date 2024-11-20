import { StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View>
      <Text>Po</Text>
      <Link href={{ pathname: "/screens/auth/login" }}>Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
