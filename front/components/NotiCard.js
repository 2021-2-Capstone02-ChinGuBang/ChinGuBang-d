import React from "react"
import {View,Text,Image,StyleSheet,TouchableOpacity} from "react-native";
import bell from "../iconimage/bell.png"
//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function NotiCard({content,navigation}) {
    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('쪽지함')}}>
        <View style={styles.card}>
            
            <Image resizeMode={"cover"}
            style={styles.bellImage} source={bell}/>
            <Text style={styles.text} numberOfLines={1}>{content.name} 님이 쪽지를 보냈어요!</Text>
            
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
    margin:10,
    height:50,
    borderBottomWidth:0.5,
    borderBottomColor:"#eee",
    paddingBottom:10

  },
  bellImage: {
    width:30,
    height:30,
    marginLeft:5
  },
  text: {
    flex:2,
    flexDirection:"column",
    marginLeft:20,
    marginTop:8
  }
})