import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity,StyleSheet, Text, View } from 'react-native';


export default function SmallButton({content}) {
  const [colour,setColours]=useState("#C4C4C4")
  const onPressHandler=color=>{
    if (color==="#D84315"){
      setColours("#C4C4C4")
    }
    else{
      setColours("#D84315")
    }
  }
  return (
    <View style = {styles.container}>
      <TouchableOpacity style = {[styles.button,{backgroundColor:colour}]} onPress={()=>onPressHandler(colour)}>
        <Text style = {styles.text}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button : {
    width:90,
    height:50,
    marginRight:5,
    marginLeft:5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
  },
  text : {
    color:"#FFF",
    fontWeight:"700",
    fontSize:20,
  }
})