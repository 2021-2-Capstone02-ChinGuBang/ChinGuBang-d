import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Alert } from 'react-native';


export default function Confirm({content,naviPage,navigation,alert}) {

  return (
    <View style = {styles.container}>
      <TouchableOpacity style = {styles.button} onPress={()=>{
        navigation.navigate(naviPage)
        if(alert==1){
          Alert.alert(content,"완료")
        }
        }}>
        <Text style = {styles.text}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button : {
    width:"100%",
    height:72.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#D84315"
  },
  text : {
    color:"#FFF",
    fontWeight:"700",
    fontSize:20,
  }
})