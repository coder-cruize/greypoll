import { Text, Button, View, ImageBackground, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';
import Header from "./components/header";



export default function Vote({ navigation, route }) {
  const data = route.params
  // const headerHeight = useHeaderHeight();
  
  // navigation.setOptions({
  //   headerBackground: () => (
  //   <ImageBackground
  //   source={{ uri: 'https://64.media.tumblr.com/0bff8e408376825aed6f0aa1906e10da/tumblr_ndov148yd01tf8vylo1_1280.pnj' }}
  //   style={{ minHeight: headerHeight+100, justifyContent:'flex-end', flex: 1 }}
  //     >
  //       <Text onLayout={event => console.log(event.nativeEvent.layout.height)} style={{marginLeft: 15, height: 400, color: '#fff', fontFamily: 'poppins', fontSize: 24}}>Next Vice-President for GreyPoll @Expo</Text>
  //     </ImageBackground>
  //   ),
  //   headerRight: () =>
  //     <View style={{ backgroundColor: 'rgba(196, 196, 196, 0.3)', padding: 7, borderRadius: 55, flexDirection: 'row', justifyContent: 'flex-start' }}>
  //       <Text style={{fontFamily: 'montserrat', marginRight: 5, color: data.accent, fontSize: 12}}>#</Text>
  //       <Text style={{ fontFamily: 'montserratMid', color: '#e5e5e5', fontSize: 12 }}>{data.id}</Text>
  //     </View>})
  return (
    <Header data={data} />
  );
}
