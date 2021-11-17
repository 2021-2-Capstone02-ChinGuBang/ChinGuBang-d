import React from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';

export default function OptionButton({content,img,set}) {
    let colour=""
    if(set){
        colour="#D84315"
    }
    else colour="#C4C4C4"

  return (
    <View style = {styles.container}>
      <View style = {[styles.button,{borderColor:colour, borderWidth:1}]}>
        <Image style={styles.image} source={img} ></Image>
        <Text style = {styles.text}>{content}</Text>
      </View>
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
    height:23,
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