
///s
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
///e
import { StatusBar } from 'expo-status-bar';
import { Keyboard,StyleSheet, Text, View, Image,Platform, TouchableOpacity,TextInput,TouchableWithoutFeedback,Alert } from 'react-native';
import search from "../iconimage/search.png"
import axios from 'axios';
///s
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
///e
export default function SendPage({navigation, route}) {
///s
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
///e

  const [value1, onChangeText1] = React.useState('');
  const [ut,setut] = useState("")
  const [rcID,setrcID] = useState("")
  const [roomID,setroomID] = useState("")


  useEffect(()=>{
///s
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
///e
    console.log(route.params);
    setut(route.params.user_id);
    setrcID(route.params.rcID);
    setroomID(route.params.roomID);
///s
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
///e 
    };
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


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "새로운 채팅이 왔어요!📬",
      body: '지금 확인하러 갈까요?',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}
///s
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("여건가,,,?"+token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance .MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return "ExponentPushToken[xtjcGQN-uMEJoT2e_CXnwB]";
}
///e
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
