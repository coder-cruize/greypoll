import { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font'
import { Feather } from '@expo/vector-icons';
import Host from './screens/host';
import Join from './screens/join';
import Vote from './screens/vote'
import Settings from './screens/settings';
import {navigationRef} from './screens/components/navigate';

const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState('Lekan')
  const [pollsx, setPolls] = useState({ hosted: [], joined: []})
  const [fontLoaded, setFontLoaded] = useState(false)

  const polls = {
    hosted: [
      {
        title: 'Next Team Leader for GreyPoll.',
        id: '3Zd7j48t',
        count: 0,
        accent: '#0F4FD7',
        background: 'https://64.media.tumblr.com/e334f432080b67cef944eeefca5302af/tumblr_oiwytwMDKF1tf8vylo1_1280.pnj'
      }
    ],
    joined: [
      {
        title: 'Account Manager.',
        id: '3Zd7j48t',
        count: 0,
        accent: '#514DEC',
        background: 'https://64.media.tumblr.com/0bff8e408376825aed6f0aa1906e10da/tumblr_ndov148yd01tf8vylo1_1280.pnj'
      }
    ]
  }



  useEffect(() => {
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
          title: 'Hi, ' + user,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Settings')}>
              <Feather name="settings" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: '#1a1a1a', elevation: 0, shadowOpacity: 0 },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'poppins' },
          cardShadowEnabled: false,
          ...TransitionPresets.ModalFadeTransition
        })}>
        <Stack.Screen name="Host" component={Host} initialParams={{polls: pollsx.hosted}} />
        <Stack.Screen name="Join" component={Join} initialParams={{polls: polls.joined}} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Vote" component={Vote} options={{
          title: '',
          headerShown: false,
          headerRight: () => null,
          ...TransitionPresets.FadeFromBottomAndroid
        }} />
        <Stack.Screen name="Settings" component={Settings} options={{
          title: 'Settings',
          headerRight: () => null,
          ...TransitionPresets.SlideFromRightIOS
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
