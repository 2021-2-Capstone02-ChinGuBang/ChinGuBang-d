import React,{useState,useEffect} from 'react';
import { TouchableOpacity,ScrollView,StyleSheet, Text,Image, View, TextInput, Alert } from 'react-native';
//import axios from "axios"
//import { Buffer } from "buffer";

import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import Gallery from 'react-native-image-gallery';

import OptionUntouch from '../components/OptionUntouch'
import Confirm from '../components/Confirm'

import bed from "../assets/bed.png"
import desk from "../assets/desk.png"
import fridge from "../assets/fridge.png"
import airconditioner from "../assets/airconditioner.png"
import chair from "../assets/chair.png"
import closet from "../assets/closet.png"
import washer from "../assets/washer.png"
import microwave from "../assets/microwave.png"
import wifi from "../assets/wifi.png"
import tv from "../assets/tv.png"
import cctv from "../assets/cctv.png"
import parking from "../assets/parking.png"
import elevator from "../assets/elevator.png"
import stove from "../assets/stove.png"

import roomImage from "../assets/roomImage.png"
import axios from 'axios';

export default function RoomPage({navigation, route}) {
    // let mApiKey = 'AIzaSyA-TBtTOWILp1wUABnai9adbbJMgcPP008'
    // const[long,setLong] = useState(route.params.location.lng)
    // const[lat,setLat] = useState(route.params.location.lat)
    const[ut,setUt]=useState('')
    const [touch, setTouch] = useState(false)
    useEffect(()=>{
        if(route.params.auth==-1){
            setTouch(true)
        }
        setUt(route.params.u_t)
        console.log("ut는 이거다",route.params.u_t)
        console.log(ut)
        
    },[])
    const [room, setRoom] = useState(route.params.content)
    const [option,setOption] = useState(room.data.options)
    let photo = [
        room.data.photo.main,
        room.data.photo.restroom,
        room.data.photo.kitchen,
        room.data.photo.photo1,
        room.data.photo.photo2
    ]
    let items = Array.apply(null, Array(5)).map((v, i) => {
        //Loop to make image array to show in slider
        return {
          source: {
            uri: photo[i]
          },
        };
      });
    console.log(items)
    // useEffect(()=>{
    //     axios.get(`http://54.180.160.150:5000/api/v1/room/24`,{
    //         headers:{
    //             Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJRCI6MjR9LCJpYXQiOjE2MzY0NDE2MzUsImV4cCI6MTYzNzY1MTIzNX0.1XGUeQ7tQ23nQcT3iLAtVFoEO_govS9cHED71LRYbCc",
    //         }
    //     })
    //     .then((response)=>{
    //         console.log(typeof(response))
    //         console.log(response.data.data.conditions.gender);
    //         setRoom(response.data)
    //         console.log(room.data.conditions.gender)
    //         console.log("뭐야 이거")
    //         setOption(room.data.options)
    //         //setOption(room.option)
    //     })
    //     .catch((error)=>{
    //       if (error.response) {
    //         // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         //console.log(error.response.headers);
    //       }
    //       else if (error.request) {
    //         // 요청이 이루어 졌으나 응답을 받지 못했습니다.
    //         // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
    //         // Node.js의 http.ClientRequest 인스턴스입니다.
    //         console.log(error.request);
    //       }
    //       else {
    //         // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
    //         console.log('Error', error.message);
    //       }
    //       console.log(error.config);
    //       //Alert.alert(JSON.stringify(error.response.status))
    //     })
    // },[])
    return(
        <ScrollView style={styles.container}>
            <View style = {styles.components}>
                {/* <View style={styles.mainImage}/> */}
            <Gallery
                style={[styles.mainImage,{ flex: 1, backgroundColor: 'black', }]}
                images={items}
            />
                {/* <Image source={roomImage} style={styles.mainImage}></Image> */}
            </View>
            <View style = {styles.components}>
                <View style={styles.badgeContainer}>            
                    <View style={styles.kind}>
                        <Text style={styles.kindtext}>{room.data.type.roomType}</Text>
                    </View>
                        <View style={styles.kind}>
                            <Text style={styles.kindtext}>{room.data.type.category}</Text>
                    </View>
                    <View style={{flex:4}}></View>
                </View>
                <Text style={{
                    fontSize:25,
                    fontWeight:"700",
                    marginLeft:5,
                    marginTop:20,
                }}>{room.data.type.rentType} {room.data.type.rentType=="전세" ? (room.data.price.deposit + "만원") : (room.data.price.monthly + "만원 / 보증금" + room.data.price.deposit + " 만원")}</Text>
            </View>
            <View style={styles.components}>
                <Text style={styles.detailText} multiline={true}>{room.data.information.description}</Text>
            </View>
            <View style={styles.components}>
                <Text style={styles.subTitle}>방 정보</Text>
                <View style={[styles.info,{borderTopWidth:1}]}>
                    <Text style={styles.infoComp}>주소</Text>
                    <Text style={styles.infoData}>{room.data.information.query}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>전용 면적</Text>
                    <Text style={styles.infoData}>{room.data.information.area} 평</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>임대 기간</Text>
                    <Text style={styles.infoData}>{room.data.type.category=="단기임대" ? room.data.rentPeriod.startDate.toString().slice(0,10)+"~"+room.data.rentPeriod.endDate.toString().slice(0,10)
                                                                                    : room.data.rentPeriod.startDate.toString().slice(0,10)}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>층수</Text>
                    <Text style={styles.infoData}>{room.data.information.floor} 층</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>건축년도</Text>
                    <Text style={styles.infoData}>{room.data.information.construction+" 년"}</Text>
                </View>
            </View>
            <View style={styles.components}>
                <Text style={styles.subTitle}>가격 정보</Text>
                <View style={[styles.info,{borderTopWidth:1}]}>
                    <Text style={styles.infoComp}>보증금</Text>
                    <Text style={styles.infoData}>{room.data.price.deposit+" 만원"}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>월세</Text>
                    <Text style={styles.infoData}>{room.data.type.rentType=="전세" ? "0 만원" : room.data.price.monthly+" 만원"}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>관리비</Text>
                    <Text style={styles.infoData}>{room.data.price.control+" 만원"}</Text>
                </View>
            </View>
            <View style={styles.components}>
                <Text style={styles.subTitle}>조건</Text>
                <View style={styles.badgeContainer}>            
                    <View style={styles.kind}>
                        <Text style={styles.kindtext}>{room.data.conditions.gender}</Text>
                    </View>
                    <View style={styles.kind}>
                            <Text style={styles.kindtext}>{room.data.conditions.smoking}</Text>
                    </View>
                    <View style={{flex:4}}></View>
                </View>
            </View>
            <View style = {styles.components}>
                <Text style = {styles.subTitle}>부가 옵션</Text>
                <View style = {styles.btnContainer}>
                <View style = {styles.twoBtnContainer}>
                    <OptionUntouch content="침대" img={bed} set={option.bed}></OptionUntouch>
                    <OptionUntouch content="책상" img={desk} set={option.desk}></OptionUntouch>
                </View>
                <View style = {styles.twoBtnContainer}>
                    <OptionUntouch content="냉장고" img={fridge} set={option.refrigerator}></OptionUntouch>
                    <OptionUntouch content="에어컨" img={airconditioner} set={option.airconditioner}></OptionUntouch>
                </View>
                <View style = {styles.twoBtnContainer}>
                    <OptionUntouch content="의자" img={chair} set={option.chair}></OptionUntouch>
                    <OptionUntouch content="옷장" img={closet}set={option.closet}></OptionUntouch>
                </View>
                <View style = {styles.twoBtnContainer}>
                    <OptionUntouch content="세탁기" img={washer} set={option.washingmachine}></OptionUntouch>
                    <OptionUntouch content="전자레인지" img={microwave} set={option.microwave}></OptionUntouch>
                </View>
                <View style = {styles.twoBtnContainer}>
                    <OptionUntouch content="WIFI" img={wifi} set={option.wifi}></OptionUntouch>
                    <OptionUntouch content="TV" img={tv} set={option.tv}></OptionUntouch>
                </View>
                <View style = {styles.twoBtnContainer}>
                    <OptionUntouch content="복도 CCTV" img={cctv} set={option.cctv}></OptionUntouch>
                    <OptionUntouch content="주차 가능" img={parking} set={option.parking}></OptionUntouch>
                </View>
                <View style = {styles.twoBtnContainer}>
                    <OptionUntouch content="엘리베이터" img={elevator} set={option.elevator}></OptionUntouch>
                    <OptionUntouch content="가스레인지" img={stove} set={option.induction}></OptionUntouch>
                </View>
                </View>
            </View>
            <View style={styles.components}>
                <Text style = {styles.subTitle}>방 위치</Text>
                <Text style = {{
                    fontSize:15,
                    fontWeight:"500",
                    marginLeft:20,
                }}>{room.data.information.query}</Text>
                <MapView style={styles.map} 
                    provider={PROVIDER_GOOGLE} 
                    initialRegion={{
                        latitude: parseFloat(room.data.information.lat), 
                        longitude: parseFloat(room.data.information.lng),
                        latitudeDelta: 0.0025,
                        longitudeDelta: 0.002,
                }}
                scrollEnabled={false}
                zoomEnabled={false}>
                    <Circle 
                        center={{
                            latitude: parseFloat(room.data.information.lat), 
                            longitude: parseFloat(room.data.information.lng),
                        }}
                        radius = {50}
                        strokeColor = "#D84315"
                        strokeWidth = {5}
                        fillColor = "#D84315"
                        >
                    </Circle>
                </MapView>
            </View>
            <View style={styles.components}>
                <Text style = {styles.subTitle}>360° 사진</Text>
                <TouchableOpacity style={styles.mainImage}>
                    <Image source={roomImage} style={styles.mainImage}></Image>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style = {styles.cButton} 
            // disabled={touch}
            onPress={()=>
            {   
                touch ? Alert.alert("대학생 등록을 해주세요!") : 
                //console.log("ut 확인용",ut)
                navigation.navigate("쪽지 보내기",{user_id:ut, roomID:room.data.roomID, rcID:room.data.user.userID})
            }}>
                <Text style = {styles.cText}>쪽지 보내기</Text>
            </TouchableOpacity>        
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#F6F6F6",
    },
    components:{
      backgroundColor:"#FFF",
      padding:10,
      marginTop:1,
      marginBottom:5
    },
    subTitle:{
        fontSize:20,
        fontWeight:'700',
        marginTop:10,
        marginLeft:15,
        marginBottom:20,
    },
    mainImage:{
        width:375,
        height:375,
    },
    badgeContainer:{
        flexDirection:"row"
    },
    btnContainer: {
        marginTop:10,
        alignItems:"center"
    },
    twoBtnContainer:{
        marginTop:10,
        flexDirection:"row",
    },
    kind:{
        alignSelf:"flex-start",
        width:55,
        height:25,
        margin:5,
        backgroundColor:"#D84315",
        borderRadius:5,
        flex:1,
    },
    kindtext:{
        color:"#fff",
        fontSize:12,
        fontWeight:"600",
        //텍스트의 현재 위치에서의 정렬 
        textAlign:"center",
        padding:5
    },
    detailText:{
        padding:10,
        fontSize:15        
    },
    info:{
        flexDirection:"row",
        height:55,
        width:"100%",
        borderBottomWidth:1,
        borderColor:"#E5E5E5",
    },
    infoComp:{
        marginLeft:20,
        alignSelf:"center",
        flex:1.2,
        fontSize:15,
        color:"#8A8A8A",
    },
    infoData:{
        flex:3.55,
        fontSize:15,
        color:"#000",
        alignSelf:"center",
        fontWeight:"500",
    },
    map: {
        width: "100%",
        height: 350,
        marginTop:20,
        marginBottom:20,
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

})