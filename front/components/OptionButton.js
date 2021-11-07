import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Image } from 'react-native';

export default function OptionButton({content,img}) {
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
      <TouchableOpacity style = {[styles.button,{borderColor:colour, borderWidth:1}]} onPress={()=>onPressHandler(colour)}>
        <Image style={styles.image} source={img} ></Image>
        <Text style = {styles.text}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button : {
    width:150,
    height:50,
    marginRight:5,
    marginLeft:5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
    flexDirection:"row",
  },
  image:{
    margin:15,
    flex:1,
    resizeMode:"stretch"
  },
  text : {
    color:"#000",
    fontWeight:"500",
    fontSize:15,
    flex:4,
  }
})