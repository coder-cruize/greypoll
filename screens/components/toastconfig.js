import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Component = ({ icon, text }) => {
  return (
    <View
      style={{
        marginTop: 10,
        height: 60,
        width: "90%",
        marginHorizontal: 10,
        paddingHorizontal: 15,
        backgroundColor: "#2e2e2e",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
      }}>
      <View>{icon}</View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "#c1c1c1", fontFamily: "poppins" }}>{text}</Text>
      </View>
    </View>
  );
};

export const ToastConfig = {
  info: ({ text1 }) => {
    return <Component
      text={text1}
      icon={
        <Ionicons name="ios-information-circle-outline" size={24} color="red" />
      }
    />;
  },
  success: ({ text1 }) => {
    return <Component
      text={text1}
      icon={
        <Ionicons name="checkmark-circle-outline" size={24} color="green" />
      }
    />;
  },
  error: ({ text1 }) => {
    return <Component
      text={text1}
      icon={<Ionicons name="md-warning-outline" size={24} color="red" />}
    />;
  },
};
