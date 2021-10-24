import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, FlatList } from 'react-native';
import user from "../iconimage/user.png"
import { SearchBar } from 'react-native-elements';
import schooldata from '../schooldata.json';

export default function ProfilePage({content,navigation}) {

  const [value1, onChangeText1] = React.useState('');

  return (
    <View style={styles.container}>
       <Image resizeMode={"cover"}
                style={styles.userImage} source={user}/>
        <Text style={styles.text}>닉네임 수정</Text>
      <View style={styles.schoolregiContainer}>
        <TextInput
            style={{ width:200,
              height:40,
              borderWidth:1,
              marginTop:16,
              borderColor:"#797676"}}
            onChangeText1={text => onChangeText1(text)}
            value1={value1}
            placeholder=" 닉네임을 변경해보세요."
            />
         <TouchableOpacity style={styles.checkButton}><Text style={styles.checkButtonText}>변경</Text></TouchableOpacity>
      </View>

     <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
itemStyle: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  schoolregiContainer:{
    flexDirection:"row",
    marginLeft:30,
    marginTop:9,
    alignSelf:"center"
  },
  userImage:{
      alignSelf:"center",
      marginTop:40
  },
  text:{
      textAlign:"center",
      marginTop:8,
      fontSize:14,
      fontWeight:"600"
  },
  checkButton:{
    width:70,
    height:40,
    backgroundColor:"#fff",
    borderColor:"#D84315",
    borderWidth:1.5,
    borderRadius:15,
    marginLeft:10,
    marginTop:17
  },
  checkButtonText:{
     //폰트 사이즈
     fontSize:15,
     //폰트 두께
     fontWeight:'600',
     //위 공간으로 부터 이격
     marginTop:10,
     //marginLeft:15,
     //왼쪽 공간으로 부터 이격
     textAlign:'center',
     color:"#D84315"
  }
})
