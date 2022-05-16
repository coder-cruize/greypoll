import { useState, useEffect } from 'react';
import { TouchableOpacity, Button, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Host from './screens/host';
import Join from './screens/join';
import Settings from './screens/settings';
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Dimensions } from 'react-native';


const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState('Lekan')
  const [fontLoaded, setFontLoaded] = useState(false)

  const forFadeAnimation = ({ current }) => ({
    cardStyle: { opacity: current.progress }
  });


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
    <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>
      <View style={{ flex: 1, width: Dimensions.get('window').width-30,marginLeft: 15 }}>
        <NavigationContainer>
          <StatusBar style="light" translucent={true} />
          <Stack.Navigator
            presentation="modal"
            screenOptions={({ navigation }) => ({
              title: 'Hi, ' + user,
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Settings')}>
                  <Feather name="settings" size={24} color="#fff" />
                </TouchableOpacity>
              ),
              headerStyle: { backgroundColor: '#1a1a1a', elevation: 0, shadowOpacity: 0},
              headerTintColor: '#fff',
              headerTitleStyle: { fontFamily: 'poppins' },
              cardStyleInterpolator: forFadeAnimation,
              cardShadowEnabled: false
            })}>
            <Stack.Screen name="Host" component={Host} />
            <Stack.Screen name="Join" component={Join} options={{ headerLeft: () => null }} />
            <Stack.Screen name="Poll" component={Join} options={{headerLeft:() => null }} />
            <Stack.Screen name="Settings" component={Settings} options={{
              title: 'Settings',
              headerRight: () => null,
              ...TransitionPresets.SlideFromRightIOS
            }}  />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
