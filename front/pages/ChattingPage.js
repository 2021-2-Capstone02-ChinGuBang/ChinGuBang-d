import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, ScrollView,LogBox } from 'react-native';
import search from "../iconimage/search.png"
import notidata from "../noti.json"
import chatdata from "../chat.json"
import ChatCard from '../components/ChatCard';
//import room from "../iconimage/room.png"
import send from "../iconimage/send.png"
//import Loading from '../components/LoadingPage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function ChattingPage({content,navigation,route}) {
  LogBox.ignoreAllLogs;
console.disableYellowBox = true;
//채팅방 정보들을 저장하고 있을 상태
const [chat, setchat] = useState([])
const [category,setcategory] = useState("")
const [roomType,setroomType] = useState("")
const [rentType,setrentType] = useState("")
const [deposit,setdeposit] = useState("")
const [monthly,setmonthly] = useState("")
const [endDate,setendDate] = useState("")
const [startDate,setstartDate] = useState("")
const [area,setarea] = useState("")
const [floor,setfloor] = useState("")
const [createdAt,setcreatedAt] = useState("")
const [roomID,setroomID] = useState("")
const [opponentID,setopponentID] = useState("")
const [ut,setut] = useState("")
const [room,setroom] = useState("")
//준비 상태
//const [ready,setReady] = useState(true)
 


//컨텐츠 새로고침,데이터 갱신
const isFocused = useIsFocused()


useEffect(() => {
  if (isFocused) { 
    console.log("Focused")
      setchat(route.params.content.data.messages);}
      console.log(route.params.content);
      setut(route.params.user_t);
      console.log(route.params.content.data.room);
      setcategory(route.params.content.data.room.type.category);
      setroomType(route.params.content.data.room.type.roomType);
      setrentType(route.params.content.data.room.type.rentType);
      setdeposit(route.params.content.data.room.price.deposit);
      setmonthly(route.params.content.data.room.price.monthly);
      setendDate(route.params.content.data.room.rentPeriod.endDate);
      setstartDate(route.params.content.data.room.rentPeriod.startDate);
      setarea(route.params.content.data.room.information.area);
      setfloor(route.params.content.data.room.information.floor);
      setcreatedAt(route.params.content.data.room.createdAt);
      setroomID(route.params.content.data.room.roomID)
      setopponentID(route.params.content.data.opponentID)
      setroom(route.params.content.data.room.photo.main)
},[isFocused])

  return (
   
    <View style={styles.container}>

          <View style={styles.cardC}>
                <View style={styles.c1}>
                    <Image resizeMode={"cover"}
                    style={styles.roomImage} source={{uri:room}}/>
                </View>

                <View style={styles.c2}>  
                    <View style={styles.c3}>
                        <View style={styles.kind}><Text style={styles.kindtext}>{category}</Text></View>
                        <View style={styles.method}><Text style={styles.methodtext}>{roomType}</Text></View>

                    </View>
                    <View style={styles.c4}>
                        <Text style={styles.ptext} numberOfLines={1}>{rentType} {monthly}만원/ 보증금 {deposit}만원</Text>
                        <Text style={styles.dtext} numberOfLines={1}>{startDate}~{endDate}</Text>
                        <Text style={styles.ftext} numberOfLines={1}>{area}평,{floor}층</Text>
                    </View>
                    <Text style={styles.utext} numberOfLines={1}>{createdAt}</Text>

                </View>
          </View>
         

        <View style={styles.chatC}>
            <ScrollView>
                {/* 하나의 카드 영역을 나타내는 View */}
                {
                chat.map((content,i)=>{
                    return (<ChatCard content={content} key={i}/>)
                })
                }
            </ScrollView>
            <TouchableOpacity style={{position: 'absolute', right: 25, bottom: 70}} onPress={()=>{navigation.navigate('쪽지 보내기',{user_id:ut, roomID:roomID , rcID:opponentID})}}>
                <Image resizeMode={"cover"}
                          style={styles.sendImage} source={send}/>
            </TouchableOpacity>
        </View>
        

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
        height:40,
        flex:1.1,
        //컨텐츠들을 가로로 나열
        //세로로 나열은 column <- 디폴트 값임 
        flexDirection:"row",
        borderBottomWidth:4,
        borderBottomColor:"#E5E5E5",
        padding:10,
        alignItems:"center"
      },
    chatC:{
      flex: 6.4,
      backgroundColor: '#E5E5E5',
    },
     c1:{
        flex:1,
        //alignSelf:"center"
      },
      c2:{
        flex:2,
      },
      c3:{
        flex:1,
        flexDirection:"row",
      },
      c4:{
        flex:3
      },
      kind:{
        alignSelf:"center",
        width:55,
        height:25,
        backgroundColor:"#D84315",
        borderRadius:5,
      
      },
      kindtext:{
        color:"#fff",
        fontSize:12,
        fontWeight:"600",
        //텍스트의 현재 위치에서의 정렬 
        textAlign:"center",
        padding:5
      },
      method:{
        alignSelf:"center",
        width:55,
        height:25,
        backgroundColor:"#D84315",
        borderRadius:5,
        marginLeft:5
      },
      methodtext:{
        color:"#fff",
        fontSize:12,
        fontWeight:"600",
        //텍스트의 현재 위치에서의 정렬 
        textAlign:"center",
        padding:5
      },
      heartImage:{
        marginLeft:85,
        width:25,
        height:25
      },
      roomImage: {
        width:100,
        height:100
      },
      sendImage: {
        width:60,
        height:60
      },
      ptext: {
        color:"#000",
        fontSize:13,
        fontWeight:"700",
        marginTop:4
      },
      dtext: {
        color:"#797676",
        fontSize:9,
        fontWeight:"600",
        marginTop:14
    },
    ftext: {
        color:"#797676",
        fontSize:9,
        fontWeight:"600",
        marginTop:4
        },
    utext: {
        color:"#000",
        fontSize:9,
        fontWeight:"600",
        marginLeft:174
        }
    
    
});
