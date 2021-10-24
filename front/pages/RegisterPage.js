import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput } from 'react-native';
import search from "../iconimage/search.png"

export default function RegisterPage({navigation,route}) {

  const [value1, onChangeText1] = React.useState('cau.ac.kr');
  const [value2, onChangeText2] = React.useState('');
  const [value3, onChangeText3] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 정보</Text>
      
      <View style={styles.idContainer}>
        <Text style={styles.id}>아이디</Text>
        <TextInput
            style={{ width:220,height: 40, borderWidth:1.5,borderColor:"#797676"}}
            onChangeText1={text => onChangeText1(text)}
            value1={value1}
            />
      </View>
      <View style={styles.pwContainer}>
        <Text style={styles.pw}>비밀번호</Text>
        <TextInput
            secureTextEntry
            style={{ width:220,height: 40, borderWidth:1.5,borderColor:"#797676"}}
            onChangeText2={text => onChangeText2(text)}
            value2={value2}
            />
      </View>
      <View style={styles.nicknameContainer}>
        <Text style={styles.nickname}>닉네임</Text>  
        <TextInput
            style={{ width:220,height: 40, borderWidth:1.5,borderColor:"#797676"}}
            onChangeText3={text => onChangeText3(text)}
            value3={value3}
            />
      </View>
      <TouchableOpacity style={styles.regiButton}><Text style={styles.regiButtonText}>가입하기</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
      marginTop:600
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
