import React,{useState,useEffect} from 'react';
import { TouchableOpacity,ScrollView,StyleSheet, Text,Image, View, TextInput, Button } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
import roomImage from "../assets/roomImage.png"

import roomdata from "../room.json"

export default function RoomPage({navigation}) {
    let room = roomdata.data[0];
    let option = room.option;
    const [items, setItems] = useState([]);
    let images = [roomImage,bed,desk]
    useEffect(() => {
      let items = Array.apply(null, Array(60)).map((v, i) => {
        //Loop to make image array to show in slider
        return {
          source: {
            uri: 'http://placehold.it/200x200?text=' + (i + 1),
          },
        };
      });
      setItems(items);
    }, []);


    return(
        <ScrollView style={styles.container}>
            <View style = {styles.components}>
            <Gallery
                style={[styles.mainImage,{ flex: 1, backgroundColor: 'black', }]}
                initialPage="1"
                //initial image to show
                images={items}
            />
                {/* <Image source={roomImage} style={styles.mainImage}></Image> */}
            </View>
            <View style = {styles.components}>
                <View style={styles.badgeContainer}>            
                    <View style={styles.kind}>
                        <Text style={styles.kindtext}>{room.kind}</Text>
                    </View>
                        <View style={styles.kind}>
                            <Text style={styles.kindtext}>{room.method}</Text>
                    </View>
                    <View style={{flex:4}}></View>
                </View>
                <Text style={{
                    fontSize:25,
                    fontWeight:"700",
                    marginLeft:5,
                    marginTop:20,
                }}>{room.price}</Text>
            </View>
            <View style={styles.components}>
                <Text style={styles.detailText} multiline={true}>{room.detail}</Text>
            </View>
            <View style={styles.components}>
                <Text style={styles.subTitle}>방 정보</Text>
                <View style={[styles.info,{borderTopWidth:1}]}>
                    <Text style={styles.infoComp}>주소</Text>
                    <Text style={styles.infoData}>{room.address}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>전용 면적</Text>
                    <Text style={styles.infoData}>{room.area}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>임대 기간</Text>
                    <Text style={styles.infoData}>{room.date}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>층수</Text>
                    <Text style={styles.infoData}>{room.floor}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>건축년도</Text>
                    <Text style={styles.infoData}>{room.constYear+"년"}</Text>
                </View>
            </View>
            <View style={styles.components}>
                <Text style={styles.subTitle}>가격 정보</Text>
                <View style={[styles.info,{borderTopWidth:1}]}>
                    <Text style={styles.infoComp}>보증금</Text>
                    <Text style={styles.infoData}>{room.deposit+" 만원"}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>월세</Text>
                    <Text style={styles.infoData}>{room.monthly+" 만원"}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoComp}>관리비</Text>
                    <Text style={styles.infoData}>{room.admin+" 만원"}</Text>
                </View>
            </View>
            <View style={styles.components}>
                <Text style={styles.subTitle}>조건</Text>
                <View style={styles.badgeContainer}>            
                    <View style={styles.kind}>
                        <Text style={styles.kindtext}>{room.conditionSex}</Text>
                    </View>
                    <View style={styles.kind}>
                            <Text style={styles.kindtext}>{room.conditionCigar}</Text>
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
                    <OptionUntouch content="냉장고" img={fridge} set={option.fridge}></OptionUntouch>
                    <OptionUntouch content="에어컨" img={airconditioner} set={option.aircon}></OptionUntouch>
                </View>
                <View style = {styles.twoBtnContainer}>
                    <OptionUntouch content="의자" img={chair} set={option.chair}></OptionUntouch>
                    <OptionUntouch content="옷장" img={closet}set={option.closet}></OptionUntouch>
                </View>
                <View style = {styles.twoBtnContainer}>
                    <OptionUntouch content="세탁기" img={washer} set={option.washer}></OptionUntouch>
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
                <View style = {[styles.twoBtnContainer,{marginLeft:25}]}>
                    <OptionUntouch content="엘리베이터" img={elevator} set={option.elevator}></OptionUntouch>
                    <View style={{flex:1}}></View>
                </View>
                </View>
            </View>
            <View style={styles.components}>
                <Text style = {styles.subTitle}>방 위치</Text>
                <Text style = {{
                    fontSize:15,
                    fontWeight:"500",
                    marginLeft:20,
                }}>{room.address}</Text>
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
            </View>
            <View style={styles.components}>
                <Text style = {styles.subTitle}>360° 사진</Text>
                <TouchableOpacity style={styles.mainImage}>
                    <Image source={roomImage} style={styles.mainImage}></Image>
                </TouchableOpacity>
            </View>
            <Confirm content={"쪽지 보내기"} naviPage={"쪽지 보내기"} navigation={navigation} alert={0}></Confirm>
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

})