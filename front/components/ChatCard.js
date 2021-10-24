import React from "react"
import {View,Text,Image,StyleSheet,TouchableOpacity} from "react-native";

//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function ChatCard({content}) {
    return (
       
        <View style={styles.card}>
            
          <Text style={styles.ftext} numberOfLines={1}>{content.form}</Text>
          <Text style={styles.ttext} numberOfLines={1}>{content.text}</Text>
            
        </View>
        
        )
}

const styles = StyleSheet.create({

  card:{
    flex:1,
    //컨텐츠들을 가로로 나열
    //세로로 나열은 column <- 디폴트 값임 
    marginBottom:4,
    height:100,
    width:"97%",
    backgroundColor:"#fff",
    borderRadius:5,
    alignSelf:"center"
  },
  ftext: {
    //폰트 사이즈
    fontSize: 13,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:9,
    marginLeft:8,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#D84315"
  },
  ttext: {
    //폰트 사이즈
    fontSize: 11,
    //폰트 두께
    fontWeight: '600',
    //위 공간으로 부터 이격
    marginTop:5,
    marginLeft:10,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#000"
  }
})