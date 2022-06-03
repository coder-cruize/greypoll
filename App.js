import { useState, useEffect, createContext } from "react";
import { TouchableOpacity, LogBox } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "./firebase";
import OnBoarding from "./screens/onboarding";
import Hosted from "./screens/hosted";
import Joined from "./screens/joined";
import Vote from "./screens/vote";
import HostPoll from "./screens/hostPoll";
import JoinPoll from "./screens/joinPoll";
import Settings from "./screens/settings";
import { navigationRef } from "./screens/components/navigate";
import appData from "./screens/components/appData";
import { ToastConfig } from "./screens/components/toastconfig";

const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [reload, setReload] = useState(false);
  const [hosted, setHosted] = useState(null);
  const [joined, setJoined] = useState(null);
  const [polls, setPolls] = useState(null);
  useEffect(() => {
    auth.authState(auth.auth, (user) => {
      if (user) {
        db.read("users/" + user.uid)
          .then((userData) => {
            Object.keys(userData?.hostedIds || {}).map((questionId) => {
              db.read("questions/" + questionId).then((questions) => {
                const data = {
                  questions: questions.questionList,
                  title: questions.title,
                  id: questionId,
                  count: 0,
                  accent: "#0F4FD7",
                  background:
                    "https://64.media.tumblr.com/e334f432080b67cef944eeefca5302af/tumblr_oiwytwMDKF1tf8vylo1_1280.pnj",
                };
                if (hosted) {
                  setHosted([...hosted, data]);
                } else {
                  setHosted([data]);
                }
              });
            });
            Object.keys(userData?.joinedIds || {}).map((questionId) => {
              //todo handle joined poll data here
              console.log(questionId);
            });
            if (!userData?.hostedIds) setHosted([])
            if(!userData?.joinedIds) setJoined([]);
          })
          .then(() => {
            setUser(user);
          });
      } else {
        setUser(false);
        setPolls(false);
      }
    });
  }, [reload]);
  useEffect(() => {
    // ignored warnings
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);
    async function prepareAssets() {
      await Font.loadAsync({
        poppins: require("./assets/fonts/Poppins-SemiBold.ttf"),
        montserratMid: require("./assets/fonts/Montserrat-Medium.ttf"),
        montserrat: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
      });
      setFontLoaded(true);
    }
    (async () => {
      try {
        // Show the splash screen
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
      await prepareAssets();
    })();
  }, []);
  useEffect(() => {
    if (hosted && joined) {
      setPolls({
        hosted: hosted,
        joined: joined,
      });
    }
  }, [hosted, joined]);
  useEffect(() => {
    if (fontLoaded && user != null && polls != null) {
      (async () => await SplashScreen.hideAsync())();
    }
  }, [fontLoaded, user, polls]);
  const Reload = () => {
    setReload(!reload);
  };
  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(255, 45, 85)",
      background: "#1a1a1a",
    },
  };
  if (!fontLoaded || user == null || polls == null) {
    return null;
  }
  return (
    <appData.Provider
      value={{ polls: polls, reload: () => setReload(!reload) }}>
      <NavigationContainer ref={navigationRef} theme={AppTheme}>
        <StatusBar style="light" translucent={true} />
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            title: "Hi, " + user?.displayName,
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Settings")}>
                <Feather name="settings" size={24} color="#fff" />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: "#1a1a1a",
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: "#fff",
            headerTitleStyle: { fontFamily: "poppins" },
            cardShadowEnabled: false,
            ...TransitionPresets.ModalFadeTransition,
          })}>
          {user == false && (
            <Stack.Screen
              name="OnBoard"
              component={OnBoarding}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen name="Host" component={Hosted} />
          <Stack.Screen
            name="Join"
            component={Joined}
            options={{ headerLeft: () => null }}
          />
          <Stack.Screen
            name="Vote"
            component={Vote}
            options={{
              title: "",
              headerShown: false,
              ...TransitionPresets.FadeFromBottomAndroid,
            }}
          />
          <Stack.Screen
            name="HostPoll"
            component={HostPoll}
            initialParams={{ reload: Reload }}
            options={{
              headerShown: false,
              ...TransitionPresets.FadeFromBottomAndroid,
            }}
          />
          <Stack.Screen
            name="JoinPoll"
            component={JoinPoll}
            options={{
              headerShown: false,
              ...TransitionPresets.FadeFromBottomAndroid,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: "Settings",
              headerRight: () => null,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
        <Toast
          config={ToastConfig}
          position="bottom"
          bottomOffset={30}
          autoHide={true}
          visibilityTime={2000}
        />
      </NavigationContainer>
    </appData.Provider>
  );
}
