import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import search from "../iconimage/search.png"
import notidata from "../noti.json"
import chatdata from "../chat.json"
import ChatCard from '../components/ChatCard';
import room from "../iconimage/room.png"
import send from "../iconimage/send.png"

export default function ChattingPage({content,navigation}) {
console.disableYellowBox = true;
//const [state, setState] = useState([])

//useEffect(()=>{
   // setState(notidata)
//},[])

//let room= roomdata.data;
//서버에서 정보 받아와야 함
let noti = notidata.data;
//서버에서 정보 받아와야 함
let chat = chatdata.data;
  return (
    <View style={styles.container}>

          <View style={styles.cardC}>
                <View style={styles.c1}>
                    <Image resizeMode={"cover"}
                    style={styles.roomImage} source={room}/>
                </View>

                <View style={styles.c2}>
                    <View style={styles.c3}>
                        <View style={styles.kind}><Text style={styles.kindtext}>aaaa</Text></View>
                        <View style={styles.method}><Text style={styles.methodtext}>aaaa</Text></View>

                    </View>
                    <View style={styles.c4}>
                        <Text style={styles.ptext} numberOfLines={1}>aaaa</Text>
                        <Text style={styles.dtext} numberOfLines={1}>aaaa</Text>
                        <Text style={styles.ftext} numberOfLines={1}>aaaa</Text>
                        <Text style={styles.utext} numberOfLines={1}>aaaa</Text>
                    </View>
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
            <TouchableOpacity style={{position: 'absolute', right: 25, bottom: 70}} onPress={()=>{navigation.navigate('쪽지 보내기')}}>
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
        padding:10
      },
    chatC:{
      flex: 6.4,
      backgroundColor: '#E5E5E5',
    },
     c1:{
        flex:1
      },
      c2:{
        flex:2
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
        marginTop:6,
        marginLeft:174
        }
    
    
});
