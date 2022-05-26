import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import Content from "./components/content";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Logo from "../assets/home-icon.png";
import AppIcon from "../assets/app-icon.png";
import Google from "../assets/google.png";
import { useState } from "react";

const AuthTemplate = ({ text, text2, navigate, email, password, submit, accent }) => {
  const [showPassword, setShowPassword] = useState(true);

  const styles = StyleSheet.create({
    imageContainer: { width: "100%", height: 200, alignItems: "center" },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: "space-between",
    },
    heading: {
      textAlign: "left",
      width: "100%",
      marginBottom: 10,
      fontFamily: "montserratMid",
      color: "#fff",
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: "row",
      backgroundColor: "#212121",
      paddingVertical: 15,
      paddingLeft: 20,
      paddingRight: 10,
      marginHorizontal: 10,
      marginTop: 20,
      borderRadius: 10,
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    input: {
      flex: 1,
      color: "#737373",
      fontFamily: "montserratMid",
      letterSpacing: 1,
    },
    actionBtn: {
      backgroundColor: accent,
      paddingHorizontal: 100,
      paddingVertical: 10,
      marginTop: 20,
      borderRadius: 10,
    },
    socials: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      marginTop: 30,
    },
    socialBtn: {
      width: "30%",
      paddingVertical: 10,
      backgroundColor: "#212121",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    altBtn: {
      paddingVertical: 5,
      paddingHorizontal: 20,
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 10,
      marginTop: 30,
    },
    altBtnText: {
      color: accent,
      marginLeft: 5,
      textDecorationLine: "underline",
      fontFamily: "montserratMid",
    },
  });
  return (
    <View style={{ backgroundColor: "#1a1a1a", flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image
          source={AppIcon}
          style={{
            height: "100%",
            aspectRatio: 1 / 1,
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>{text} to your account</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#3c3c3c"
              onChangeText={email.set}
              value={email.value}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={showPassword}
              onChangeText={password.set}
              value={password.value}
              placeholderTextColor="#3c3c3c"
              placeholder="Password"
            />
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Feather name="eye" size={20} color="#c4c4c4" />
              ) : (
                <Feather name="eye-off" size={20} color="#c4c4c4" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.actionBtn} onPress={submit}>
            <Text style={{ color: "#c4c4c4", fontFamily: 'montserratMid' }}>{text}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#696969", fontFamily: "montserratMid" }}>
            or {text.toLowerCase()} with
          </Text>
          <View style={styles.socials}>
            <TouchableOpacity style={styles.socialBtn}>
              <View style={{ width: 25, aspectRatio: 1 / 1 }}>
                <Image
                  source={Google}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <FontAwesome5 name="facebook" size={25} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <FontAwesome5 name="twitter" size={25} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={navigate}
            style={styles.altBtn}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#696969", fontFamily: "montserratMid" }}>
                Don't have an account?
              </Text>
              <Text style={styles.altBtnText}>{text2}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function Info({ navigation }) {
  const styles = StyleSheet.create({
    topItems: {
      width: "75%",
      alignItems: "center",
    },
    mainText: {
      color: "#c4c4c4",
      fontFamily: "poppins",
      fontSize: 20,
      textAlign: "center",
    },
    subText: {
      color: "#696969",
      fontFamily: "montserratMid",
      fontSize: 16,
      textAlign: "center",
      marginTop: 10,
    },
    bottomItems: {
      marginTop: 50,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    mainBtn: {
      backgroundColor: "#36ae22",
      width: "80%",
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 10,
    },
    subBtn: {
      paddingVertical: 5,
      paddingHorizontal: 20,
      alignItems: "center",
      borderRadius: 10,
      marginVertical: 10,
    },
    subBtnText: {
      color: "#726EC9",
      marginLeft: 5,
      textDecorationLine: "underline",
      fontFamily: "montserratMid",
    },
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1a1a1a",
        justifyContent: "flex-end",
        alignItems: "center",
      }}>
      <View
        style={{
          height: "70%",
          minHeight: 500,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}>
        {/*//todo create gif background of moving circle  */}
        <View style={styles.topItems}>
          <Image source={Logo} style={{ width: 150, height: 150 }} />
          <View style={{ marginTop: 20 }}>
            <Text style={styles.mainText}>
              Your surveys.{"\n"}Where it needs to be.
            </Text>
            <Text style={styles.subText}>
              Seamlessly create polls for market research or personal uses.
            </Text>
          </View>
        </View>
        <View style={styles.bottomItems}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.mainBtn}>
            <Text style={{ fontFamily: "montserratMid", color: "#c4c4c4" }}>
              Get Started
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.subBtn}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#696969", fontFamily: "montserratMid" }}>
                Already have an account?
              </Text>
              <Text style={styles.subBtnText}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const submit = () => {
    //todo login here
    navigation.reset({
      index: 0,
      routes: [{ name: "Host" }],
    });
  }
  return (
    <AuthTemplate
      text="Login"
      text2="Sign up"
      navigate={() => navigation.navigate("SignUp")}
      email={{ set: setEmail, value: email }}
      password={{ set: setPassword, value: password }}
      submit={submit}
      accent="#36ae22"
    />
  );
}

function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    //todo login here
    navigation.reset({
      index: 0,
      routes: [{ name: "Host" }],
    });
  };
  return (
    <AuthTemplate
      text="Sign up"
      text2="Log in"
      navigate={() => navigation.navigate("Login")}
      email={{ set: setEmail, value: email }}
      password={{ set: setPassword, value: password }}
      submit={submit}
      accent="#726ec9"
    />
  );
}

export default function OnBoarding({ navigation }) {
  const Stack = createStackNavigator();
  return (
    <Content style={{ marginBottom: 20 }}>
      <Stack.Navigator
        screenOptions={() => ({
          headerStyle: {
            backgroundColor: "#1a1a1a",
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: "",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15, padding: 10 }}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Info" }],
                })
              }>
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "poppins" },
        })}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Info"
          component={Info}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalFadeTransition,
          }}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </Content>
  );
}
