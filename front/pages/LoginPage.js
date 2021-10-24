import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput } from 'react-native';
import home from "../iconimage/home.png"

export default function LoginPage({navigation,route}) {

  const [value1, onChangeText1] = React.useState('');
  const [value2, onChangeText2] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title1}>학교 인증하고</Text>
      <Text style={styles.title2}>같은 학교 친구에게 방을 구해봐요!</Text>
      <Image style={styles.mainImage} source={home}/>
      <View style={styles.idContainer}>
        <Text style={styles.idText}>ID  </Text>
        <TextInput
          style={{ marginLeft:13,width:230,height: 40}}
          onChangeText1={text => onChangeText1(text)}
          value1={value1}
          placeholder="아이디를 입력해주세요."
        />
      </View>
      <View style={styles.pwContainer}>
        <Text style={styles.pwText}>PW  </Text>
        <TextInput
          secureTextEntry
          style={{ marginLeft:4,width:230, height: 40}}
          onChangeText2={text => onChangeText2(text)}
          value2={value2}
          placeholder="비밀번호를 입력해주세요."
        /> 
      </View>
      <TouchableOpacity style={styles.loginButton}><Text style={styles.loginButtonText}>로그인</Text></TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={()=>{navigation.navigate('학교등록')}}><Text style={styles.registerButtonText}>회원가입 하러가기</Text></TouchableOpacity>
      <TouchableOpacity style={styles.xButton}><Text style={styles.xButtonText}>인증없이 보러가기</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title1:{
    //폰트 사이즈
    fontSize: 25,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:50,
    marginLeft:39,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#B71C1C"
  },
  title2:{
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:10,
    //왼쪽 공간으로 부터 이격
    marginLeft:39,
    marginRight:39,
    textAlign:'center'
  },
  mainImage:{
    width:180,
    height:180,
    marginTop:15,
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf:"center"
  },
  idContainer:{
    flexDirection:"row",
    alignSelf:"center",
    width:280,
    height:40,
    backgroundColor:"#fff",
    borderColor:"#797676",
    borderWidth:1.5,
    borderRadius:5,
    margin:7,
    marginTop:25,
  },
  idText:{
    color:"#000",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    marginTop:11,
    marginLeft:15
  },
  pwContainer:{
    flexDirection:"row",
    alignSelf:"center",
    width:280,
    height:40,
    backgroundColor:"#fff",
    borderColor:"#797676",
    borderWidth:1.5,
    borderRadius:5,
    margin:7
  },
  pwText:{
    color:"#000",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    marginTop:11,
    marginLeft:15
  },
  loginButton:{
    alignSelf:"center",
    width:280,
    height:40,
    backgroundColor:"#D84315",
    borderRadius:5,
    margin:7
  },
  loginButtonText:{
    color:"#fff",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    marginTop:11
  },
  registerButton:{
    alignSelf:"center",
    width:280,
    height:30,
    backgroundColor:"#fff" 
  },
  registerButtonText:{
    color:"#D84315",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    marginTop:5
  },
  xButton:{
    alignSelf:"center",
    width:130,
    height:20,
    //backgroundColor:"#8a8a8a",
    borderBottomColor:"#8a8a8a",
    borderBottomWidth:1,
    borderRadius:3 
  },
  xButtonText:{
    fontSize:13,
    color:"#8a8a8a",
    fontWeight:"500",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
  }
});
