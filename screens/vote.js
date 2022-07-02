import { View } from "react-native";
import Header from "./components/header";

export default function Vote({ route }) {
  const { data, hosting } = route.params
  
  return (
    <>
      <Header data={data} hosting={hosting} />
      <View style={{ backgroundColor: 'red', flex: 1 }}></View>
    </>
  );
}
