import React from "react"
import {View,Text,Image,StyleSheet,TouchableOpacity} from "react-native";
import room from "../iconimage/room.png"
import heart from "../iconimage/heart.png"
import {Ionicons} from "@expo/vector-icons";
//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function RoomCard({content,navigation}) {

    let pick = 0;//서버에서 하트를 눌렀는지 받아옴(0:안누름/1:누름), 현재는 상수처리

    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('방 보기')}} >
        <View style={styles.card}>
            <View style={styles.c1}>
                <Image resizeMode={"cover"}
                style={styles.roomImage} source={room}/>
            </View>

            <View style={styles.c2}>
                <View style={styles.c3}>
                    <View style={styles.kind}><Text style={styles.kindtext}>{content.kind}</Text></View>
                    <View style={styles.method}><Text style={styles.methodtext}>{content.method}</Text></View>
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
                    <Text style={styles.ptext} numberOfLines={1}>{content.price}</Text>
                    <Text style={styles.dtext} numberOfLines={1}>{content.date}</Text>
                    <Text style={styles.ftext} numberOfLines={1}>{content.floor+", "+content.area}</Text>
                    <Text style={styles.utext} numberOfLines={1}>{content.update}</Text>
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