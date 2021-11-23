import React,{useState,useEffect} from 'react';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';

import Confirm from '../components/Confirm'
import Home from '../assets/CapstoneHome.png'
import filter from '../assets/filter.png'
import homeplus from '../assets/homeplus.png'
import message from '../assets/message.png'
import profile from '../assets/profile.png'
import axios from 'axios';
import Loading from '../components/Loading'

export default function MainPage({navigation,route}) {
  //유저 토큰
  let mApiKey = 'AIzaSyA-TBtTOWILp1wUABnai9adbbJMgcPP008'

  const [ut,setut]=useState("")
  let pinCol=["#C4C4C4","#D84315"]
  useEffect(()=>{

    setut(route.params.u_token)
    setRoom(route.params.rooms)
    setReady(false)
    // findCoords(route.params.rooms)
    //   .then((resolve)=>{
    //     console.log("안되는건가")
    //     setCoords(resolve)
    //     console.log(resolve)
    //     console.log("coords:",coords)
    //     if(coords[0]!==undefined)
    //       setReady(false);
    //   })
  },[])
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
  const [rooms,setRoom]=useState([])
  const [ready,setReady] = useState(true)
  const [coords,setCoords] = useState([])
  function findCoords(rooms){
    const result = Promise.all(
      rooms.map((room)=>{
        return axios.get('https://maps.google.com/maps/api/geocode/json?address=' + room.information.post + '&key=' + mApiKey + '&language=ko')
        .then(res=>res.data)})
    );
    return result;
  }

  return ready ? <Loading/> : (
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
          flexDirection:"row"
        }} onPress={()=>axios.get('http://54.180.160.150:5000/api/v1/message',{
          headers:{
              Authorization : ut
          }
        })
        .then((response)=>{
          //console.log(response);
          navigation.navigate("알림",{content:response, u_token : ut})
        })
        .catch((error)=>{
         
          console.log("Error");
          //Alert.alert(JSON.stringify(error.response.status))
        })
        }> 
          <Image source={message}/>
          <Text style={{
              color:"#D84315",
              fontSize:13,
              fontWeight:"700"
          }}>{route.params.newMsg}</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={{
          marginTop:60,
          marginRight:25,
          width:25,
          height:25,
        }}  onPress={()=>axios.get('http://54.180.160.150:5000/api/v1/user',{
            headers: {
              Authorization : ut
            }
          })
          .then((response)=>{
            console.log(response);
            navigation.navigate('MY',{content:response, u_token : ut})
          })
          .catch((error)=>{
            if (error.response) {
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              //console.log(error.response.data);
              //console.log(error.response.status);
              //console.log(error.response.headers);
            }
            else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
              console.log(error.request);
            }
            else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
              //console.log('Error', error.message);
            }
            //console.log(error.config);
            console.log("ErrorErrorgggErrorError");
            //Alert.alert(JSON.stringify(error.response.status))
          })
          }> 
        <Image source={profile}/>
        </TouchableOpacity>
      </View>
      <MapView style={styles.map} 
      provider={PROVIDER_GOOGLE} 
      initialRegion={{
        latitude: 37.50519,
        longitude: 126.95709,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      }}>
        {
          rooms.map((content,i)=>{
            return(
            <Marker
              coordinate={{latitude: parseFloat(content.information.lat), longitude: parseFloat(content.information.lng)}}
              title="2021-11-04 ~"
              description="2022-01-05"
              //pinColor={pinCol[i%2]}
              onPress={()=>
                axios.get(`http://54.180.160.150:5000/api/v1/room`,{
                  headers: {
                    Authorization : ut
                  }
                })
                .then((response)=>{
                  //console.log(response.data);
                  navigation.navigate("모든 방 보기",{content:response.data, u_token : ut})
                })
                .catch((error)=>{
                  if (error.response) {
                    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                    //console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                  }
                  else if (error.request) {
                    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                    // Node.js의 http.ClientRequest 인스턴스입니다.
                    console.log(error.request);
                  }
                  else {
                    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                    //console.log('Error', error.message);
                  }
                  //console.log(error.config);
                  console.log("ErrorErrorgggErrorError");
                  //Alert.alert(JSON.stringify(error.response.status))
                })
                }
            />
            )
          })
        }
  
      </MapView>        
      
    <TouchableOpacity style={[styles.button,
      {
        backgroundColor:colour1,
        position:'absolute',
        right:140,
        top:95,
      }]}
      onPress={()=>onPressHandler1(colour1)}>
        <Text style={styles.btnText}>단기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,
      {
        backgroundColor:colour2,
        position:'absolute',
        right:75,
        top:95,
      }]}
      onPress={()=>onPressHandler2(colour2)}>
        <Text style={styles.btnText}>양도</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.condition,{position:'absolute',
        right:10,
        top:95,width:60,flexDirection:"row",backgroundColor:"#fff",borderWidth:2,borderRadius:5,borderColor:"#D84315"}]}
        onPress={()=>{navigation.navigate('전체 필터',{u_token:ut})}}>
          <Image source={filter} style={{alignSelf:"center"}}/>
          <Text style={styles.conditionText}>필터</Text>
        </TouchableOpacity>
        
      <TouchableOpacity style={[styles.putButton,
      {
        position:'absolute',
        right:10,
        bottom:80,
        flexDirection:"row"
      }]}
      onPress={()=>{navigation.navigate('방 내놓기', {u_token : ut})}}>
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
      <TouchableOpacity style = {styles.cButton} onPress={()=>
        axios.get(`http://54.180.160.150:5000/api/v1/room`,{
          headers: {
            Authorization : ut
          }
        })
        .then((response)=>{
          //console.log(response.data);
          navigation.navigate("모든 방 보기",{content:response.data, u_token : ut})
        })
        .catch((error)=>{
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
          }
          else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          }
          else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            //console.log('Error', error.message);
          }
          //console.log(error.config);
          console.log("ErrorErrorgggErrorError");
          //Alert.alert(JSON.stringify(error.response.status))
        })
        }>
        <Text style = {styles.cText}>모든 방 보기</Text>
      </TouchableOpacity>
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
    width:60,
    height:35,
    margin:5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
  },
  cButton : {
    width:"100%",
    height:72.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#D84315"
  },
  cText : {
    color:"#FFF",
    fontWeight:"700",
    fontSize:20,
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
    width:50,
    height:35,
    margin:5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:10,
    //flex:1,
    //alignContent:"center",
    //justifyContent:"center"
  },
  conditionText:{
    fontSize:15,
    fontWeight:"700",
    alignSelf:"center",
    color:"#D84315"
  }
});