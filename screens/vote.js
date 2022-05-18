import { View } from "react-native";
import Header from "./components/header";


export default function Vote({ route }) {
  const data = route.params
  
  return (
    <>
      <Header data={data} />
      <View style={{ backgroundColor: 'red', flex: 1 }}></View>
    </>
  );
}
