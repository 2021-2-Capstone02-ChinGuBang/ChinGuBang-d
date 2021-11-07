import React,{useState} from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';

import Confirm from '../components/Confirm'
import Home from '../assets/CapstoneHome.png'
import filter from '../assets/filter.png'
import homeplus from '../assets/homeplus.png'
import message from '../assets/message.png'
import profile from '../assets/profile.png'


export default function MainPage({navigation}) {
  const [colour1,setColours1]=useState("#C4C4C4")
  const onPressHandler1=color=>{
    if (color==="#D84315"){
      setColours1("#C4C4C4")
    }
    else{
      setColours1("#D84315")
    }
  }
  const [colour2,setColours2]=useState("#C4C4C4")
  const onPressHandler2=color=>{
    if (color==="#D84315"){
      setColours2("#C4C4C4")
    }
    else{
      setColours2("#D84315")
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image style={{
          marginTop:43,
          marginLeft:15,
          width:40,
          height:40,
        }}source={Home}/>
        <Text style={{
          marginTop:60,
          marginLeft:10,
          color:"#000",
          fontSize:20,
          fontWeight:"700",
          flex:6,
        }}>친구방</Text>
        <TouchableOpacity style={{
          marginTop:60,
          marginRight:20,
          width:25,
          height:25,
        }} onPress={()=>{navigation.navigate('알림')}}> 
          <Image source={message}/>
        </TouchableOpacity>
        <TouchableOpacity style={{
          marginTop:60,
          marginRight:25,
          width:25,
          height:25,
        }} onPress={()=>{navigation.navigate('MY')}}> 
        <Image source={profile}/>
        </TouchableOpacity>
      </View>
      <View style={styles.filter}>
        {/* <TouchableOpacity style={styles.condition}>
          <Text style={styles.conditionText}>원룸/투룸</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.condition}>
          <Text style={styles.conditionText}>건물 형태</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.condition}>
          <Text style={styles.conditionText}>가격</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.condition}>
          <Text style={styles.conditionText}>임대 기간</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={[styles.condition,{flexDirection:"row"}]}
        onPress={()=>{navigation.navigate('전체 필터')}}>
          <Image source={filter} style={{alignSelf:"center"}}/>
          <Text style={styles.conditionText}>필터</Text>
        </TouchableOpacity>
      </View>
      {/* 이거 없으면 글자가 지멋대로 왔다갔다 */}
      <MapView style={styles.map} 
      provider={PROVIDER_GOOGLE} 
      initialRegion={{
        latitude: 37.50519,
        longitude: 126.95709,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker
        coordinate={{latitude: 37.50519, longitude: 126.95709}}
        title="this is a marker"
        description="this is a marker example"
      />
 
    </MapView>
    <TouchableOpacity style={[styles.button,
      {
        backgroundColor:colour1,
        position:'absolute',
        right:65,
        top:140,
      }]}
      onPress={()=>onPressHandler1(colour1)}>
        <Text style={styles.btnText}>단기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,
      {
        backgroundColor:colour2,
        position:'absolute',
        right:10,
        top:140,
      }]}
      onPress={()=>onPressHandler2(colour2)}>
        <Text style={styles.btnText}>양도</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.putButton,
      {
        position:'absolute',
        right:10,
        bottom:80,
        flexDirection:"row"
      }]}
      onPress={()=>{navigation.navigate('방 내놓기')}}>
        <Image source={homeplus} style={{
          flex:2,
          alignSelf:"center",
        }}></Image>
        <Text style={{
              color:"#000",
              fontWeight:"500",
              fontSize:20,
              alignSelf:"center",
              marginLeft:10,
              flex:5,
        }}>방 내놓기</Text>
      </TouchableOpacity>
    <Confirm content={"모든 방 보기"} naviPage={"모든 방 보기"} navigation={navigation} alert={0} ></Confirm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  top:{
    backgroundColor: '#fff',
    width:"100%",
    height:90,
    flexDirection:"row",
    
  },
  map: {
    width: Dimensions.get('window').width-20,
    height: Dimensions.get('window').height-162.5-45,
    alignSelf:"center"
  },
  button : {
    width:50,
    height:35,
    margin:5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:10,
  },
  putButton:{
    width:160,
    height:50,
    margin:5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:35,
    backgroundColor:"#FFF",
    borderColor:"#D84315",
    borderWidth:1,
  },
  btnText : {
    color:"#FFF",
    fontWeight:"500",
    fontSize:15,
    alignSelf:"center"
  },
  filter:{
    width:"50%",
    height:45,
    backgroundColor:"#F6F6F6",
    flexDirection:"row",
    alignSelf:"flex-start",
  },
  condition:{
    flex:1,
    alignContent:"center",
    justifyContent:"center"
  },
  conditionText:{
    fontSize:16,
    fontWeight:"500",
    alignSelf:"center",
    color:"#000"
  }
});