import React,{useState,useEffect} from 'react';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity,Modal,Pressable, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Home from '../assets/CapstoneHome.png'
import filter from '../assets/filter.png'
import homeplus from '../assets/homeplus.png'
import message from '../assets/message.png'
import profile from '../assets/profile.png'
import axios from 'axios';
import Loading from '../components/Loading'
import RoomCard from '../components/RoomCard';

export default function MainPage({navigation,route}) {
  //유저 토큰
  let mApiKey = 'AIzaSyA-TBtTOWILp1wUABnai9adbbJMgcPP008'
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRoom,setModalRoom]=useState(0);
  const [ut,setut]=useState("")
  let pinCol=["#D84315","#C4C4C4"]
  const isFocused = useIsFocused()
  const [touchable, setTouchable] = useState(false)
  const [newMsg, setNewMsg] = useState(route.params.newMsg)
  useEffect(()=>{
    if(route.params.newMsg == -1){
      setTouchable(true)
      setNewMsg()
    }
    if(isFocused){
    setut(route.params.u_token)
    setRoom(route.params.rooms)
    setReady(false)
    
    console.log(rooms)
    }
  },[isFocused])
  const [touch1, setTouch1] = useState(false)
  const [colour1,setColours1]=useState("#D84315")
  const onPressHandler1=color=>{
    if (color==="#D84315"){
      setColours1("#C4C4C4")
    }
    else{
      setColours1("#D84315")
    }
  }
  const [colour2,setColours2]=useState("#D84315")
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
  const [mark, setMark] = useState([])
  
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
        }} 
        //disabled={touchable}
        onPress={()=>
          touchable ? Alert.alert("대학생 등록을 해주세요!") : 
          axios.get('http://54.180.160.150:5000/api/v1/message',{
          headers:{
              Authorization : ut
          }
        })
        .then((response)=>{
          //console.log(response);
          setReady(true)
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
          }}>{newMsg}</Text>
            
        </TouchableOpacity>
        <TouchableOpacity style={{
          marginTop:60,
          marginRight:25,
          width:25,
          height:25,
        }} 
        // disabled={touchable}
        onPress={()=>
          touchable ? Alert.alert("대학생 등록을 해주세요!") : 
          axios.get('http://54.180.160.150:5000/api/v1/user',{
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
              //title={content.rentPeriod.startDate}
              //description={content.type.category=="양도" ? "~" : content.rentPeriod.endDate}
              pinColor={content.type.category=="양도" ? colour2 : colour1}
              onPress={()=>{setModalVisible(!modalVisible)
                setModalRoom(i)
              }}
            />
            )
          })
        }

      </MapView>
      {/* <View style={styles.modalView}> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          <TouchableOpacity style={styles.modalView} onPress={()=>{
            axios.get(`http://54.180.160.150:5000/api/v1/room/`+rooms[modalRoom].roomID,{
              headers:{
                  Authorization:ut,
              }
          })
          .then((response)=>{
              console.log(response.data);
              console.log("이거 맞나")
              setModalVisible(!modalVisible);
              navigation.navigate('방 보기',{content: response.data, u_t:ut, auth:route.params.newMsg})
          })
          .catch((error)=>{
            console.log(error.config);
          })
          }} >
          <Image resizeMode={"cover"} style={styles.roomImage} source={{uri:rooms[modalRoom].photo.main}}/>
          <View style={{flex:2, marginTop:10}}>
            <View style={{flex:1, flexDirection:"row"}}>
              <View style={styles.kind}><Text style={styles.kindtext}>{rooms[modalRoom].type.roomType}</Text></View>
              <View style={styles.method}><Text style={styles.methodtext}>{rooms[modalRoom].type.category}</Text></View>
            </View>
            <View style={{flex:3}}>
              <Text style={styles.ptext} numberOfLines={1}>{rooms[modalRoom].type.rentType=="월세" ? 
              rooms[modalRoom].type.rentType+" "+rooms[modalRoom].price.monthly+"만원/보증금"+rooms[modalRoom].price.deposit+"만원" : 
              rooms[modalRoom].type.rentType+" "+rooms[modalRoom].price.deposit+"만원"}</Text>
              <Text style={styles.dtext} numberOfLines={1}>{rooms[modalRoom].type.category == "양도" ? rooms[modalRoom].rentPeriod.startDate : rooms[modalRoom].rentPeriod.startDate+"~"+rooms[modalRoom].rentPeriod.endDate}</Text>
              <Text style={styles.ftext} numberOfLines={1}>{rooms[modalRoom].information.floor+"층 , "+rooms[modalRoom].information.area+"평"}</Text>
          </View>

          </View>
          <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>창 닫기</Text>
            </Pressable>
            
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>창 닫기</Text>
            </Pressable> */}
          </TouchableOpacity>
      </Modal>
      {/* </View> */}
      {/* {
                axios.get(`http://54.180.160.150:5000/api/v1/room/`+content.roomID,{
                  headers:{
                      Authorization:ut,
                  }
              })
              .then((response)=>{
                  console.log(response.data);
                  console.log("이거 맞나")
                  navigation.navigate('방 보기',{content: response.data, u_t:ut})
              })
              .catch((error)=>{
                if (error.response) {
                  // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                  console.log(error.response.data);
                  console.log(error.response.status);
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
                  console.log('Error', error.message);
                }
                console.log(error.config);
                //Alert.alert(JSON.stringify(error.response.status))
              })
              }      */}
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
      // disabled={touchable}
      onPress={()=>{
        touchable ? Alert.alert("대학생 등록을 해주세요!") : 
        navigation.navigate('방 내놓기', {u_token : ut})}}>
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
          navigation.navigate("모든 방 보기",{content:response.data, u_token : ut, auth : route.params.newMsg})
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
  },
  cardContainer: {
    height:120,
    width:"100%",
    flex: 1,
    backgroundColor: '#fff',
  },
  cardC: {
    //marginTop:60,
    //marginLeft:10
  },
  modalView: {
    flexDirection:"row",
    width:"95%",
    height:120,
    marginLeft:10,
    backgroundColor: 'white',
    borderRadius: 20,
    //padding: 15,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute", 
    bottom:20, 
    alignSelf:"center"
  },
  buttonClose: {

    width:70,
    height:35,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    margin:5,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  roomImage: {
    width:100,
    height:100,
    alignSelf:"center",
    margin:10,
    flex:1
  },
  kind:{
    alignSelf:"center",
    width:55,
    height:25,
    backgroundColor:"#D84315",
    borderRadius:5,
  
  },
  kindtext:{
    color:"#fff",
    fontSize:12,
    fontWeight:"600",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    padding:5
  },
  method:{
    alignSelf:"center",
    width:55,
    height:25,
    backgroundColor:"#D84315",
    borderRadius:5,
    marginLeft:5
  },
  methodtext:{
    color:"#fff",
    fontSize:12,
    fontWeight:"600",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    padding:5
  },
  ptext: {
    color:"#000",
    fontSize:13,
    fontWeight:"700",
    marginTop:4
  },
  dtext: {
    color:"#797676",
    fontSize:9,
    fontWeight:"600",
    marginTop:14
},
ftext: {
    color:"#797676",
    fontSize:9,
    fontWeight:"600",
    marginTop:4
    },
});