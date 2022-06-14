import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { svgImages } from "./svgs";
import * as navigation from "./navigate";


export default function EmptyPoll({ ishosting }) {
  const info = {
    image: ishosting ? svgImages.noHosted : svgImages.noJoined,
    text: ishosting
      ? "You have not created any polls"
      : "You don't have any open polls.",
    subText: ishosting
      ? "You've thought about it now get feedback from a new point of view."
      : "Let others know how you feel. Join a poll now and let your voice be heard.",
    color: ishosting ? "#208110" : "#7F7BC7",
  };
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <View style={{ marginBottom: 100, alignItems: "center" }}>
        {info.image}
        <Text style={styles.text}>{info.text}</Text>
        <Text style={styles.subText}>{info.subText}</Text>
        <View style={styles.overlay} />
        <TouchableOpacity
          onPress={() => navigation.navigate(ishosting ? "HostPoll" : "JoinPoll")}
          style={{ ...styles.button, backgroundColor: info.color }}>
          <Text style={{ fontFamily: "poppins", color: "#f9f9f9" }}>
            {ishosting ? "Host" : "Join"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  text: {
    color: "#fff",
    marginTop: 20,
    fontFamily: "poppins",
    fontSize: 16,
    textAlign: "center",
  },
  subText: {
    marginTop: 5,
    color: "#8a8a8a",
    fontFamily: "montserratMid",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginHorizontal: 15,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop: 15,
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.3,
    height: "100%",
    width: "100%",
    backgroundColor: "#1a1a1a",
  },
});
