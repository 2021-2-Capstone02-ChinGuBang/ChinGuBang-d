import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import search from "../iconimage/search.png"
import roomdata from "../room.json"
import RoomCard from '../components/RoomCard';

export default function AllroomPage({navigation, route}) {
//const [state, setState] = useState([])

//useEffect(()=>{
   // setState(notidata)
//},[])
const [ut,setut]=useState("")
useEffect(()=>{
  console.log(route.params);
  console.log(route.params.u_token);
  setut(route.params.u_token)
  console.log(ut)
},[])


//서버에서 정보 받아와야 함
const [room,setRoom] = useState(route.params.content.data.rooms);
console.log("넘어오긴 하나,,,")
console.log(route.params.content)
  return (
    <View style={styles.container}>
      <ScrollView>
          <View style={styles.cardC}>
            {/* 하나의 카드 영역을 나타내는 View */}
            {
            room.map((content,i)=>{
                return (<RoomCard content={content} key={i} navigation={navigation} ut={route.params.u_token} />)
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
        //marginTop:60,
        marginLeft:10
      }
    
    
});
