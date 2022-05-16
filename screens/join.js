import { StyleSheet, Text, View, Button } from 'react-native';
import Tabs from './components/tabs';
import PollList from './components/polllist';


const pollData = {
  title: 'Account Manager.',
  id: '3Zd7j48t',
  count: 0,
  accent: '#514DEC',
  background: 'https://64.media.tumblr.com/0bff8e408376825aed6f0aa1906e10da/tumblr_ndov148yd01tf8vylo1_1280.pnj'
}
const list = [pollData, pollData, pollData, pollData, pollData, pollData, pollData]


export default function Join({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <Tabs hosting={false} control={navigation} />
      <PollList datalist={list} />
      
    </View>
  );
}