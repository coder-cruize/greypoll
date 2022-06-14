import { Text, View, Button } from "react-native";
import { useFirebase } from "../firebase";

export default function Settings({ navigation }) {
  const { auth } = useFirebase();
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "OnBoard" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}>
      <Text>Settings Page</Text>
      <Button title="signout" onPress={signOut} />
    </View>
  );
}
