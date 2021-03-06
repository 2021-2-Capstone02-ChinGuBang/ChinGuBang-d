import React,{useState, useEffect} from 'react';
import { TouchableOpacity,ScrollView,StyleSheet, Text,Image, View, TextInput, Button, Alert } from 'react-native';

import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import OptionButton from '../components/OptionButton'

import Postcode from '@actbase/react-daum-postcode';
import DateTimePicker from '@react-native-community/datetimepicker';

import Loading from '../components/Loading'

import search from '../assets/search.png'
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
import add from "../assets/add.png"
import vr_image from "../assets/vr_image.png"
import image_add from "../assets/image_add.png"
import cimg from "../iconimage/cimg.png"



export default function PutOutRoom({navigation, route}) {
  let mApiKey = 'AIzaSyA-TBtTOWILp1wUABnai9adbbJMgcPP008'

  const [img1,setImg1] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl93ASaa2NdIwZutsY6l82DpqvKCI5B43XBQ&usqp=CAU")
  const [img2,setImg2] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl93ASaa2NdIwZutsY6l82DpqvKCI5B43XBQ&usqp=CAU")
  const [img3,setImg3] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl93ASaa2NdIwZutsY6l82DpqvKCI5B43XBQ&usqp=CAU")
  const [img4,setImg4] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl93ASaa2NdIwZutsY6l82DpqvKCI5B43XBQ&usqp=CAU")
  const [img5,setImg5] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl93ASaa2NdIwZutsY6l82DpqvKCI5B43XBQ&usqp=CAU")
  
  //?????? ??????
  const [ut,setut]=useState(route.params.u_token)
  useEffect(()=>{
    console.log(route.params);
    console.log(route.params.u_token);
    //setut(route.params.u_token)
  },[])
  
  let form = new FormData();

  // const [base1,setBase1] = useState("")
  // const [base2,setBase2] = useState("")
  // const [base3,setBase3] = useState("")
  // const [base4,setBase4] = useState("")
  // const [base5,setBase5] = useState("")
  const [post,setPost] = useState('??????')
  //????????? ????????????,????????? ??????
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      console.log("Focused")
      if(route.params != undefined){
      if(route.params.image1 != undefined){
        //console.log(route.params.image1)
        setImg1(route.params.image1)
        setFile1({
          uri: route.params.image1,
          type: 'image/jpg',
          name: 'main.jpg'
        })
        //console.log(img1)
      }
      if(route.params.image2 != undefined){
        //console.log(img1)
        //console.log(route.params.image2)
        setImg2(route.params.image2)
        setFile2({
          uri:route.params.image2,
          type: 'image/jpg',
          name: 'kitchen.jpg'
        })
        console.log(img2)
      }
      if(route.params.image3 != undefined){
        setImg3(route.params.image3)  
        setFile3({
          uri:route.params.image3,
          type: 'image/jpg',
          name: 'restroom.jpg'
        })
        }
      if(route.params.image4 != undefined){
        setImg4(route.params.image4)
        setFile4({
          uri:route.params.image4,
          type: 'image/jpg',
          name: 'photo1.jpg'
        })
        }
      if(route.params.image5 != undefined){
        setImg5(route.params.image5)
        setFile5({
          uri:route.params.image5,
          type: 'image/jpg',
          name: 'photo2.jpg'
        })
        }

      // if(route.params.base1 != undefined){
      //   setBase1(route.params.base1)}
      // if(route.params.base2 != undefined){
      //   setBase2(route.params.base2)}
      // if(route.params.base3 != undefined){
      //   setBase3(route.params.base3)}
      // if(route.params.base4 != undefined){
      //   setBase4(route.params.base4)}
      // if(route.params.base5 != undefined){
      //   setBase5(route.params.base5)}

      if(route.params.postcode != undefined){
        setPost(route.params.postcode)
        console.log("focused");
      }
    }
    }



  
}, [isFocused])

  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const [kcol, setKcol] = useState([0,0,0,0])
  const [mcol, setMcol] = useState([0,0])
  const [tcol, setTcol] = useState([0,0])
  const [scol, setScol] = useState([0,0,0])
  const [ccol, setCcol] = useState([0,0])

  const [room, setRoom] = useState('')
  const [category, setCategory] = useState('')
  const [rent, setRent] = useState('')
  const [address, setAddress] = useState('')
  const [query, setQuery] = useState('')

  const [description, setDescription] = useState('')
  const [gender, setGender] = useState('')
  const [smoking, setSmoking] = useState('')

  const [deposit, setDeposit] = useState(0)
  const [monthly, setMonthly] = useState(0)
  const [control, setControl] = useState(0)
  const [area,setArea] = useState(0)
  const [floor,setFloor] = useState(0)
  const [construction,setConstruction] = useState(0)

  let colour = ["#C4C4C4","#D84315"]
  const [show, setShow] = useState(false);
  const [cond, setCond] = useState(false)
  const [dateCond, setDateCond] = useState(false)

  let kind = ["??????", "?????? ??????", "????????????", "?????????"]
  let method = ["????????????","??????"]
  let type = ["??????","??????"]
  let sex = ["??????","??????","??????"]
  let cigar = ["?????????","??????"]
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
  const kindColor = (i) =>{
    let col = [0,0,0,0]
    col[i] = 1
    setKcol(col)
    setRoom(kind[i])
  }
  const methodColor = (i) =>{
    let col = [0,0]
    col[i] = 1
    setMcol(col)
    setCategory(method[i])
    // ?????? ????????? ??????, ???????????? ??????
    // ????????? ????????? ???????????? ?????? ??????
    // if(i==1){
    //   setCond(true);
    //   sexColor(2)
    //   cigarColor(1)
    // }else{
    //   setCond(false);
    // }
    if(i==1){
      setDateCond(true)
      Alert.alert("?????? ?????? ??? ??? ?????????(?????????)?????? ????????? ??????????????? ??????(?) ?????? ????????? ???????????? ?????????.")
    }
    else{
      setDateCond(false)
    }
  }
  const typeColor = (i) =>{
    let col = [0,0]
    col[i] = 1
    setTcol(col)
    setRent(type[i])
  }
  const sexColor = (i) =>{
    let col = [0,0,0]
    col[i] = 1
    setScol(col)
    setGender(sex[i])
  }
  const cigarColor = (i) =>{
    let col = [0,0]
    col[i] = 1
    setCcol(col)
    if (i==0){
      setSmoking('?????????')
    }
    else{
      setSmoking('??????')
    }
  }

  let data = {
    type : {
      roomType : room,
      category : category,
      rentType : rent, 
    },
    price : {
      deposit : deposit,
      monthly : monthly,
      control : control,
    },
    information : {
      area : area,
      floor: floor,
      construction : construction,
      address: post+" "+address,
      query: query,
      description : description,
    },
    rentPeriod:{
      startDate : date1,
      endDate : date2,
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
    photo:{
      main: img1,
      restroom: img2,
      kitchen: img3,
      photo1: img4,
      photo2: img5
    }
  }
  const [file1,setFile1] = useState({
    uri:img1,
    type: 'image/jpg',
    name: 'main.jpg'
  })
  const [file2,setFile2] = useState({
    uri:img2,
    type: 'image/jpg',
    name: 'kitchen.jpg'
  })
  const [file3,setFile3] = useState({
    uri:img3,
    type: 'image/jpg',
    name: 'restroom.jpg'
  })
  const [file4,setFile4] = useState({
    uri:img4,
    type: 'image/jpg',
    name: 'photo1.jpg'
  })
  const [file5,setFile5] = useState({
    uri:img5,
    type: 'image/jpg',
    name: 'photo2.jpg'
  })
  form.append('type[roomType]',room)
  form.append('type[rentType]',rent)
  form.append('type[category]',category)
  form.append('price[deposit]',deposit)
  form.append('price[monthly]',monthly)
  form.append('price[control]',control)
  form.append('information[area]',area)
  form.append('information[floor]',floor)
  form.append('information[construction]',construction)
  form.append('information[post]',post)
  form.append('information[address]',address)
  form.append('information[query]',query)
  form.append('information[description]',description)
  form.append('rentPeriod[startDate]',String(date1.getMonth()+1) +"/"+ String(date1.getDate()) +"/"+ String(date1.getFullYear()))
  form.append('rentPeriod[endDate]',String(date2.getMonth()+1) +"/"+ String(date2.getDate()) +"/"+ String(date2.getFullYear()))
  form.append('options[bed]',options[0])
  form.append('options[table]',options[1])
  form.append('options[refrigerator]',options[2])
  form.append('options[airconditioner]',options[3])
  form.append('options[chair]',options[4])
  form.append('options[closet]',options[5])
  form.append('options[washingmachine]',options[6])
  form.append('options[microwave]',options[7])
  form.append('options[wifi]',options[8])
  form.append('options[tv]',options[9])
  form.append('options[cctv]',options[10])
  form.append('options[parking]',options[11])
  form.append('options[elevator]',options[12])
  form.append('options[induction]',options[13])
  form.append('conditions[gender]',gender)
  form.append('conditions[smoking]',smoking)
  form.append('main',file1)
  form.append('restroom',file2)
  form.append('kitchen',file3)
  form.append('photo1',file4)
  form.append('photo2',file5)
 


  return (
    <ScrollView style = {styles.container}>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>?????? ??????</Text>
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
        <Text style = {styles.subTitle}>?????? ??????</Text>
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
        <Text style = {styles.subTitle}>?????? ??????</Text>
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
        <Text style = {styles.subTitle}>?????? ??????</Text>
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
        <Text style={styles.subTitle}>?????? ??????</Text>
        {/* <TouchableOpacity style={styles.address} 
          onPress={()=>{navigation.navigate('?????? ??????')}}> 
          <Image source={search} style={{
            alignSelf:"flex-end",
            marginRight:5,
            marginTop:7,
          }}/>
        </TouchableOpacity> */}
        <Postcode
          style={{ width: "100%", height: 500 }}
          jsOptions={{ animation: true }}
          onSelected={ data=>{
            //console.log(JSON.stringify(data.address))
            setPost(data.address)
            //navigation.navigate('??? ?????????'),{"postcode": data.address}
            setQuery(data.query)
            Alert.alert("?????? ?????? ??????!",data.address);
          }}
      />
        <Text style={styles.textInputStyle}>{post}</Text>
        <TextInput
              style={styles.textInputStyle}
              placeholder="??????????????? ???????????????."
              placeholderTextColor="#60605e"
              onChangeText={text=>setAddress(text)}
        />
      </View>

      <View style = {styles.components}>
        <Text style = {styles.subTitle}>?????? ??????</Text>
          <View style={[styles.info,{borderTopWidth:1}]}>
              <Text style={styles.infoComp}>?????????</Text>
              <TextInput
              style={styles.basicInput}
              keyboardType="number-pad"
              placeholder="ex) 200"
              placeholderTextColor="#60605e"
              onChangeText={text=>setDeposit(text)}
              />
              <Text style={styles.infoData}>??????</Text>
          </View>
          <View style={styles.info}>
              <Text style={styles.infoComp}>??????</Text>
              <TextInput
              style={styles.basicInput}
              keyboardType="number-pad"
              placeholder={rent=="??????" ? "?????? ?????? ??? ????????????" : "ex) 30"}
              placeholderTextColor="#60605e"
              onChangeText={text=>setMonthly(text)}
              editable={rent=="??????" ? true : false}
              />
              <Text style={styles.infoData}>??????</Text>
          </View>
          <View style={styles.info}>
              <Text style={styles.infoComp}>?????????</Text>
              <TextInput
              style={styles.basicInput}
              keyboardType="number-pad"
              placeholder="ex) 5"
              placeholderTextColor="#60605e"
              onChangeText={text=>setControl(text)}
              />
              <Text style={styles.infoData}>??????</Text>
          </View>
          <View style={styles.info}>
              <Text style={styles.infoComp}>?????? ??????</Text>
              <TextInput
              style={styles.basicInput}
              keyboardType="number-pad"
              placeholder="ex) 10"
              placeholderTextColor="#60605e"
              onChangeText={text=>setArea(text)}
              />
              <Text style={styles.infoData}>???</Text>
          </View>
          <View style={styles.info}>
              <Text style={styles.infoComp}>??????</Text>
              <TextInput
              style={styles.basicInput}
              keyboardType="number-pad"
              placeholder="ex) 5"
              placeholderTextColor="#60605e"
              onChangeText={text=>setFloor(text)}
              />
              <Text style={styles.infoData}>???</Text>
          </View>
          <View style={styles.info}>
              <Text style={styles.infoComp}>????????????</Text>
              <TextInput
              style={styles.basicInput}
              keyboardType="number-pad"
              placeholder="ex) 2020"
              placeholderTextColor="#60605e"
              onChangeText={text=>setConstruction(text)}
              />
              <Text style={styles.infoData}>???</Text>
          </View>

      </View>

      <View style = {styles.components}>
        <Text style = {styles.subTitle}>?????? ??????</Text>
        <View style = {styles.btnContainer}>
          <View style = {styles.twoBtnContainer}>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[0]]}]} onPress={()=>onPressHandler(0)}>
              <Image style={styles.oimage} source={bed} ></Image>
              <Text style = {styles.otext}>??????</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[1]]}]} onPress={()=>onPressHandler(1)}>
              <Image style={styles.oimage} source={desk} ></Image>
              <Text style = {styles.otext}>??????</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[2]]}]} onPress={()=>onPressHandler(2)}>
              <Image style={styles.oimage} source={fridge} ></Image>
              <Text style = {styles.otext}>?????????</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[3]]}]} onPress={()=>onPressHandler(3)}>
              <Image style={styles.oimage} source={airconditioner} ></Image>
              <Text style = {styles.otext}>?????????</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[4]]}]} onPress={()=>onPressHandler(4)}>
              <Image style={styles.oimage} source={chair} ></Image>
              <Text style = {styles.otext}>??????</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[5]]}]} onPress={()=>onPressHandler(5)}>
              <Image style={styles.oimage} source={closet} ></Image>
              <Text style = {styles.otext}>??????</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
          <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[6]]}]} onPress={()=>onPressHandler(6)}>
              <Image style={styles.oimage} source={washer} ></Image>
              <Text style = {styles.otext}>?????????</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[7]]}]} onPress={()=>onPressHandler(7)}>
              <Image style={styles.oimage} source={microwave} ></Image>
              <Text style = {styles.otext}>???????????????</Text>
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
              <Text style = {styles.otext}>?????? CCTV</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[11]]}]} onPress={()=>onPressHandler(11)}>
              <Image style={styles.oimage} source={parking} ></Image>
              <Text style = {styles.otext}>????????????</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.twoBtnContainer}>
          <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[12]]}]} onPress={()=>onPressHandler(12)}>
              <Image style={styles.oimage} source={elevator} ></Image>
              <Text style = {styles.otext}>???????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.obutton,{borderColor:colour[oCols[13]]}]} onPress={()=>onPressHandler(13)}>
              <Image style={styles.oimage} source={stove} ></Image>
              <Text style = {styles.otext}>???????????????</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style = {styles.components}>
        <Text style = {styles.subTitle}>??????</Text>
        <Text style = {styles.optionTitle}>??????</Text>
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
        <Text style = {styles.optionTitle}>????????????</Text>
        <View style = {styles.smallBtnContainer}>
          <TouchableOpacity style = {[styles.sButton,{backgroundColor:colour[ccol[0]]}]} onPress={()=>cigarColor(0)} disabled={cond}>
              <Text style = {styles.sText}>{cigar[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.sButton,{backgroundColor:colour[ccol[1]]}]} onPress={()=>cigarColor(1)} disabled={cond}>
              <Text style = {styles.sText}>{cigar[1]}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>?????? ??????</Text>
        <TextInput
              style={styles.detailInputStyle}
              multiline
              numberOfLines={10}
              placeholder="?????? ?????? ?????? ????????? ??????????????????."
              placeholderTextColor="#60605e"
              keyboardType="default"
              onChangeText={text=>setDescription(text)}
        />
      </View>
      <View style =  {{height:220, backgroundColor:"#FFF",padding:10, marginTop:5,marginBottom:5}}>
        <Text style = {styles.subTitle}>??? ?????? ?????????</Text>
        <ScrollView style={styles.detailImage} horizontal indicatorStyle={"white"}>
          <TouchableOpacity style={styles.smallImage} onPress={()=>{navigation.navigate('????????????')}}>
            <Image style={styles.showimage} source={{uri: img1}} resizeMode={"cover"}/>
            <Text style={styles.imageTitle}>????????????</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallImage} onPress={()=>{navigation.navigate('?????????')}}> 
            <Image style={styles.showimage} source={{uri: img2}}/>
            <Text style={styles.imageTitle}>?????????</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallImage} onPress={()=>{navigation.navigate('??????')}}>
            <Image style={styles.showimage} source={{uri: img3}}/>
            <Text style={styles.imageTitle}>??????</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallImage} onPress={()=>{navigation.navigate('??????1')}}>
            <Image style={styles.showimage} source={{uri: img4}}/>
            <Text style={styles.imageTitle}>??????1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallImage} onPress={()=>{navigation.navigate('??????2')}}>
            <Image style={styles.showimage} source={{uri: img5}}/>
            <Text style={styles.imageTitle}>??????2</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style = {styles.components}>
        <Text style = {styles.subTitle}>360?? ??? ??????</Text>
        <Text style = {styles.detailText}>
        VR ???????????? ????????? ??????????????? '?????? ???????????? ???' ????????? ???????????????.{"\n"}
        ????????? ????????? ??????:??????=2:1??? ??????????????? ?????????.{"\n"}
        ????????? ???????????? .jpeg ?????????.
        </Text>
        <TouchableOpacity style={styles.add_image}>
          <Image source={vr_image} style={{
            alignSelf:"center",
            marginTop:100,
          }}></Image>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style = {styles.cButton} onPress={()=>
      axios.get('https://maps.google.com/maps/api/geocode/json?address=' + post + '&key=' + mApiKey + '&language=ko')
      .then(function(res){
        console.log(res)
        form.append('information[lat]',res.data.results[0].geometry.location.lat)
        form.append('information[lng]',res.data.results[0].geometry.location.lng)
        axios.post(`http://54.180.160.150:5000/api/v1/room`,form,{
        headers: {
          Authorization : ut,
          "content-type" : "multipart/form-data"
        }
      })
      .then(function(response){
        console.log(response)
        axios.get(`http://54.180.160.150:5000/api/v1/main`,{
          headers:{
            Authorization : ut
          }
        })
        .then(function(res){
          console.log(res)
          navigation.navigate('MainPage',{u_token : ut, rooms: res.data.data.rooms, newMsg: res.data.data.newMessageNum})
        })
        Alert.alert("?????? ??????????????? ?????????????????????.")
        console.log("ut ??? ?????? ????: ",ut)
      })
      .catch(function(error) {
        if (error.response) {
          // ????????? ?????????????????? ????????? 2xx??? ????????? ???????????? ?????? ????????? ??????????????????.
          console.log(error.response.data);
          console.log(error.response.status);
          //console.log(error.response.headers);
        }
        else if (error.request) {
          // ????????? ????????? ????????? ????????? ?????? ???????????????.
          // `error.request`??? ??????????????? XMLHttpRequest ???????????? ??????
          // Node.js??? http.ClientRequest ?????????????????????.
          console.log(error.request);
        }
        else {
          // ????????? ???????????? ????????? ???????????? ?????? ????????? ??????????????????.
          console.log('Error', error.message);
        }
        console.log(error.config);
        console.log("ut ??? ?????? ????: ",ut)
        //Alert.alert(JSON.stringify(error.response.status))
      })})

      }>
        <Text style = {styles.cText}>??? ?????????</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor:"#F6F6F6",
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
    height:100,
    width:100,
    borderColor:"#C4C4C4",
    borderRadius:5,
    borderWidth:1,
    marginLeft:10,
  },
  showimage:{
    borderRadius:5,
    width:"90%",
    height:"90%",
    alignItems:"center",
    justifyContent:"center",
    marginLeft:5,
    marginTop:5
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
  },
  basicInput:{
    fontSize:15,
    fontWeight:"500",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignItems:"center",
    flex:2,
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
      flex:1,
      fontSize:15,
      color:"#000",
      alignSelf:"center",
      fontWeight:"500",
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
  }
})
