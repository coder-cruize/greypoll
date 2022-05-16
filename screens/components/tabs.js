import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Tabs({ control, hosting }) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        onPress={() => !hosting ? control.goBack() : null}
        style={[styles.tabButton, hosting ? styles.tabActive : styles.tabInactive]}>
        <Text style={[styles.tabText, hosting ? styles.tabTextActive : styles.tabTextInactive]}>Host</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => hosting ? control.navigate('Join') : null}
        style={[styles.tabButton, !hosting ? styles.tabActive : styles.tabInactive]}>
        <Text style={[styles.tabText, !hosting ? styles.tabTextActive : styles.tabTextInactive]}>Join</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20
  },
  tabButton: {
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
    width: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  tabActive: {
    backgroundColor: '#fff',
  },
  tabInactive: {
    backgroundColor: 'transparent'
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'poppins'
  },
  tabTextActive: {
    color: '#000'
  },
  tabTextInactive: {
    color: '#fff'
  }
});