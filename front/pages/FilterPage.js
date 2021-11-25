import React,{useState,useEffect} from 'react';
import { ScrollView,StyleSheet, Text,View, TextInput, Alert,TouchableOpacity,Image } from 'react-native';

import axios from 'axios';

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
import stove from "../assets/stove.png"




export default function FilterPage({navigation,route}) {
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [show, setShow] = useState(false);
  const [kcol, setKcol] = useState([0,0,0,0])
  const [mcol, setMcol] = useState([0,0])
  const [tcol, setTcol] = useState([0,0])
  const [scol, setScol] = useState([0,0,0])
  const [ccol, setCcol] = useState([0,0])
  const [deposit, setDeposit] = useState(10000000)
  const [monthly, setMonthly] = useState(10000000)
  const [dateCond, setDateCond] = useState(false)
  const [cond, setCond] = useState(false)

  const [room, setRoom] = useState([])
  const [category, setCategory] = useState(null)
  const [rent, setRent] = useState([])
  const [gender, setGender] = useState([])
  const [smoking, setSmoking] = useState([])

  let colour = ["#C4C4C4","#D84315"]
  let kind = ["원룸", "투룸 이상", "오피스텔", "아파트"]
  let method = ["단기임대","양도"]
  let type = ["월세","전세"]
  let sex = ["남성","여성","무관"]
  let cigar = ["비흡연","무관"]

  const [ut,setut]=useState("")
  useEffect(()=>{
    console.log(route.params);
    console.log(route.params.u_token);
    setut(route.params.u_token)
    console.log(ut)
  },[])

  const kindColor = (i) =>{
    let col = kcol.slice()
    if(col[i]==0){
      col[i] = 1
    }
    else{
      col[i]=0
    }
    setKcol(col)
    setRoom(addConds(col,kind))
  }
  const methodColor = (i) =>{
    let col = [0,0]
    col[i] = 1
    setMcol(col)
    setCategory(method[i])
    // 양도 선택시 성별, 흡연여부 고정
    // 교수님 피드백 반영으로 고정 해제
    // if(i==1){
    //   setCond(true);
    //   sexColor(2)
    //   cigarColor(1)
    // }else{
    //   setCond(false);
    // }
    if(i==1){
      setDateCond(true)
      Alert.alert("양도 선택 시 원 임차인(집주인)과의 계약을 상정하므로 마감(?) 날짜 선택이 비활성화 됩니다.")
    }
    else{
      setDateCond(false)
    }
  }
  const typeColor = (i) =>{
    let col = tcol.slice()
    if(col[i]==0){
      col[i] = 1
    }
    else{
      col[i]=0
    }
    setTcol(col)
    setRent(addConds(col,type))
  }
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === 'ios');
    setDate1(currentDate);
    setDate2(currentDate)
  };
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow(Platform.OS === 'ios');
    setDate2(currentDate);
  };
  const sexColor = (i) =>{
    let col = scol.slice()
    if(col[i]==0){
      col[i] = 1
    }
    else{
      col[i]=0
    }
    setScol(col)
    setGender(addConds(col,sex))

  }
  const cigarColor = (i) =>{
    let col = ccol.slice()
    if(col[i]==0){
      col[i] = 1
    }
    else{
      col[i]=0
    }
    setCcol(col)
    setSmoking(addConds(col,cigar))

  }

  const [oCols,setOCols]=useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [options,setOptions]=useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,])
  //const [ocolour,setColours]=useState("#C4C4C4")

  const addConds=(col,arr)=>{
    let i = 0;
    var opts = []

    for(;i<col.length;i++){
      if(col[i]==1){
        opts.push(arr[i])
      }
    }
    return opts
  }


  // const onConfirm=()=>{
  //   console.log("적용 좀 해봐라")
  //   setRoom(addConds(kcol,kind))
  //   setCategory(addConds(mcol,method))
  //   setRent(addConds(tcol,type))
  //   setGender(addConds(scol,sex))
  //   setSmoking(addConds(ccol,cigar))

  //   axios.post(`http://54.180.160.150:5000/api/v1/room/filter`,form,{
  //       headers: {
  //         Authorization : ut,
  //         "Content-Type": `application/json`
  //       }
  //     })
  //     .then(function(response){
  //       console.log(response)
  //       navigation.navigate("모든 방 보기",{content:response.data, u_token : ut})
  //       Alert.alert("필터가 적용되었습니다.")
  //     })
  //     .catch(function(error) {
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
  // }

  const onPressHandler=i=>{
    let col = oCols.slice();
    let op = options.slice();
    if(col[i]==0){
      col[i]=1;
    }else{
      col[i]=0;
    }
    if(op[i]==false){
      op[i]=true;
    }else{
      op[i]=false;
    }
    setOCols(col)
    setOptions(op)
  }

let form = {
    type : {
      roomType : room,
      category : category,
      rentType : rent, 
    },
    price : {
      deposit : deposit,
      monthly : monthly,
    },
    rentPeriod:{
      startDate : date1.toLocaleDateString(),
      endDate : (category=="양도" ? null : date2.toLocaleDateString()),
    },
    options:{
      bed : options[0],
      table : options[1],
      refrigerator : options[2],
      airconditioner : options[3],
      chair : options[4],
      closet : options[5],
      washingmachine : options[6],
      microwave : options[7],
      wifi : options[8],
      tv : options[9],
      cctv : options[10],
      parking : options[11],
      elevator : options[12],
      induction : options[13],
    },
    conditions:{
      gender : gender,
      smoking : smoking,
    },
  }
  return (
    <ScrollView style = {styles.container}>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>매물 종류</Text>
        <View style = {styles.btnContainer}>
          <View style = {styles.twoBtnContainer}>
            <TouchableOpacity style = {[styles.button,{backgroundColor:colour[kcol[0]]}]} onPress={()=>kindColor(0)}>
              <Text style = {styles.text}>{kind[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.button,{backgroundColor:colour[kcol[1]]}]} onPress={()=>kindColor(1)}>
              <Text style = {styles.text}>{kind[1]}</Text>
            </TouchableOpacity>          
          </View>
          <View style = {styles.twoBtnContainer}>
          <TouchableOpacity style = {[styles.button,{backgroundColor:colour[kcol[2]]}]} onPress={()=>kindColor(2)}>
              <Text style = {styles.text}>{kind[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.button,{backgroundColor:colour[kcol[3]]}]} onPress={()=>kindColor(3)}>
              <Text style = {styles.text}>{kind[3]}</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>계약 방식</Text>
        <View style = {styles.btnContainer}>
          <View style = {styles.twoBtnContainer}>
            <TouchableOpacity style = {[styles.button,{backgroundColor:colour[mcol[0]]}]} onPress={()=>methodColor(0)}>
              <Text style = {styles.text}>{method[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.button,{backgroundColor:colour[mcol[1]]}]} onPress={()=>methodColor(1)}>
              <Text style = {styles.text}>{method[1]}</Text>
            </TouchableOpacity>     
          </View>
        </View>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>거래 유형</Text>
        <View style = {styles.btnContainer}>
          <View style = {styles.twoBtnContainer}>
            <TouchableOpacity style = {[styles.button,{backgroundColor:colour[tcol[0]]}]} onPress={()=>typeColor(0)}>
              <Text style = {styles.text}>{type[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.button,{backgroundColor:colour[tcol[1]]}]} onPress={()=>typeColor(1)}>
              <Text style = {styles.text}>{type[1]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>임대 기간</Text>

        <View style = {styles.twoPicker}>
          <DateTimePicker style={styles.date} minimumDate={new Date()} maximumDate={new Date(2050,0,1)}
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
          <DateTimePicker style={styles.date} minimumDate={new Date()} maximumDate={new Date(2050,0,1)}
              testID="dateTimePicker"
              value={date2}
              mode='date'
              display="default"
              onChange={onChange2}
              disabled={dateCond}
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
              onChangeText={text=>setDeposit(parseInt(text))}
          />
          <Text style={[{
              alignSelf:"center",
              fontSize:20,
              fontWeight:'500',
              flex:1
          }]}>만원</Text>
        </View>
        <Text style = {styles.subTitle}>월세</Text>
        <View style={styles.deposit}>      
          <TextInput
              style={styles.textInputStyle}
              placeholder="최대 월세를 입력하세요."
              placeholderTextColor="#60605e"
              numeric
              keyboardType={'numeric'}
              onChangeText={text=>setMonthly(parseInt(text))}
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
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[0]]}]} onPress={()=>onPressHandler(0)}>
              <Image style={styles.oimage} source={bed} ></Image>
              <Text style = {styles.otext}>침대</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[1]]}]} onPress={()=>onPressHandler(1)}>
              <Image style={styles.oimage} source={desk} ></Image>
              <Text style = {styles.otext}>책상</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[2]]}]} onPress={()=>onPressHandler(2)}>
              <Image style={styles.oimage} source={fridge} ></Image>
              <Text style = {styles.otext}>냉장고</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[3]]}]} onPress={()=>onPressHandler(3)}>
              <Image style={styles.oimage} source={airconditioner} ></Image>
              <Text style = {styles.otext}>에어컨</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[4]]}]} onPress={()=>onPressHandler(4)}>
              <Image style={styles.oimage} source={chair} ></Image>
              <Text style = {styles.otext}>의자</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[5]]}]} onPress={()=>onPressHandler(5)}>
              <Image style={styles.oimage} source={closet} ></Image>
              <Text style = {styles.otext}>옷장</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
          <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[6]]}]} onPress={()=>onPressHandler(6)}>
              <Image style={styles.oimage} source={washer} ></Image>
              <Text style = {styles.otext}>세탁기</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[7]]}]} onPress={()=>onPressHandler(7)}>
              <Image style={styles.oimage} source={microwave} ></Image>
              <Text style = {styles.otext}>전자레인지</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[8]]}]} onPress={()=>onPressHandler(8)}>
              <Image style={styles.oimage} source={wifi} ></Image>
              <Text style = {styles.otext}>WIFI</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[9]]}]} onPress={()=>onPressHandler(9)}>
              <Image style={styles.oimage} source={tv} ></Image>
              <Text style = {styles.otext}>TV</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
          <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[10]]}]} onPress={()=>onPressHandler(10)}>
              <Image style={styles.oimage} source={cctv} ></Image>
              <Text style = {styles.otext}>복도 CCTV</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[11]]}]} onPress={()=>onPressHandler(11)}>
              <Image style={styles.oimage} source={parking} ></Image>
              <Text style = {styles.otext}>주차가능</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
          <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[12]]}]} onPress={()=>onPressHandler(12)}>
              <Image style={styles.oimage} source={elevator} ></Image>
              <Text style = {styles.otext}>엘리베이터</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[13]]}]} onPress={()=>onPressHandler(13)}>
              <Image style={styles.oimage} source={stove} ></Image>
              <Text style = {styles.otext}>가스레인지</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style = {styles.components}>
        <Text style = {styles.subTitle}>조건</Text>
        <Text style = {styles.optionTitle}>성별</Text>
        <View style = {styles.smallBtnContainer}>
          <TouchableOpacity style = {[styles.sButton,{backgroundColor:colour[scol[0]]}]} onPress={()=>sexColor(0)} disabled={cond}>
              <Text style = {styles.sText}>{sex[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.sButton,{backgroundColor:colour[scol[1]]}]} onPress={()=>sexColor(1)} disabled={cond}>
              <Text style = {styles.sText}>{sex[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.sButton,{backgroundColor:colour[scol[2]]}]} onPress={()=>sexColor(2)} disabled={cond}>
              <Text style = {styles.sText}>{sex[2]}</Text>
          </TouchableOpacity>
        </View>
        <Text style = {styles.optionTitle}>흡연여부</Text>
        <View style = {styles.smallBtnContainer}>
          <TouchableOpacity style = {[styles.sButton,{backgroundColor:colour[ccol[0]]}]} onPress={()=>cigarColor(0)} disabled={cond}>
              <Text style = {styles.sText}>{cigar[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.sButton,{backgroundColor:colour[ccol[1]]}]} onPress={()=>cigarColor(1)} disabled={cond}>
              <Text style = {styles.sText}>{cigar[1]}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style = {styles.cButton} onPress={()=>{
    console.log("적용 좀 해봐라")
    // setRoom(addConds(kcol,kind))
    // setCategory(addConds(mcol,method))
    // setRent(addConds(tcol,type))
    // setGender(addConds(scol,sex))
    // setSmoking(addConds(ccol,cigar))

    axios.post(`http://54.180.160.150:5000/api/v1/room/filter`,form,{
        headers: {
          Authorization : ut,
          "Content-Type": `application/json`
        }
      })
      .then(function(response){
        console.log(form)
        //console.log(response)
        console.log("##############필터####################")
        if(response.data.data.rooms.length!=0){
          navigation.navigate("MainPage",{rooms: response.data.data.rooms, newMsg: response.data.data.newMessageNum, u_token : ut})
          Alert.alert("필터가 적용되었습니다.")
        }
        else{
          console.log(response.data)
          Alert.alert("해당되는 방이 없습니다. 다시 필터링해주세요.")
        }
      })
      .catch(function(error) {
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
        console.log("############Error################")
        //Alert.alert(JSON.stringify(error.response.status))
      })
  }}>
        <Text style = {styles.cText}>적용하기</Text>
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
    marginTop:5,
    marginBottom:5
  },
  button : {
    width:150,
    height:50,
    marginRight:5,
    marginLeft:5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
  },
  text : {
    color:"#FFF",
    fontWeight:"700",
    fontSize:20,
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
  obutton : {
    width:150,
    height:50,
    marginRight:5,
    marginLeft:5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
    flexDirection:"row",
    borderWidth:1,
  },
  oimage:{
    margin:15,
    height:23,
    flex:1,
    resizeMode:"stretch"
  },
  otext : {
    color:"#000",
    fontWeight:"500",
    fontSize:15,
    flex:4,
  },
  sButton : {
    width:90,
    height:50,
    marginRight:5,
    marginLeft:5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
  },
  sText : {
    color:"#FFF",
    fontWeight:"700",
    fontSize:20,
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
