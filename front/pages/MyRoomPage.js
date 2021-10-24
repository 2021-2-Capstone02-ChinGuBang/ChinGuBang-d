import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import search from "../iconimage/search.png"
import roomdata from "../room.json"
import MyRoomCard from '../components/MyRoomCard';

export default function MyRoomPage({content,navigation}) {
console.disableYellowBox = true;
//const [state, setState] = useState([])

//useEffect(()=>{
   // setState(notidata)
//},[])


//서버에서 정보 받아와야 함
let room = roomdata.data;

  return (
    <View style={styles.container}>
      <ScrollView>
          <View style={styles.cardC}>
            {/* 하나의 카드 영역을 나타내는 View */}
            {
            room.map((content,i)=>{
                return (<MyRoomCard content={content} key={i}/>)
            })
            }
          </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardC: {
        //marginTop:60
      }
    
    
});
