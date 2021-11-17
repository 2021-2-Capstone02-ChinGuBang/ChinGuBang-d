import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
export default function LoadingPage() {
 
  
    return (
      <View style={styles.container}>
          
          <Text style={styles.textStyle}>로딩중입니다.잠시만 기다려 주세요:D</Text>
      </View >
    );
}
const styles = StyleSheet.create({
    container:{
        alignSelf:"center",
        backgroundColor:"#fff",
        flex:1,
        width:360,
    },
    imageStyle:{
        marginTop:170,
        width:200,
        height:200,
        alignSelf:"center",
    },
    textStyle:{
        fontSize:15,
        marginTop:20,
        textAlign:"center"
    }
});