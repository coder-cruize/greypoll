import { StyleSheet, Text, View, ImageBackground, TouchableHighlight, FlatList} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as navigation from './navigate'
import EmptyPoll from './emptypoll';

function Tags({id, count, accent}) {
  return (
    <View style={styles.tagsContainer}>
      <View style={styles.tag}>
        <Text style={{...styles.tagSign, color: accent}}>#</Text>
        <Text style={styles.tagText}>{id}</Text>
      </View>
      <View style={styles.tag}>
        <Feather name="users" size={13} color={accent} style={{marginRight: 5}} />
        <Text style={styles.tagText}>{count}</Text>
      </View>
    </View>
  )
}
function Poll({data}) {
  return (
    <TouchableHighlight onPress={() => navigation.navigate('Vote', data)} style={{backgroundColor: 'transparent', marginBottom: 15}}>
      <ImageBackground source={{uri: data.background}} resizeMode="cover" style={styles.pollContainer} imageStyle={{borderRadius: 15}}>
        <Tags id={data.id} count={data.count} accent={data.accent} />
        <Text style={styles.text}>{data.title}</Text>
      </ImageBackground>
    </TouchableHighlight>
  );
}

export default function PollList({datalist, ishosting = false}) {
  return (
    <FlatList
      contentContainerStyle={{flex: 1}}
      data={datalist}
      renderItem={({ item }) => <Poll data={item}/>}
      keyExtractor={item => item.id}
      ListEmptyComponent={<EmptyPoll ishosting={ishosting}/>}
    />
  );
}

const styles = StyleSheet.create({
  pollContainer: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontFamily: 'poppins',
    fontSize: 24
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tag: {
    backgroundColor: 'rgba(196, 196, 196, 0.3)',
    padding: 7,
    borderRadius: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10
  },
  tagSign: {
    fontFamily: 'montserrat',
    marginRight: 5,
    fontSize: 12
  },
  tagText: {
    fontFamily: 'montserratMid',
    color: '#e5e5e5',
    fontSize: 12
  }
});