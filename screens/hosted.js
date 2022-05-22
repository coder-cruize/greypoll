import Tabs from './components/tabs';
import PollList from './components/polls';
import Content from './components/content';

export default function Host({ route }) {
  return (
    <Content style={{ backgroundColor: '#1a1a1a'}}>
      <Tabs hosting={true} />
      <PollList datalist={route.params.polls} ishosting/>
    </Content>
  );
}