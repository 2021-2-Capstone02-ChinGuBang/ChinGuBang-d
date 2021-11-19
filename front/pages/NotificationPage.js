import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import search from "../iconimage/search.png"
import notidata from "../noti.json"
import NotiCard from '../components/NotiCard';
import { useIsFocused } from '@react-navigation/native';
import axios from "axios"

export default function NotificationPage({navigation,route}) {
console.disableYellowBox = true;
const [noti, setNoti] = useState([])
//유저 토큰
const [ut,setut]=useState("")

//컨텐츠 새로고침,데이터 갱신
const isFocused = useIsFocused()

useEffect(()=>{
  if (isFocused) { 
    console.log("Focused")
    setNoti(route.params.content.data.data.messages)}
    console.log(route.params.u_token)
    setut(route.params.u_token)
  },[isFocused,noti])


  return (
    <View style={styles.container}>
      <ScrollView>
          <View style={styles.cardC}>
            {/* 하나의 카드 영역을 나타내는 View */}
            {
            noti.map((content,i)=>{
                return (<NotiCard content={content} key={i} navigation={navigation} ut={ut}/>)
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
        backgroundColor: '#f8f8f8',
    },
    cardC: {
        //borderRadius:10,
        padding:3,
       // backgroundColor: '#fff',
      }
    
    
});
