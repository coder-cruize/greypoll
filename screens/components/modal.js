import {
  Modal as ModalBox,
  StyleSheet,
  View,
} from "react-native";

export default function Modal(props) {
  return (
    <ModalBox
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={props.disableBackButton ? null : props.close}
      statusBarTranslucent={true}>
      <View style={styles.overlay}>{props.children}</View>
    </ModalBox>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
