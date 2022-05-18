import { Modal as ModalBox, Text, TouchableOpacity, StyleSheet, View } from "react-native"

export default function Modal({show, onClose}) {
  return (
    <ModalBox animationType="fade" transparent={true} visible={show} onRequestClose={onClose} statusBarTranslucent={true}>
      <View style={styles.overlay}>  
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.textStyle}>Hide Modal</Text>
        </TouchableOpacity>
      </View>
    </ModalBox>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});