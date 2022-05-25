import { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Toast from "react-native-toast-message";
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font'
import { Feather } from '@expo/vector-icons';
import Hosted from './screens/hosted';
import Joined from './screens/joined';
import Vote from './screens/vote'
import HostPoll from './screens/hostPoll';
import JoinPoll from "./screens/joinPoll";
import Settings from './screens/settings';
import { navigationRef } from './screens/components/navigate';
import { ToastConfig } from './screens/components/toastconfig';

const Stack = createStackNavigator();
export default function App() {
  //todo might combine polls and user into one object
  const [user, setUser] = useState('Lekan')
  const [reload, setReload] = useState(false)
  const [fontLoaded, setFontLoaded] = useState(false)
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
    //todo load firebase data here
    console.log('Async Firebase request here')
  }, [reload])
  useEffect(() => {
    //load local files here
    async function prepareAssets() {
      await Font.loadAsync({
        poppins: require('./assets/fonts/Poppins-SemiBold.ttf'),
        montserratMid: require('./assets/fonts/Montserrat-Medium.ttf'),
        montserrat: require('./assets/fonts/Montserrat-ExtraBold.ttf')
      })
      setFontLoaded(true)
      // Hide the splash screen
      await SplashScreen.hideAsync()
    }
    async function Loader() {
      try {
        // Show the splash screen
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e)
      }
      await prepareAssets()
    }
    Loader()
  }, [])

  if (!fontLoaded) {
    return null
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style="light" translucent={true} />
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          title: "Hi, " + user,
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
      <Toast config={ToastConfig} />
    </NavigationContainer>
  );
}
