import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { Keyboard,StyleSheet, Text, View, Image, TouchableOpacity,TextInput,TouchableWithoutFeedback } from 'react-native';
import search from "../iconimage/search.png"

export default function SendPage() {

  const [value1, onChangeText1] = React.useState('');

  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
    <View style={styles.container}>
     
         <TouchableOpacity style={styles.checkButton}><Text style={styles.checkButtonText}>전송</Text></TouchableOpacity>
         
            <TextInput
                style = {{flexShrink:1}}
                multiline ={true}
                style={{ marginTop:0, marginLeft:15,width:"90%"}}
                onChangeText1={text => onChangeText1(text)}
                value1={value1}
                placeholder="내용을 입력해주세요"
                placeholderTextColor="#797676"
                />
         

      <StatusBar style="auto" />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
    },
    checkButton:{
        width:60,
        height:30,
        backgroundColor:"#fff",
        borderColor:"#D84315",
        borderWidth:1.5,
        borderRadius:30,
        marginLeft:300,
        marginTop:5
      },
      checkButtonText:{
         //폰트 사이즈
         fontSize:15,
         //폰트 두께
         fontWeight:'600',
         //위 공간으로 부터 이격
         marginTop:6,
         marginLeft:15,
         //왼쪽 공간으로 부터 이격
         textAlign:'left',
         color:"#D84315"
      },
});
