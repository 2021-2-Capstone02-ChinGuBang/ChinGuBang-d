import React,{useState} from 'react';
import { ScrollView,StyleSheet, Text,View, TextInput, Alert } from 'react-native';

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




export default function FilterPage({navigation}) {
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
          <Text style = {styles.title}>전체 필터</Text>
        </View>
      </View> 
      이거 만든다고 개고생했었는데 별 쓸데없는 짓이었네 ㅋㅋ
      */}
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
        <Text style = {styles.subTitle}>보증금</Text>
        <View style={styles.deposit}>      
          <TextInput
              style={styles.textInputStyle}
              placeholder="최대 보증금을 입력하세요."
              placeholderTextColor="#60605e"
              numeric
              keyboardType={'numeric'}
          />
          <Text style={[{
              alignSelf:"center",
              fontSize:20,
              fontWeight:'500',
              flex:1
          }]}>만원</Text>
        </View>
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
      <Confirm content={"적용하기"} naviPage={"MainPage"} navigation={navigation} alert={1}></Confirm>
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
    marginTop:20,
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
    width: 200,
    borderColor:"#C4C4C4",
    borderBottomWidth:2,
    borderRadius:5,
    padding: 5,
    alignSelf:"center",
    flex:1
  },
})
