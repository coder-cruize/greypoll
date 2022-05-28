import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { auth } from "../firebase";
import Content from "./components/content";
import { validator } from "./components/validator";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Logo from "../assets/home-icon.png";
import AppIcon from "../assets/app-icon.png";
import Google from "../assets/google.png";
import Modal from "./components/modal";
import { ActivityIndicator } from "react-native-paper";
const AuthTemplate = ({
  text,
  text2,
  navigate,
  email,
  password,
  name,
  submit,
  accent,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [warning, setWarning] = useState(null);
  const styles = StyleSheet.create({
    imageContainer: { width: "100%", height: 150, alignItems: "center" },
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
      borderWidth: 1,
      borderColor: "transparent",
    },
    input: {
      flex: 1,
      color: "#737373",
      fontFamily: "montserratMid",
      letterSpacing: 1,
    },
    inputErrorContainer: {
      width: "100%",
      marginTop: 5,
    },
    errorText: {
      color: "#a00000",
      fontFamily: "montserratMid",
      textAlign: "left",
    },
    actionBtn: {
      backgroundColor: accent,
      paddingHorizontal: 100,
      paddingVertical: 10,
      marginTop: 30,
      borderRadius: 10,
    },
    actionBtnDisabled: {
      backgroundColor: "#333333",
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
  useEffect(() => {
    if (
      !validator.email(email.value) ||
      (name
        ? !validator.password(password.value)
        : !validator.length(password.value)) ||
      !validator.name(name?.value)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, password, name]);

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#1a1a1a" }}
      keyboardShouldPersistTaps={"always"}
      showsVerticalScrollIndicator={false}>
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
          {name && (
            <>
              <View
                style={[
                  styles.inputContainer,
                  !validator.name(name.value) &&
                    name.value != null && { borderColor: "#a00000" },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#3c3c3c"
                  onFocus={() => setWarning("name")}
                  onChangeText={name?.set}
                  value={name?.value}
                  placeholder="Name"
                  keyboardType="default"
                  autoComplete="off"
                />
              </View>
              {warning == "name" &&
                name?.value != null &&
                !validator.name(name?.value) && (
                  <View style={styles.inputErrorContainer}>
                    <Text style={styles.errorText}>Atleast 3 characters</Text>
                    <Text style={styles.errorText}>
                      Should only consist of letters
                    </Text>
                    <Text style={styles.errorText}>
                      No space or special characters or numbers
                    </Text>
                  </View>
                )}
            </>
          )}
          <View
            style={[
              styles.inputContainer,
              !validator.email(email.value) &&
                email.value != null && { borderColor: "#a00000" },
            ]}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#3c3c3c"
              onFocus={() => setWarning("email")}
              onChangeText={email.set}
              value={email.value}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>
          {warning == "email" &&
            email.value != null &&
            !validator.email(email.value) && (
              <View style={styles.inputErrorContainer}>
                <Text style={styles.errorText}>
                  Please enter a valid email address
                </Text>
              </View>
            )}
          <View
            style={[
              styles.inputContainer,
              (name
                ? !validator.password(password.value)
                : !validator.length(password.value)) &&
                password.value != null && { borderColor: "#a00000" },
            ]}>
            <TextInput
              style={styles.input}
              secureTextEntry={showPassword}
              onFocus={() => setWarning("password")}
              onChangeText={password.set}
              value={password.value}
              placeholderTextColor="#3c3c3c"
              placeholder="Password"
            />
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Feather name="eye" size={20} color="#666666" />
              ) : (
                <Feather name="eye-off" size={20} color="#666666" />
              )}
            </TouchableOpacity>
          </View>
          {warning == "password" &&
            password.value != null &&
            (name
              ? !validator.password(password.value)
              : !validator.length(password.value)) && (
              <View style={styles.inputErrorContainer}>
                {name ? (
                  <>
                    <Text style={styles.errorText}>Atleast 8 characters</Text>
                    <Text style={styles.errorText}>
                      1 lower and upper case letter
                    </Text>
                    <Text style={styles.errorText}>1 number</Text>
                    <Text style={styles.errorText}>1 special character</Text>
                  </>
                ) : (
                  <Text style={styles.errorText}>Invalid Password</Text>
                )}
              </View>
            )}
          <TouchableOpacity
            style={[styles.actionBtn, disabled && styles.actionBtnDisabled]}
            onPress={submit}
            disabled={disabled}>
            <Text
              style={{
                color: disabled ? "#202020" : "#c4c4c4",
                fontFamily: "montserratMid",
              }}>
              {text}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ color: "#696969", fontFamily: "montserratMid" }}>
            or {text.toLowerCase()} with
          </Text>
          <View style={styles.socials}>
            <TouchableOpacity
              style={styles.socialBtn}>
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
          <TouchableOpacity onPress={navigate} style={styles.altBtn}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#696969", fontFamily: "montserratMid" }}>
                Don't have an account?
              </Text>
              <Text style={styles.altBtnText}>{text2}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    auth.email
      .login(email, password)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Host" }],
        });
      })
      .catch((e) => {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Error: " + e + ".",
          position: "bottom",
          bottomOffset: 30,
          autoHide: true,
          visibilityTime: 2000,
        });
      });
  };

  return (
    <>
      <AuthTemplate
        text="Login"
        text2="Sign up"
        navigate={() => navigation.navigate("SignUp")}
        email={{ set: setEmail, value: email }}
        password={{ set: setPassword, value: password }}
        submit={submit}
        accent="#36ae22"
      />
      <Modal show={loading}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#36ae22" />
        </View>
      </Modal>
    </>
  );
}
function SignUp({ navigation }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    auth.email
      .signup(name, email, password)
      .then(() => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Host" }],
        });
      })
      .catch((e) => {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Error: " + e + ".",
          position: "bottom",
          bottomOffset: 30,
          autoHide: true,
          visibilityTime: 2000,
        });
      });
  };
  return (
    <>
      <AuthTemplate
        text="Sign up"
        text2="Log in"
        navigate={() => navigation.navigate("Login")}
        name={{ set: setName, value: name }}
        email={{ set: setEmail, value: email }}
        password={{ set: setPassword, value: password }}
        submit={submit}
        accent="#726ec9"
      />
      <Modal show={loading}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={"#726EC9"} />
        </View>
      </Modal>
    </>
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
