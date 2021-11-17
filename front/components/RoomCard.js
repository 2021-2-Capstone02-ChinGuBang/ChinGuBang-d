import React,{useEffect, useState} from "react"
import {View,Text,Image,StyleSheet,TouchableOpacity} from "react-native";
import axios from 'axios';
import base64 from 'base-64'

import room from "../iconimage/room.png"
import heart from "../iconimage/heart.png"
import {Ionicons} from "@expo/vector-icons";
import { unstable_batchedUpdates } from "react-dom";
//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function RoomCard({content,navigation,ut}) {

    const [kind,setKind]=useState("월세")
    const [pick,setPick]=useState(0)
    const [date,setDate]=useState("")
    const [u_t,setUt] = useState("")
    let main = content.photo.main
    useEffect(()=>{
      console.log("#############################################")
      console.log(content)
      console.log("#############################################")
      if(content.likes.length==0){
        setPick(0);
      }else{
        setPick(1);
      }

      if(content.type.rentType=="월세"){
        setKind(content.type.rentType+" "+content.price.monthly+"만원/"+"보증금"+content.price.deposit+"만원")
      }else{
        setKind(content.type.rentType+" "+content.price.deposit+"만원")
      }

      if(content.type.category=="단기임대"){
        setDate(content.rentPeriod.startDate.toString().slice(0,10)+" ~ "+content.rentPeriod.endDate.toString().slice(0,10))
      }else{
        setDate(content.rentPeriod.startDate.toString().slice(0,10))
      }
      setUt(ut)
      console.log(u_t)
    },[])

    return (
        <TouchableOpacity onPress={()=>{
          axios.get(`http://54.180.160.150:5000/api/v1/room/`+content.roomID,{
            headers:{
                Authorization:u_t,
            }
        })
        .then((response)=>{
            console.log(response.data);
            console.log("이거 맞나")
            navigation.navigate('방 보기',{content: response.data, u_t:u_t})
        })
        .catch((error)=>{
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
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
            console.log('Error', error.message);
          }
          console.log(error.config);
          //Alert.alert(JSON.stringify(error.response.status))
        })
        // navigation.navigate('방 보기',{roomID: 6})
        }} >
        <View style={styles.card}>
            <View style={styles.c1}>
                <Image resizeMode={"cover"}
                style={styles.roomImage} source={{uri:main}}/>
                {/* `data:image/png;base64,${main}` */}
            </View>

            <View style={styles.c2}>
                <View style={styles.c3}>
                    <View style={styles.kind}><Text style={styles.kindtext}>{content.type.roomType}</Text></View>
                    <View style={styles.method}><Text style={styles.methodtext}>{content.type.category}</Text></View>
                    <TouchableOpacity style={{width:35,height:35}}>
                      <View style={styles.heartImage}>
                            <Ionicons
                              name={pick==1 ? "ios-heart" : "ios-heart-outline"}
                              color="#D84315"
                              size={25}
                            />
                      </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.c4}>
                    <Text style={styles.ptext} numberOfLines={1}>{kind}</Text>
                    <Text style={styles.dtext} numberOfLines={1}>{date}</Text>
                    <Text style={styles.ftext} numberOfLines={1}>{content.information.floor+"층 , "+content.information.area+"평"}</Text>
                    <Text style={styles.utext} numberOfLines={1}>{content.createdAt.toString().slice(0,10)}</Text>
                </View>
            </View>
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
    //margin:10,
    height:120,
    borderBottomWidth:0.5,
    borderBottomColor:"#eee",
    padding:10

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
})