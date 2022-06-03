import { useContext } from "react";
import Tabs from "./components/tabs";
import PollList from "./components/polls";
import Content from "./components/content";
import appData from "./components/appData";

export default function Join() {
  const { polls } = useContext(appData);
  return (
    <Content style={{ backgroundColor: "#1a1a1a" }}>
      <Tabs hosting={false} />
      <PollList datalist={polls.joined} />
    </Content>
  );
}
