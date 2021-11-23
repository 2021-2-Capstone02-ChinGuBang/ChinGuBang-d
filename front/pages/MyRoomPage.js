import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import search from "../iconimage/search.png"
import roomdata from "../room.json"
import MyRoomCard from '../components/MyRoomCard';
import axios from "axios"
import { useIsFocused } from '@react-navigation/native';

export default function MyRoomPage({route,navigation}) {
console.disableYellowBox = true;
const [state, setState] = useState([])
const [ut,setut]=useState("")

//컨텐츠 새로고침,데이터 갱신
const isFocused = useIsFocused()

useEffect(()=>{
  if (isFocused) {
  console.log(route.params.content.data.data.rooms);
    setState(route.params.content.data.data.rooms);
    setut(route.params.ut);
   // reload()
  }
},[isFocused])


//서버에서 정보 받아와야 함
let room = roomdata.data;

  return (
    <View style={styles.container}>
      <ScrollView>
          <View style={styles.cardC}>
            {/* 하나의 카드 영역을 나타내는 View */}
            {
            state.map((content,i)=>{
                return (<MyRoomCard content={content} key={i} navigation={navigation} ut={route.params.ut} />)
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
