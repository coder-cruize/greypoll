import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
import { BarCodeScanner } from "expo-barcode-scanner";
import Content from "./components/content";
import Modal from "./components/modal";
import { Feather } from "@expo/vector-icons";

function submitData(data, navigation, isQr = false) {
  //todo handle firebase here
  console.log(data);
  setTimeout(() => {
    navigation.goBack();
    if (isQr) {
      navigation.goBack();
    }
    Toast.show({
      type: "success",
      text1: "Successfully joined Poll.",
    });
  }, 5000);
  //todo handle incase submit data has error to remove loader
}
function Index({ navigation }) {
  const [joinId, setJoinID] = useState("");
  const [loading, setLoading] = useState(false);
  const disabled = joinId.length < 5;

  const Done = () => {
    setLoading(true);
    submitData(joinId, navigation);
  };

  return (
    <Content
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}>
      <View style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderText}>Join a </Text>
          <Text style={{ ...styles.pageHeaderText, color: "#726EC9" }}>
            Poll
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Text
              style={{
                color: "#726EC9",
                fontSize: 20,
                fontFamily: "montserrat",
              }}>
              #
            </Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setJoinID(text.replace(/[^A-Za-z0-9]/g, ""))
            }
            value={joinId}
            placeholder="Poll ID"
            placeholderTextColor="#363636"
            keyboardType="default"
            autoCapitalize="none"
            maxLength={10}
          />
        </View>
        <View style={styles.pageBtnContainer}>
          <TouchableOpacity
            onPress={Done}
            disabled={disabled}
            style={[styles.pageBtn, disabled ? styles.pageBtnDisabled : null]}>
            <Text
              style={[
                styles.pageBtnText,
                disabled ? styles.pageBtnTextDisabled : null,
              ]}>
              Next
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pageQrBtn}
            onPress={() => navigation.navigate("qr")}>
            <Feather name="maximize" size={24} color="#726EC9" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal show={loading}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#726EC9" />
        </View>
      </Modal>
    </Content>
  );
}
function Qr({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(null);
  const [cameraLoad, setCameraLoad] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
    setTimeout(() => {
      setCameraLoad(true);
    }, 1000);
  });

  const handleBarCodeScanned = ({ data, type }) => {
    if (
      type == BarCodeScanner.Constants.BarCodeType.qr &&
      data.startsWith("greypoll://")
    ) {
      setScanned(data);
      submitData(data.replace("greypoll://#id:", ""), navigation, true);
    }
    if (!data.startsWith("greypoll://")) {
      setScanned(false);
    }
  };

  if (!cameraPermission) {
    return (
      <Content style={{ marginBottom: 50 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Feather
            name="camera-off"
            size={40}
            color="#726EC9"
            style={{ marginBottom: 20 }}
          />
          <Text style={{ color: "#fff", fontFamily: "poppins", fontSize: 20 }}>
            Enable Camera
          </Text>
          <Text
            style={{
              color: "#fff",
              fontFamily: "montserratMid",
              fontSize: 14,
              textAlign: "center",
            }}>
            Please provide access to your camera. This is needed to scan a Qr
            code.
          </Text>
        </View>
      </Content>
    );
  }
  return (
    <Content
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}>
      <View style={{ ...styles.page, marginBottom: 0, flex: 1 }}>
        <View style={styles.qrContainer}>
          {cameraLoad ? (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.qr}
            />
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
          <View style={styles.qrOverlay}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.qrOverlayBtn}>
              <Feather name="x" size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.qrOverlayImg}>
              <Image
                source={require("../assets/scan.png")}
                style={{ width: "70%", height: "70%" }}
              />
            </View>
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                borderRadius: 10,
                width: "100%",
              }}>
              <Text
                style={{
                  color:
                    scanned == null
                      ? "#fff"
                      : typeof scanned == "string"
                      ? "#726EC9"
                      : "red",
                  fontFamily: "poppins",
                }}>
                {scanned == null
                  ? "Scan a GreyPoll QR code"
                  : typeof scanned == "string"
                  ? "#" + scanned.replace("greypoll://#id:", "")
                  : "Invalid Qr code"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Modal show={typeof scanned == "string"}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#726EC9" />
        </View>
      </Modal>
    </Content>
  );
}

export default function JoinPoll() {
  const Stack = createStackNavigator();
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  const config = {
    animation: "timing",
    config: {
      duration: 600,
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: "#1a1a1a",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        cardStyleInterpolator: forFade,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Screen name="index" component={Index} />
      <Stack.Screen
        name="qr"
        component={Qr}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  page: {
    marginBottom: 100,
    width: "95%",
  },
  pageHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  pageHeaderText: { color: "#fff", fontFamily: "poppins", fontSize: 30 },
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  inputIcon: {
    backgroundColor: "#212121",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  input: {
    marginTop: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#212121",
    backgroundColor: "#212121",
    color: "#737373",
    flex: 1,
  },
  pageBtnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
  },
  pageBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#726EC9",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 15,
  },
  pageQrBtn: {
    borderColor: "#2b2b2b",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#202020",
  },
  pageBtnDisabled: {
    opacity: 0.4,
    backgroundColor: "#8a8a8a",
  },
  pageBtnText: {
    color: "#d7d7d7",
    fontFamily: "montserratMid",
  },
  pageBtnTextDisabled: {
    color: "#1a1a1a",
  },
  qrContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qr: {
    flex: 1,
    width: Dimensions.get("screen").width,
    aspectRatio: 1 / 1,
  },
  qrOverlay: {
    position: "absolute",
    zIndex: 2,
    height: "90%",
    width: "100%",
    justifyContent: "space-between",
  },
  qrOverlayBtn: {
    width: 50,
    aspectRatio: 1 / 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  qrOverlayImg: {
    width: "100%",
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
