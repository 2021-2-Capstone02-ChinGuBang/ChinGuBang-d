
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard,StyleSheet, Text, View, Image,Platform, TouchableOpacity,TextInput,TouchableWithoutFeedback,Alert } from 'react-native';
import search from "../iconimage/search.png"
import axios from 'axios';

export default function SendPage({navigation, route}) {

  const [value1, onChangeText1] = React.useState('');
  const [ut,setut] = useState("")
  const [rcID,setrcID] = useState("")
  const [roomID,setroomID] = useState("")


  useEffect(()=>{
    console.log(route.params);
    setut(route.params.user_id);
    setrcID(route.params.rcID);
    setroomID(route.params.roomID);
  }
, [])

let form ={
  
  receiverID :rcID,
  content : value1
  
}
  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
    <View style={styles.container}>
     
         <TouchableOpacity style={styles.checkButton} onPress={()=>{
           axios.post(`http://54.180.160.150:5000/api/v1/message/`+roomID,form,{
            headers: {
              Authorization : ut,
              "Content-Type": `application/json`
            }
          })
          .then(function(response){
            console.log(response);
            Alert.alert("쪽지가 전송되었습니다.");
            navigation.navigate("쪽지함",{user_t:ut,content:response.data });
            schedulePushNotification();
          })
          .catch(function(error) {
           
            console.log("error");
            //Alert.alert(JSON.stringify(error.response.status))
          })
           }}><Text style={styles.checkButtonText}>전송</Text>
         </TouchableOpacity>
         
            <TextInput
                style = {{flexShrink:1}}
                multiline ={true}
                style={{ marginTop:0, marginLeft:15,width:"90%"}}
                onChangeText={text => onChangeText1(text)}
                value={value1}
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
