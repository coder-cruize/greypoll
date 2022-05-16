import { StyleSheet, Text, View, ImageBackground, TouchableHighlight, FlatList} from 'react-native';
import { Feather } from '@expo/vector-icons';


function Tags({id, count, accent}) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
      <View style={{ backgroundColor: 'rgba(196, 196, 196, 0.3)', padding: 7, borderRadius: 55, flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Text style={{fontFamily: 'montserrat', marginRight: 5, color: accent, fontSize: 12}}>#</Text>
        <Text style={{ fontFamily: 'montserratMid', color: '#e5e5e5', fontSize: 12 }}>{id}</Text>
      </View>
      <View style={{ backgroundColor: 'rgba(196, 196, 196, 0.3)', padding: 7, borderRadius: 55, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 10 }}>
        <Feather name="users" size={13} color="#d1d1d1" style={{marginRight: 5}} />
        <Text style={{fontFamily: 'montserratMid', color: '#e5e5e5', fontSize: 12}}>{count}</Text>
      </View>
    </View>
  )
}
function Poll({data}) {
  return (
    <TouchableHighlight onPress={() => console.log(data.id)} style={{backgroundColor: 'transparent', marginBottom: 15}}>
      <ImageBackground source={{uri: data.background}} resizeMode="cover" style={styles.pollContainer} imageStyle={{borderRadius: 15}}>
        <Tags id={data.id} count={data.count} accent={data.accent} />
        <Text style={styles.text}>{data.title}</Text>
      </ImageBackground>
    </TouchableHighlight>
  );
}
export default function PollList({datalist}) {
  return (
    <FlatList
    data={datalist}
    renderItem={({ item }) => <Poll data={item} />}
    keyExtractor={item => item.id}
  />
  );
}

const styles = StyleSheet.create({
  pollContainer: {
    padding: 10,
  },
  text: {
    color: '#fff',
    fontFamily: 'poppins',
    fontSize: 24
  }
});