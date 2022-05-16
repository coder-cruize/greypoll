import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Tabs from './components/tabs';

export default function Host({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <Tabs hosting={true} control={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
    width: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
});