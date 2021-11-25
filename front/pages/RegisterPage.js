import { StatusBar} from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput } from 'react-native';
import search from "../iconimage/search.png"
import axios from "axios"

export default function RegisterPage({navigation,route}) {

  const [re, setre] = useState("비밀번호가 동일하지 않습니다.");
  const [reg, setreg] = useState(false);
  const [value1, onChangeText1] = React.useState('재확인');
  const [value2, onChangeText2] = React.useState('');
  const [value3, onChangeText3] = React.useState('');
 
  useEffect(()=>{
    console.log(route.params);
    //if(value1==value2){setre("비밀번호가 동일합니다.")}
    //else if(value1!=value2){setre("비밀번호가 동일하지 않습니다.")}
     }
, [])

function isPassword(asValue){
  var regExp = /^(?=.*[a-zA-z])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  console.log(regExp.test(asValue));
  if(regExp.test(asValue)==true){
    setreg(true);
     return alert("비밀번호 OK!");

  }
  else if(regExp.test(asValue)==false){
    setreg(false);
     return alert("비밀번호 형식이 틀립니다!");
     
  }
}

function isre(asValue){
  if(asValue==value2){setre("비밀번호가 동일합니다.")}
  else if(asValue=value2){setre("비밀번호가 동일하지 않습니다.")}
}
  return reg ?(  re=="비밀번호가 동일합니다."?
   ( <View style={styles.container}>
    <Text style={styles.title}>나의 정보</Text>
    
    <View style={styles.idContainer}>
      <Text style={styles.id}>아이디 </Text>
      
      <View style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}>
      <Text style={styles.EmailText}>{route.params.email}</Text>
      </View>
      </View>
    <View style={styles.pwContainer}>
      <Text style={styles.pw}>비밀번호  </Text>
      <TextInput
          secureTextEntry
          style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}
          onChangeText={text => onChangeText2(text)}
          value2={value2}
          />
      <TouchableOpacity style={styles.check} onPress={()=>isPassword(value2)}>
        <Text style={styles.checkbox}>확인</Text>
      </TouchableOpacity>
    </View>

    <Text style={styles.pwt}>비밀번호는 8~16자로 영문, 숫자, 특수문자를 최소 한가지씩 조합해주세요:)</Text>
   
    <View style={styles.rpwContainer}>
      <Text style={styles.rpw}>pw재확인</Text>
      <TextInput
          secureTextEntry
          style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}
          onChangeText={text => onChangeText1(text)}
          value1={value1}
          />
          <TouchableOpacity style={styles.check} onPress={()=>isre(value1)}>
            <Text style={styles.checkbox}>확인</Text>
          </TouchableOpacity>
    </View>
    <Text style={styles.ret}>{re}</Text>
    <View style={styles.nicknameContainer}>
      <Text style={styles.nickname}>닉네임 </Text>  
      <TextInput
          style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}
          onChangeText={text => onChangeText3(text)}
          value3={value3}
          />
    </View>
      <TouchableOpacity style={styles.regiButton} 
        onPress={() =>axios.post(`http://54.180.160.150:5000/api/v1/auth/signup`, {
          email : route.params.email,
          password : value2,
          nickname : value3,
          university : route.params.university
          })
          .then(function(response)
          {
              console.log(response.data); 
              alert(response.data.message+" 로그인 해주세요!");
              navigation.navigate('로그인');  
          })
          .catch(function (error) {console.log("오류"); alert("정보를 제대로 입력해주세요.");})
          }
        ><Text style={styles.regiButtonText}>가입하기</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>):(<View style={styles.container}>
    <Text style={styles.title}>나의 정보</Text>
    
    <View style={styles.idContainer}>
      <Text style={styles.id}>아이디 </Text>
      
      <View style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}>
      <Text style={styles.EmailText}>{route.params.email}</Text>
      </View>
      </View>
    <View style={styles.pwContainer}>
      <Text style={styles.pw}>비밀번호  </Text>
      <TextInput
          secureTextEntry
          style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}
          onChangeText={text => onChangeText2(text)}
          value2={value2}
          />
      <TouchableOpacity style={styles.check} onPress={()=>isPassword(value2)}>
        <Text style={styles.checkbox}>확인</Text>
      </TouchableOpacity>
    </View>

    <Text style={styles.pwt}>비밀번호는 8~16자로 영문, 숫자, 특수문자를 최소 한가지씩 조합해주세요:)</Text>
   
    <View style={styles.rpwContainer}>
      <Text style={styles.rpw}>pw재확인</Text>
      <TextInput
          secureTextEntry
          style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}
          onChangeText={text => onChangeText1(text)}
          value1={value1}
          />
          <TouchableOpacity style={styles.check} onPress={()=>isre(value1)}>
            <Text style={styles.checkbox}>확인</Text>
          </TouchableOpacity>
    </View>
    <Text style={styles.ret}>{re}</Text>
    <View style={styles.nicknameContainer}>
      <Text style={styles.nickname}>닉네임 </Text>  
      <TextInput
          style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}
          onChangeText={text => onChangeText3(text)}
          value3={value3}
          />
    </View>
      <TouchableOpacity style={styles.regiButton} 
        onPress={() => alert("비밀번호를 재확인 해주세요.")}
        ><Text style={styles.regiButtonText}>가입하기</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>)
  ):(
    <View style={styles.container}>
    <Text style={styles.title}>나의 정보</Text>
      
    <View style={styles.idContainer}>
      <Text style={styles.id}>아이디 </Text>
      
      <View style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}>
      <Text style={styles.EmailText}>{route.params.email}</Text>
      </View>
      </View>
    <View style={styles.pwContainer}>
      <Text style={styles.pw}>비밀번호  </Text>
      <TextInput
          secureTextEntry
          style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}
          onChangeText={text => onChangeText2(text)}
          value2={value2}
          />
           <TouchableOpacity style={styles.check} onPress={()=>isPassword(value2)}>
      <Text style={styles.checkbox}>확인</Text>
    </TouchableOpacity>
    </View>

    <Text style={styles.pwt}>비밀번호는 8~16자로 영문, 숫자, 특수문자를 최소 한가지씩 조합해주세요:)</Text>
   
    <View style={styles.rpwContainer}>
      <Text style={styles.rpw}>pw재확인</Text>
      <TextInput
          secureTextEntry
          style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}
          onChangeText={text => onChangeText1(text)}
          value1={value1}
          />
    </View>
    {/*<Text style={styles.ret}>{re}</Text>*/}
    <View style={styles.nicknameContainer}>
      <Text style={styles.nickname}>닉네임 </Text>  
      <TextInput
          style={{ width:200,height: 40, borderWidth:1.5,borderColor:"#797676"}}
          onChangeText={text => onChangeText3(text)}
          value3={value3}
          />
    </View>
      <TouchableOpacity style={styles.regiButton} onPress={() => alert("비밀번호를 확인해주세요!")}>
        <Text style={styles.regiButtonText}>가입하기</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    EmailText:{
       //폰트 사이즈
       fontSize:16,
       //폰트 두께
       fontWeight:'400',
       //위 공간으로 부터 이격
       marginTop:7,
       marginLeft:10,
    },
    checkbox:{
       //폰트 사이즈
       fontSize:13,
       //폰트 두께
       fontWeight:'700',
       //위 공간으로 부터 이격
       marginTop:5,
       textAlign:"center",
       color:"#D84315"
    },
    check:{
      width:50,
      height:30,
      borderColor:"#D84315",
      borderRadius:10,
      borderWidth:2,
      backgroundColor:"#fff",
      alignSelf:"flex-end",
      marginLeft:3,
      marginBottom:3
    },
    title:{
      //폰트 사이즈
    fontSize: 25,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:30,
    marginLeft:30,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#000"
    },
    idContainer:{
      flexDirection:"row",
      width:320,
      height:40,
      marginLeft:20,
      marginTop:30
    },
    id:{
        //폰트 사이즈
      fontSize:15,
      //폰트 두께
      fontWeight:'600',
      //위 공간으로 부터 이격
      marginTop:10,
      marginLeft:10,
      //왼쪽 공간으로 부터 이격
      marginRight:33,
      textAlign:'left',
    },
    pwContainer:{
      flexDirection:"row",
      width:320,
      height:40,
      marginLeft:20,
      marginTop:25
    },
    pw:{
        //폰트 사이즈
        fontSize:15,
        //폰트 두께
        fontWeight:'600',
        //위 공간으로 부터 이격
        marginTop:10,
        marginLeft:10,
        //왼쪽 공간으로 부터 이격
        marginRight:15,
        textAlign:'left',
    },
    rpwContainer:{
      flexDirection:"row",
      width:320,
      height:40,
      marginLeft:20,
      marginTop:5
    },
    rpw:{
        //폰트 사이즈
        fontSize:15,
        //폰트 두께
        fontWeight:'600',
        //위 공간으로 부터 이격
        marginTop:10,
        marginLeft:10,
        //왼쪽 공간으로 부터 이격
        marginRight:15,
        textAlign:'left',
    },
    ret:{
      //폰트 사이즈
      fontSize:12,
      //폰트 두께
      fontWeight:'600',
      //위 공간으로 부터 이격
      marginTop:5,
      textAlign:'right',
      color:"#D84315",
      marginRight:60
  },
    pwt:{
      color:"#797676",
      //폰트 사이즈
      fontSize:12,
      //위 공간으로 부터 이격
      marginTop:5,
      marginLeft:100,
      //왼쪽 공간으로 부터 이격
      marginRight:35,
      textAlign:'right',
    },
    nicknameContainer:{
      flexDirection:"row",
      width:320,
      height:40,
      marginLeft:20,
      marginTop:25
    },
    nickname:{
      //폰트 사이즈
      fontSize:15,
      //폰트 두께
      fontWeight:'600',
      //위 공간으로 부터 이격
      marginTop:10,
      marginLeft:10,
      //왼쪽 공간으로 부터 이격
      marginRight:33,
      textAlign:'left',
    },
    regiButton:{
      position: 'absolute',
      alignSelf:"center",
      width:320,
      height:40,
      backgroundColor:"#D84315",
      borderRadius:5,
      bottom:50
    },
    regiButtonText:{
      color:"#fff",
      fontWeight:"700",
      fontSize:18,
      //텍스트의 현재 위치에서의 정렬 
      textAlign:"center",
      marginTop:8
    }
});
