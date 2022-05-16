import { StyleSheet, View} from 'react-native';
import Tabs from './components/tabs';
import PollList from './components/polllist';

const pollData = {
  title: 'Next Team Leader for GreyPoll.',
  id: '3Zd7j48t',
  count: 0,
  accent: '#0F4FD7',
  background: 'https://64.media.tumblr.com/e334f432080b67cef944eeefca5302af/tumblr_oiwytwMDKF1tf8vylo1_1280.pnj'
}
const list = [pollData, pollData, pollData, pollData, pollData, pollData, pollData]

export default function Host({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a'}}>
      <Tabs hosting={true} control={navigation} />
      <PollList datalist={list} />
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