import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import search from "../iconimage/search.png"
import notidata from "../noti.json"
import NotiCard from '../components/NotiCard';

export default function NotificationPage({navigation,route}) {
console.disableYellowBox = true;
//const [state, setState] = useState([])

//useEffect(()=>{
   // setState(notidata)
//},[])


//서버에서 정보 받아와야 함
let noti = notidata.data;

  return (
    <View style={styles.container}>
      <ScrollView>
          <View style={styles.cardC}>
            {/* 하나의 카드 영역을 나타내는 View */}
            {
            noti.map((content,i)=>{
                return (<NotiCard content={content} key={i} navigation={navigation}/>)
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
        marginTop:10,
        marginLeft:10
      }
    
    
});
