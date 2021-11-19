import { StatusBar} from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput } from 'react-native';
import search from "../iconimage/search.png"
import axios from "axios"
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export default function RegisterPage({navigation,route}) {

  function isPassword(asValue) {
    var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    console.log(regExp.test(asValue));
    if(regExp.test(asValue)== true){
      setreg(true);
    return alert("비밀번호 OK!"); // 형식에 맞는 경우 true 리턴
    }
    else if(regExp.test(asValue)== false){
      setreg(false);
    return alert("비밀번호 형식이 틀립니다!");
    }
  }



  const [reg, setreg] = useState(false);

  const [value2, onChangeText2] = React.useState('');
  const [value3, onChangeText3] = React.useState('');
  const [expot,setexpot]=useState("")

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
      console.log("엑스포토큰?"+token);
      setexpot(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }


  useEffect(()=>{
    console.log(route.params);
    registerForPushNotificationsAsync();
  }
   
   
, [])

  return reg ?(
    <View style={styles.container}>
      <Text style={styles.title}>나의 정보</Text>
      
      <View style={styles.idContainer}>
        <Text style={styles.id}>아이디</Text>
        
        <View style={{ width:220,height: 40, borderWidth:1.5,borderColor:"#797676"}}>
        <Text style={styles.EmailText}>{route.params.email}</Text>
        </View>
        </View>
      <View style={styles.pwContainer}>
        <Text style={styles.pw}>비밀번호</Text>
        <TextInput
            secureTextEntry
            style={{ width:220,height: 40, borderWidth:1.5,borderColor:"#797676"}}
            onChangeText={text => onChangeText2(text)}
            value2={value2}
            />
      </View>

      <Text style={styles.pwt}>비밀번호는 8~16자로 영문, 숫자, 특수문자를 최소 한가지씩 조합해주세요:)</Text>
      <TouchableOpacity style={styles.check} onPress={()=>isPassword(value2)}>
        <Text style={styles.checkbox}>비밀번호 확인</Text>
      </TouchableOpacity>
      
      <View style={styles.nicknameContainer}>
        <Text style={styles.nickname}>닉네임</Text>  
        <TextInput
            style={{ width:220,height: 40, borderWidth:1.5,borderColor:"#797676"}}
            onChangeText={text => onChangeText3(text)}
            value3={value3}
            />
      </View>
      <TouchableOpacity style={styles.regiButton} 
        onPress={() =>axios.post(`http://54.180.160.150:5000/api/v1/auth/signup`, {
          email : route.params.email,
          password : value2,
          nickname : value3,
          university : route.params.university,
          //expo_token :expot
          })
          .then(function(response)
          {
              console.log(response.data); 
              alert(response.data.message+" 로그인 해주세요!");
              navigation.navigate('로그인');  
          })
          .catch(function (error) {console.log("오류"); alert("정보를 제대로 입력해주세요.");})
          }
        ><Text style={styles.regiButtonText}>가입하기</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  ):(
    <View style={styles.container}>
      <Text style={styles.title}>나의 정보</Text>
      
      <View style={styles.idContainer}>
        <Text style={styles.id}>아이디</Text>
        
        <View style={{ width:220,height: 40, borderWidth:1.5,borderColor:"#797676"}}>
        <Text style={styles.EmailText}>{route.params.email}</Text>
        </View>
        </View>
      <View style={styles.pwContainer}>
        <Text style={styles.pw}>비밀번호</Text>
        <TextInput
            secureTextEntry
            style={{ width:220,height: 40, borderWidth:1.5,borderColor:"#797676"}}
            onChangeText={text => onChangeText2(text)}
            value2={value2}
            />
      </View>

      <Text style={styles.pwt}>비밀번호는 8~16자로 영문, 숫자, 특수문자를 최소 한가지씩 조합해주세요:)</Text>
      <TouchableOpacity style={styles.check} onPress={()=>isPassword(value2)}>
        <Text style={styles.checkbox}>비밀번호 확인</Text>
      </TouchableOpacity>
      
      <View style={styles.nicknameContainer}>
        <Text style={styles.nickname}>닉네임</Text>  
        <TextInput
            style={{ width:220,height: 40, borderWidth:1.5,borderColor:"#797676"}}
            onChangeText={text => onChangeText3(text)}
            value3={value3}
            />
      </View>
      <TouchableOpacity style={styles.regiButton} onPress={() => alert("비밀번호를 확인해주세요!")}>
        <Text style={styles.regiButtonText}>가입하기</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    EmailText:{
       //폰트 사이즈
       fontSize:16,
       //폰트 두께
       fontWeight:'400',
       //위 공간으로 부터 이격
       marginTop:7,
       marginLeft:10,
    },
    checkbox:{
       //폰트 사이즈
       fontSize:13,
       //폰트 두께
       fontWeight:'700',
       //위 공간으로 부터 이격
       marginTop:5,
       textAlign:"center",
       color:"#D84315"
    },
    check:{
      width:100,
      height:30,
      borderColor:"#D84315",
      borderRadius:10,
      borderWidth:2,
      backgroundColor:"#fff",
      alignSelf:"flex-end",
      marginRight:33,
      marginTop:5
    },
    title:{
      //폰트 사이즈
    fontSize: 25,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:30,
    marginLeft:30,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#000"
    },
    idContainer:{
      flexDirection:"row",
      width:320,
      height:40,
      marginLeft:30,
      marginTop:30
    },
    id:{
        //폰트 사이즈
      fontSize:18,
      //폰트 두께
      fontWeight:'600',
      //위 공간으로 부터 이격
      marginTop:10,
      marginLeft:10,
      //왼쪽 공간으로 부터 이격
      marginRight:33,
      textAlign:'left',
    },
    pwContainer:{
      flexDirection:"row",
      width:320,
      height:40,
      marginLeft:30,
      marginTop:25
    },
    pw:{
        //폰트 사이즈
        fontSize:18,
        //폰트 두께
        fontWeight:'600',
        //위 공간으로 부터 이격
        marginTop:10,
        marginLeft:10,
        //왼쪽 공간으로 부터 이격
        marginRight:15,
        textAlign:'left',
    },
    pwt:{
      color:"#797676",
      //폰트 사이즈
      fontSize:12,
      //위 공간으로 부터 이격
      marginTop:5,
      marginLeft:100,
      //왼쪽 공간으로 부터 이격
      marginRight:35,
      textAlign:'right',
    },
    nicknameContainer:{
      flexDirection:"row",
      width:320,
      height:40,
      marginLeft:30,
      marginTop:25
    },
    nickname:{
      //폰트 사이즈
      fontSize:18,
      //폰트 두께
      fontWeight:'600',
      //위 공간으로 부터 이격
      marginTop:10,
      marginLeft:10,
      //왼쪽 공간으로 부터 이격
      marginRight:33,
      textAlign:'left',
    },
    regiButton:{
      position: 'absolute',
      alignSelf:"center",
      width:320,
      height:40,
      backgroundColor:"#D84315",
      borderRadius:5,
      bottom:50
    },
    regiButtonText:{
      color:"#fff",
      fontWeight:"700",
      fontSize:18,
      //텍스트의 현재 위치에서의 정렬 
      textAlign:"center",
      marginTop:8
    }
});
