import React,{useState, useEffect} from 'react';
import Postcode from '@actbase/react-daum-postcode';
import {Alert} from 'react-native'

export default function PostCode({navigation}){
  const [post,setPost]=useState("")

  return (
      <Postcode
          style={{ width: "100%", height: "100%" }}
          jsOptions={{ animation: true }}
          onSelected={ data=>{
            //console.log(JSON.stringify(data.address))
            setPost(data.address)
            console.log(post)
            navigation.navigate('방 내놓기'),{"postcode": data.address}
            console.log(post)
            Alert.alert("주소 선택 완료!",post);
          }}
      />
     );
}