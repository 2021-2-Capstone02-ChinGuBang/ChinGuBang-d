import React, {useState,useEffect} from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from "react-native";
import bell from "../iconimage/bell.png"
import newchatimage from "../iconimage/new.png"
import axios from 'axios';
//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function NotiCard({content,navigation,ut}) {
 
    console.log(ut);

  //상수처리
    let newchat = true;

 //새로운 쪽지가있을때
    return content.new==true?(
        <TouchableOpacity 
        onPress={()=>
          axios.get(`http://54.180.160.150:5000/api/v1/message/`+ content.messageRoomID,{
            headers: {
              Authorization : ut
            }
          })
          .then((response)=>{
            //console.log(response.data);
            navigation.navigate("쪽지함",{content:response.data,user_t:ut})
          })
          .catch((error)=>{
            if (error.response) {
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              //console.log(error.response.data);
              //console.log(error.response.status);
              //console.log(error.response.headers);
            }
            else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
              console.log(error.request);
            }
            else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
              //console.log('Error', error.message);
            }
            //console.log(error.config);
            console.log("ErrorErrorgggErrorError");
            //Alert.alert(JSON.stringify(error.response.status))
          })
          }>
        <View style={styles.card}>
            
            <Image resizeMode={"cover"}
            style={styles.bellImage} source={bell}/>
            <Text style={styles.text} numberOfLines={1}>'{content.nickname}' 님과의 쪽지방이에요!</Text>
            
            <Image resizeMode={"cover"}
            style={styles.newchatimage} source={newchatimage}/>
        </View>
        </TouchableOpacity>
        ):(
          <TouchableOpacity 
          onPress={()=>
            axios.get(`http://54.180.160.150:5000/api/v1/message/`+ content.messageRoomID,{
              headers: {
                Authorization : ut
              }
            })
            .then((response)=>{
              //console.log(response.data);
              navigation.navigate("쪽지함",{content:response.data,user_t:ut})
            })
            .catch((error)=>{
              if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                //console.log(error.response.data);
                //console.log(error.response.status);
                //console.log(error.response.headers);
              }
              else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
              }
              else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                //console.log('Error', error.message);
              }
              //console.log(error.config);
              console.log("ErrorErrorgggErrorError");
              //Alert.alert(JSON.stringify(error.response.status))
            })
            }>
          <View style={styles.card}>
              
              <Image resizeMode={"cover"}
              style={styles.bellImage} source={bell}/>
              <Text style={styles.text} numberOfLines={1}>'{content.nickname}' 님과의 쪽지방이에요!</Text>
              
          </View>
          </TouchableOpacity>
          )
}

const styles = StyleSheet.create({

  card:{
    flex:1,
    //컨텐츠들을 가로로 나열
    //세로로 나열은 column <- 디폴트 값임 
    flexDirection:"row",
    height:70,
    borderRadius:3,
    padding:5,
    marginBottom:3,
    width:"99%",
    backgroundColor: '#fff',
    alignSelf:"center"
  },
  bellImage: {
    width:30,
    height:30,
    marginLeft:5,
    marginTop:15,
  },
  newchatimage:{
    width:25,
    height:25,
   marginRight:3,
  },
  text: {
    flex:2,
    flexDirection:"column",
    marginLeft:20,
    marginTop:20,
  }
})