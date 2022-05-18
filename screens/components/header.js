import { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "./modal";
import * as navigation from "./navigate";

export default function Header({ data }) {
  const [modal, setModal] = useState(false);
  return (
    <ImageBackground
      source={{ uri: data.background }}
      style={{
        justifyContent: "flex-end",
        width: Dimensions.get("window").width,
      }}
    >
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag} onPress={() => setModal(true)}>
          <Text style={{ ...styles.tagSign, color: data.accent }}>#</Text>
          <Text style={styles.tagData}>{data.id}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{data.title}</Text>
      <Modal show={modal} close={() => setModal(false)} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: StatusBar.currentHeight + 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  tag: {
    backgroundColor: "rgba(196, 196, 196, 0.3)",
    padding: 7,
    borderRadius: 55,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  tagSign: {
    fontFamily: "montserrat",
    marginRight: 5,
    fontSize: 12,
  },
  tagData: {
    fontFamily: "montserratMid",
    color: "#e5e5e5",
    fontSize: 12,
  },
  title: {
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    color: "rgba(255, 255, 255, 0.9)",
    fontFamily: "poppins",
    fontSize: 24,
  },
});
