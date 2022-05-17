import { View } from "react-native"
import { Dimensions } from 'react-native';

export default function Content(props) {
  return (
    <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>
      <View style={{...props.style, width: Dimensions.get('window').width-30, marginHorizontal: 15, flex: 1}}>
        {props.children}
      </View>
    </View>
  )
}