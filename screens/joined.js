import { StyleSheet, Text, View, Button } from 'react-native';
import Tabs from './components/tabs';
import PollList from './components/polls';
import Content from './components/content';

export default function Join({ route }) {
  return (
    <Content style={{ backgroundColor: '#1a1a1a'}}>
      <Tabs hosting={false} />
      <PollList datalist={route.params.polls}/>
    </Content>
  );
}