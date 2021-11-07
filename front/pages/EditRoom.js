import React,{useState} from 'react';
import { TouchableOpacity,ScrollView,StyleSheet, Text,Image, View, TextInput } from 'react-native';

import {Entypo} from '@expo/vector-icons'
import Vector from '../assets/Vector.png'
import RedButton from '../components/RedButton'
import OptionButton from '../components/OptionButton'
import SmallButton from '../components/SmallButton'
import Confirm from '../components/Confirm'

import DateTimePicker from '@react-native-community/datetimepicker';


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
import add from "../assets/add.png"
import vr_image from "../assets/vr_image.png"
import image_add from "../assets/image_add.png"



export default function EditRoom({navigation}) {
  const [date1, setDate1] = useState(new Date(1598051730000));
  const [date2, setDate2] = useState(new Date(1598051730000));

  const [show, setShow] = useState(false);

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === 'ios');
    setDate1(currentDate);
  };
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow(Platform.OS === 'ios');
    setDate2(currentDate);
  };

  return (
    <ScrollView style = {styles.container}>
      {/* <View style = {[styles.components, {marginTop:0}]}>
        <View style = {styles.titleRow}>      
          <TouchableOpacity style = {styles.backArrow}>
            <Image style={styles.arrow} source={Vector}/>
          </TouchableOpacity>
          <Text style = {styles.title}>수정하기</Text>
        </View>
      </View> */}
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>매물 종류</Text>
        <View style = {styles.btnContainer}>
          <View style = {styles.twoBtnContainer}>
            <RedButton content={"원룸"}></RedButton>
            <RedButton content={"투룸 이상"}></RedButton>
          </View>
          <View style = {styles.twoBtnContainer}>
            <RedButton content={"오피스텔"}></RedButton>
            <RedButton content={"아파트"}></RedButton>
          </View>
        </View>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>계약 방식</Text>
        <View style = {styles.btnContainer}>
          <View style = {styles.twoBtnContainer}>
            <RedButton content={"단기임대"}></RedButton>
            <RedButton content={"양도"}></RedButton>
          </View>
        </View>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>거래 유형</Text>
        <View style = {styles.btnContainer}>
          <View style = {styles.twoBtnContainer}>
            <RedButton content={"월세"}></RedButton>
            <RedButton content={"전세"}></RedButton>
          </View>
        </View>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>임대 기간</Text>
        <View style = {styles.twoPicker}>
          <DateTimePicker style={styles.date} minimumDate={new Date(2021,10,1)} maximumDate={new Date(2050,0,1)}
              testID="dateTimePicker"
              value={date1}
              mode='date'
              display="default"
              onChange={onChange1}
          />
          <Text style={
            [{
              alignSelf:"center",
              fontSize:20,
              fontWeight:'700'
          }]}>~</Text>
          <DateTimePicker style={styles.date} minimumDate={new Date(2021,10,1)} maximumDate={new Date(2050,0,1)}
              testID="dateTimePicker"
              value={date2}
              mode='date'
              display="default"
              onChange={onChange2}
          />
        </View>
      </View>
      <View style = {styles.components}>
        <Text style={styles.subTitle}>주소 입력</Text>
        <TouchableOpacity style={styles.address}>
          <Entypo name="magnifying-glass" size={24} color="black" style={{
            alignSelf:"flex-end",
            marginRight:5,
            marginTop:7,
          }} />
        </TouchableOpacity>
        <TextInput
              style={styles.textInputStyle}
              placeholder="상세주소를 입력하세요."
              placeholderTextColor="#60605e"
          />
      </View>

      <View style = {styles.components}>
        <Text style = {styles.subTitle}>기본 정보</Text>
        
      </View>

      <View style = {styles.components}>
        <Text style = {styles.subTitle}>부가 옵션</Text>
        <View style = {styles.btnContainer}>
          <View style = {styles.twoBtnContainer}>
            <OptionButton content="침대" img={bed}></OptionButton>
            <OptionButton content="책상" img={desk}></OptionButton>
          </View>
          <View style = {styles.twoBtnContainer}>
            <OptionButton content="냉장고" img={fridge}></OptionButton>
            <OptionButton content="에어컨" img={airconditioner}></OptionButton>
          </View>
          <View style = {styles.twoBtnContainer}>
            <OptionButton content="의자" img={chair}></OptionButton>
            <OptionButton content="옷장" img={closet}></OptionButton>
          </View>
          <View style = {styles.twoBtnContainer}>
            <OptionButton content="세탁기" img={washer}></OptionButton>
            <OptionButton content="전자레인지" img={microwave}></OptionButton>
          </View>
          <View style = {styles.twoBtnContainer}>
            <OptionButton content="WIFI" img={wifi}></OptionButton>
            <OptionButton content="TV" img={tv}></OptionButton>
          </View>
          <View style = {styles.twoBtnContainer}>
            <OptionButton content="복도 CCTV" img={cctv}></OptionButton>
            <OptionButton content="주차 가능" img={parking}></OptionButton>
          </View>
          <View style = {[styles.twoBtnContainer,{marginLeft:25}]}>
            <OptionButton content="엘리베이터" img={elevator}></OptionButton>
            <View style={{flex:1}}></View>
          </View>
        </View>
      </View>

      <View style = {styles.components}>
        <Text style = {styles.subTitle}>조건</Text>
        <Text style = {styles.optionTitle}>성별</Text>
        <View style = {styles.smallBtnContainer}>
          <SmallButton content="남성"></SmallButton>
          <SmallButton content="여성"></SmallButton>
          <SmallButton content="무관"></SmallButton>
        </View>
        <Text style = {styles.optionTitle}>흡연여부</Text>
        <View style = {styles.smallBtnContainer}>
          <SmallButton content="비흡연"></SmallButton>
          <SmallButton content="무관"></SmallButton>
        </View>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>상세 설명</Text>
        <TextInput
              style={styles.detailInputStyle}
              multiline
              numberOfLines={10}
              placeholder="방에 대한 상세 설명을 작성해주세요."
              placeholderTextColor="#60605e"
              keyboardType="default"
        />
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>방 사진 업로드</Text>
        <TouchableOpacity style={styles.add_image}>
          <Image source={image_add} style={{
            alignSelf:"center",
            marginTop:100,
          }}></Image>
        </TouchableOpacity>
        <View style={styles.detailImage}>
          <TouchableOpacity style={styles.smallImage}>
            <Image source={add} styles={styles.add}></Image>
            <Text style={styles.imageTitle}>대표사진</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallImage}>
            <Image source={add} styles={styles.add}></Image>
            <Text style={styles.imageTitle}>화장실</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallImage}>
            <Image source={add} styles={styles.add}></Image>
            <Text style={styles.imageTitle}>부엌</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallImage}>
            <Image source={add} styles={styles.add}></Image>
            <Text style={styles.imageTitle}>사진1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallImage}>
            <Image source={add} styles={styles.add}></Image>
            <Text style={styles.imageTitle}>사진2</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>360° 방 사진</Text>
        <Text style = {styles.detailText}>
        VR 카메라를 이용해 촬영하거나 '구글 스트리트 뷰' 앱으로 제작하세요.{"\n"}
        사진의 크기는 가로:세로=2:1의 비율이어야 합니다.{"\n"}
        사진의 확장자는 .jpeg 입니다.
        </Text>
        <TouchableOpacity style={styles.add_image}>
          <Image source={vr_image} style={{
            alignSelf:"center",
            marginTop:100,
          }}></Image>
        </TouchableOpacity>
      </View>

      <Confirm content={"수정 완료"} naviPage={"내 방"} navigation={navigation} alert={1}></Confirm>
      
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
    marginTop:5,
    marginBottom:5
  },
  titleRow:{
    flexDirection:"row",
  },
  title:{
    fontSize:20,
    fontWeight:'500',
    marginTop:30,
    alignSelf:'center',
    marginLeft:110,
    flex:10,
  },
  subTitle:{
    fontSize:20,
    fontWeight:'700',
    marginTop:10,
    marginLeft:40,
  },
  optionTitle:{
    fontSize: 15,
    fontWeight:'700',
    marginTop:20,
    marginLeft:40
  },
  btnContainer: {
    marginTop:10,
    alignItems:"center"
  },
  twoBtnContainer:{
    marginTop:10,
    flexDirection:"row",
  },
  smallBtnContainer:{
    marginTop:20,
    marginLeft:30,
    flexDirection:"row",
  },
  arrow:{
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
  backArrow:{
    width:30,
    height:30,
    borderRadius:10,
    marginTop:30,
    marginLeft:20,
    alignSelf:'flex-start',
    alignItems:'flex-start',
    backgroundColor:"#FFF",
    flex:1,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  twoPicker:{
    marginTop:10,
    flexDirection:"row",
  },
  date:{
    margin:5,
    flex:1,
    marginLeft:30
  },
  deposit:{
    flexDirection:"row",
    marginLeft:30
  },
  textInputStyle: {
    marginTop:20,
    width: 300,
    borderColor:"#C4C4C4",
    borderBottomWidth:2,
    borderRadius:5,
    padding: 5,
    alignSelf:"center",
    flex:1
  },
  address:{
    marginTop:10,
    alignSelf:"center",
    width:300,
    height:40,
    borderRadius:13,
    backgroundColor:"#F1F0F0",
  },
  detailInputStyle:{
    marginTop:20,
    borderRadius:5,
    borderWidth:1,
    borderColor:"#C4C4C4",
    width:300,
    height:370,
    alignSelf:"center",
    padding:5
  },
  add_image:{
    marginTop:20,
    width:250,
    height:250,
    borderWidth:1,
    borderRadius:5,
    borderColor:"#C4C4C4",
    alignSelf:"center"
  },
  detailImage:{
    marginTop:10,
    padding:5,
    height:80,
    marginLeft:20,
    flexDirection:"row"
  },
  smallImage:{
    marginTop:10,
    height:50,
    width:50,
    borderColor:"#C4C4C4",
    borderRadius:5,
    borderWidth:1,
    marginLeft:10,
  },
  add:{
    marginTop:50,
  },
  imageTitle:{
    alignSelf:"center",
    marginTop:20,
    fontWeight:"700",
  },
  detailText:{
    marginTop:10,
    marginLeft:40,
    color:"#8A8A8A",
    fontSize:10,
  }
})
