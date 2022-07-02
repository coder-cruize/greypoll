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
import { useFirebase } from "./firebase";
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
import * as SecureStore from "expo-secure-store";

const Stack = createStackNavigator();
export default function App() {
  const [initialRender, setInitialRender] = useState(true);
  const [user, setUser] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [reload, setReload] = useState(false);
  const [polls, setPolls] = useState(null);
  const [onboarding, showOnboarding] = useState(null);
  const { auth, db, networkState } = useFirebase();
  const setOnboard = (newUser = false) => {
    return new Promise((resolve, reject) => {
      SecureStore.setItemAsync("showOnboarding", newUser ? "true" : "false")
        .then(() => {
          resolve();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };
  useEffect(() => {
    auth.authState(auth.auth, (user) => {
      if (user) {
        db.read("users/" + user.uid)
          .then((userData) => {
            let hosted = [];
            let joined = [];
            let hostedIds = []
            let joinedIds = []
            let hostedResolved = []
            let joinedResolved = []
            Object.keys(userData?.hostedIds || {}).map((questionId) => {
              const question = db.read("questions/" + questionId);
              hosted.push(question);
              hostedIds.push(questionId)
            });
            Object.keys(userData?.joinedIds || {}).map((questionId) => {
              const question = db.read("questions/" + questionId);
              joined.push(question);
              joinedIds.push(questionId)
            });
            Promise.all(
              [
                Promise.all(hosted).then((hostedQuestions) => {
                  hostedQuestions.map((question, index) => {
                    const data = {
                      questions: question.questionList,
                      title: question.title,
                      id: hostedIds[index],
                      count: 0,
                      accent: "#0F4FD7",
                      background:
                        "https://64.media.tumblr.com/e334f432080b67cef944eeefca5302af/tumblr_oiwytwMDKF1tf8vylo1_1280.pnj",
                    };
                    hostedResolved.push(data)
                  });
                }),
                Promise.all(joined).then((joinedQuestions) => {
                  joinedQuestions.map((question, index) => {
                    if (question == null) {
                      db.write("users/" + user.uid + "/joinedIds/" + joinedIds[index], null)
                      return;
                    }
                    else {
                      const data = {
                        questions: question.questionList,
                        title: question.title,
                        id: joinedIds[index],
                        count: 0,
                        accent: "#0F4FD7",
                        background:
                          "https://64.media.tumblr.com/e334f432080b67cef944eeefca5302af/tumblr_oiwytwMDKF1tf8vylo1_1280.pnj",
                      };
                      joinedResolved.push(data);
                    }
                  });
                }),
              ].map((p) => p.then(() => true).catch(() => false))
            ).then((data) => {
              if (data[0] == true && data[1] == true) {
                setPolls({
                  hosted: hostedResolved,
                  joined: joinedResolved,
                });
              };
            });
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
    (async () => {
      try {
        // Show the splash screen
        await SplashScreen.preventAutoHideAsync();
        // load fonts
        await Font.loadAsync({
          poppins: require("./assets/fonts/Poppins-SemiBold.ttf"),
          montserratMid: require("./assets/fonts/Montserrat-Medium.ttf"),
          montserrat: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
        });
        const onboardValue = await SecureStore.getItemAsync("showOnboarding");
        if (onboardValue == null) {
          setOnboard(true);
          showOnboarding(true);
        } else {
          showOnboarding(false);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setFontLoaded(true);
      }
    })();
  }, []);
  useEffect(() => {
    if (fontLoaded && user != null && polls != null && onboarding != null) {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [fontLoaded, user, polls]);
  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    Toast.show({
      type: "info",
      text1: networkState ? "You're back online" : "No internet connection",
    });
  }, [networkState]);
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
      value={{
        polls: polls,
        reload: () => setReload(!reload),
        showOnboarding: onboarding,
        setOnboarding: setOnboard,
      }}>
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
