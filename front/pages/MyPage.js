import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import pickheart from "../iconimage/pickheart.png"
import homeplus from "../iconimage/homeplus.png"
import user from "../iconimage/user.png"
import pickroomdata from "../pickroom.json"
import PickRoomCard from '../components/PickRoomCard';

export default function myPage({content,navigation}) {
console.disableYellowBox = true;
//const [state, setState] = useState([])

//useEffect(()=>{
   // setState(notidata)
//},[])


//서버에서 정보 받아와야 함
let pickroom = pickroomdata.data;

  return (
    <View style={styles.container}>
        <View style={styles.c1}>
            <View style={styles.c2}>
                <Image resizeMode={"cover"}
                style={styles.userImage} source={user}/>
                <Text style={styles.unText}>김도연ㅣ</Text>
                <Text style={styles.umText}> ****cau.ac.kr</Text>
            </View>
            <View style={styles.c3}>
            <TouchableOpacity style={styles.checkButton} onPress={()=>{navigation.navigate('내 방')}}>
                <View style={styles.cc}>
                <Image resizeMode={"cover"}
                style={styles.homeplusImage} source={homeplus}/>
                <Text style={styles.checkButtonText}>내 방 보러가기</Text>
                </View>
            </TouchableOpacity>
                
            <TouchableOpacity style={styles.profileButton} onPress={()=>{navigation.navigate('프로필 수정')}}><Text style={styles.profileButtonText}>프로필 수정하기</Text></TouchableOpacity>
            </View>
        </View>
 
        <View style={styles.c4}>
        <Image resizeMode={"cover"}
                style={styles.pickheartImage} source={pickheart}/>
                <Text style={styles.pText}>찜한 방</Text>
        </View>

      <ScrollView>
          <View style={styles.cardC}>
            {/* 하나의 카드 영역을 나타내는 View */}
            {
            pickroom.map((content,i)=>{
                return (<PickRoomCard content={content} key={i} navigation={navigation}/>)
            })
            }
          </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    c1:{
        alignSelf:"center",
        marginTop:10,
        width:"95%",
        height:125,
       backgroundColor:"#e5e5e5"
      },
      c2:{
        flexDirection:"row",
      },
      cc:{
        flexDirection:"row",
      },
      c3:{
        flexDirection:"row",
        alignSelf:"center",
      },
      c4:{
        flexDirection:"row",
        height:50,
        borderBottomColor:"#e5e5e5",
        borderBottomWidth:5
      },
    cardC: {
        //marginTop:60,
        marginLeft:10
      },
      userImage: {
        width:47,
        height:47,
        marginLeft:20,
        marginTop:20
      },
      unText:{
          fontSize:21,
          marginTop:33,
          marginLeft:15,
        },
      umText:{
        fontSize:16,
        marginTop:38,
        marginLeft:2,
      },
      checkButton:{
        width:140,
        height:30,
        backgroundColor:"#fff",
        borderColor:"#D84315",
        borderWidth:1.5,
        borderRadius:30,
        marginTop:10
      },
      homeplusImage:{
        marginLeft:12
      },
      pickheartImage:{
        marginLeft:20,
        marginTop:13,
      },
      pText:{
        marginLeft:8,
        marginTop:15,
        fontWeight:"500",
        fontSize:14
      },
      checkButtonText:{
         //폰트 사이즈
         fontSize:13,
         //폰트 두께
         fontWeight:'600',
         //위 공간으로 부터 이격
         marginTop:5,
         marginLeft:0,
         //왼쪽 공간으로 부터 이격
         textAlign:'left',
         color:"#D84315"
      },
      profileButton:{
        width:140,
        height:30,
        backgroundColor:"#D84315",
        borderColor:"#D84315",
        borderWidth:1.5,
        borderRadius:30,
        marginTop:10,
        marginLeft:10
      },
      profileButtonText:{
        //폰트 사이즈
        fontSize:13,
        //폰트 두께
        fontWeight:'600',
        //위 공간으로 부터 이격
        marginTop:5,
        marginLeft:20,
        //왼쪽 공간으로 부터 이격
        textAlign:'left',
        color:"#fff"
     },
});
