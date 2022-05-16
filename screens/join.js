import { StyleSheet, Text, View, Button } from 'react-native';
import Tabs from './components/tabs';

export default function Join({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <Tabs hosting={false} control={navigation}/>
    </View>
  );
}