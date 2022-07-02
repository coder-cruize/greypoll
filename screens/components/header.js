import { useState, useContext } from "react";
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
import QRCode from "react-native-qrcode-svg";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { useFirebase } from "../../firebase";
import appData from "./appData";

function PollOptions({ close, pollId, setBackButton, isHosting }) {
  const { db, auth } = useFirebase();
  const { reload } = useContext(appData);
  const [loading, setLoading] = useState(false);
  const leavePoll = () => {
    setBackButton(true);
    setLoading(true);
    db.write(
      "users/" + auth.auth.currentUser.uid + "/joinedIds/" + pollId,
      null
    )
      .then(() => {
        close();
        navigation.goBack();
        reload();
      })
      .catch((e) => {
        setBackButton(false);
        setLoading(false);
      });
  };
  const savePollData = () => {
    alert();
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        width: "80%",
        maxWidth: 350,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}>
        <Text style={{ fontFamily: "poppins", fontSize: 18 }}>
          Poll Options
        </Text>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={loading ? null : close}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}>
        <QRCode
          size={200}
          value={"greypoll://#id:" + pollId}
          backgroundColor="transparent"
        />
      </View>
      <View
        style={{
          marginTop: 15,
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}>
        {isHosting && (
          <TouchableOpacity onPress={savePollData}>
            {loading ? (
              <ActivityIndicator style={{ marginLeft: 5 }} />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#36ae22",
                  paddingVertical: 10,
                  paddingHorizontal: 35,
                  borderRadius: 50,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: "montserratMid",
                    marginRight: 10,
                    color: "white",
                  }}>
                  Save Poll Data
                </Text>
                <Ionicons
                  name="cloud-download-outline"
                  size={20}
                  color="white"
                />
              </View>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={leavePoll}>
          {loading ? (
            <ActivityIndicator style={{ marginLeft: 5 }} />
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "#FF7272",
                  fontFamily: "montserratMid",
                  marginRight: 5,
                }}>
                {isHosting ? "Close Poll" : "Leave Poll"}
              </Text>
              <MaterialIcons name="logout" size={20} color="red" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
function AdminOptions({ close }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        width: "80%",
        maxWidth: 350,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}>
        <Text style={{ fontFamily: "poppins", fontSize: 18 }}>
          Admin Options
        </Text>
        <TouchableOpacity style={{ paddingVertical: 10 }} onPress={close}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Things to do here:</Text>
        <Text> - Change ownership</Text>
      </View>
    </View>
  );
}
export default function Header({ data, hosting }) {
  const [modal, setModal] = useState(false);
  const [backButton, setBackButton] = useState(false);
  const pollOptions = (
    <PollOptions
      pollId={data.id}
      close={() => setModal(false)}
      setBackButton={(val) => setBackButton(val)}
      isHosting={hosting}
    />
  );
  const adminOptions = (
    <AdminOptions
      pollId={data.id}
      close={() => setModal(false)}
      setBackButton={(val) => setBackButton(val)}
      isHosting={hosting}
    />
  );
  return (
    <ImageBackground
      source={{ uri: data.background }}
      style={{
        justifyContent: "flex-end",
        width: Dimensions.get("window").width,
      }}>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.tag}
            onPress={() => setModal(pollOptions)}>
            <Text style={{ ...styles.tagSign, color: data.accent }}>#</Text>
            <Text style={styles.tagData}>{data.id}</Text>
          </TouchableOpacity>
          {hosting && (
            <TouchableOpacity
              style={styles.tag}
              onPress={() => setModal(adminOptions)}>
              <Ionicons
                name="shield"
                size={15}
                color={data.accent}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.tagData}>You</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.title}>{data.title}</Text>
      <Modal
        show={!!modal}
        close={() => setModal(false)}
        disableBackButton={backButton}>
        {modal}
      </Modal>
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
    marginLeft: 10,
  },
  tagSign: {
    fontFamily: "montserrat",
    marginRight: 5,
    fontSize: 13,
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
