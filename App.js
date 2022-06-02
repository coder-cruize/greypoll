import { useState, useEffect } from "react";
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
import { auth } from "./firebase";
import OnBoarding from "./screens/onboarding";
import Hosted from "./screens/hosted";
import Joined from "./screens/joined";
import Vote from "./screens/vote";
import HostPoll from "./screens/hostPoll";
import JoinPoll from "./screens/joinPoll";
import Settings from "./screens/settings";
import { navigationRef } from "./screens/components/navigate";
import { ToastConfig } from "./screens/components/toastconfig";

const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [polls, setPolls] = useState({
    hosted: [
      // {
      //   title: "Next Team Leader for GreyPoll.",
      //   id: "3Zd7j48t",
      //   count: 0,
      //   accent: "#0F4FD7",
      //   background:
      //     "https://64.media.tumblr.com/e334f432080b67cef944eeefca5302af/tumblr_oiwytwMDKF1tf8vylo1_1280.pnj",
      // },
    ],
    joined: [],
  });

  useEffect(() => {
    auth.authState(auth.auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
  }, []);
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
    if (!fontLoaded || user == null) {
      (async () => await SplashScreen.hideAsync())();
    }
  }, [fontLoaded, user]);

  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(255, 45, 85)",
      background: "#1a1a1a",
    },
  };

  if (!fontLoaded || user == null) {
    return null;
  }
  return (
    <NavigationContainer ref={navigationRef} theme={AppTheme}>
      <StatusBar style="light" translucent={true} />
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          title: "Hi, " + user.displayName,
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
        <Stack.Screen
          name="Host"
          component={Hosted}
          initialParams={{ polls: polls.hosted }}
        />
        <Stack.Screen
          name="Join"
          component={Joined}
          initialParams={{ polls: polls.joined }}
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
  );
}
