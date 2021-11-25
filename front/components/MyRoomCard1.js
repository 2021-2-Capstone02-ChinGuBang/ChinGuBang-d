import React,{useState} from "react"
import {View,Text,Image,StyleSheet,TouchableOpacity} from "react-native";
import room from "../iconimage/room.png"
import heart from "../iconimage/heart.png"
import {Ionicons} from "@expo/vector-icons";

//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function MyRoomCard({content, navigation}) {

  //let pick = 0;//서버에서 하트를 눌렀는지 받아옴(0:안누름/1:누름), 현재는 상수처리
  let mApiKey = 'AIzaSyA-TBtTOWILp1wUABnai9adbbJMgcPP008'
  const [kind,setKind]=useState("월세")
  const [date,setDate]=useState("")
  const [u_t,setUt] = useState("")
  const [like,setLike] = useState(content.isLike)
  const [ID,setID]=useState(content.roomID)
  let main = content.photo.main
  useEffect(()=>{
    console.log("#############################################")
    console.log(content)
    console.log("#############################################")

    if(content.type.rentType=="월세"){
      setKind(content.type.rentType+" "+content.price.monthly+"만원/"+"보증금"+content.price.deposit+"만원")
    }else{
      setKind(content.type.rentType+" "+content.price.deposit+"만원")
    }

    if(content.type.category=="단기임대"){
      setDate(content.rentPeriod.startDate.toString().slice(0,10)+" ~ "+content.rentPeriod.endDate.toString().slice(0,10))
    }else{
      setDate(content.rentPeriod.startDate.toString().slice(0,10))
    }
    setUt(ut)
    console.log(u_t)
  },[])
    return (
        <TouchableOpacity onPress={()=>{
          axios.get(`http://54.180.160.150:5000/api/v1/room/`+content.roomID,{
            headers:{
                Authorization:u_t,
            }
        })
        .then((response)=>{
            console.log(response.data);
            console.log("이거 맞나")
            axios.get('https://maps.google.com/maps/api/geocode/json?address=' + response.data.data.information.post + '&key=' + mApiKey + '&language=ko')
            .then(function(res){
                console.log(res.data.results[0].geometry.location)
                navigation.navigate('방 보기',{content: response.data, u_t:u_t, location: res.data.results[0].geometry.location})
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
                //Alert.alert(JSON.stringify(error.response.status))
              });
            
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
        })}}>
        <View style={styles.card}>
            <View style={styles.c1}>
                <Image resizeMode={"cover"}
                style={styles.roomImage} source={{uri:main}}/>
            </View>

            <View style={styles.c2}>
                <View style={styles.c3}>
                <View style={styles.kind}><Text style={styles.kindtext}>{content.type.roomType}</Text></View>
                    <View style={styles.method}><Text style={styles.methodtext}>{content.type.category}</Text></View>
                    <TouchableOpacity style={{width:35,height:35}} onPress={()=>{like ? setLike(false) : setLike(true);
                                                                axios.post(`http://54.180.160.150:5000/api/v1/room/like/`+ID,null,{
                                                                  headers:{
                                                                      Authorization:u_t,
                                                                  }
                                                                }).then(function(res){
                                                                  console.log(res)
                                                                  console.log(u_t)
                                                                })
                                                                .catch(function(res){
                                                                  console.log(ID)
                                                                  Alert.alert(res.message)
                                                                  console.log(res)
                                                                  console.log("u_t:",u_t)
                                                                })}}>
                      <View style={styles.heartImage}>
                            <Ionicons
                              name={like ? "ios-heart" : "ios-heart-outline"}
                              color="#D84315"
                              size={25}
                            />
                      </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.c4}>
                <Text style={styles.ptext} numberOfLines={1}>{kind}</Text>
                    <Text style={styles.dtext} numberOfLines={1}>{date}</Text>
                    <Text style={styles.ftext} numberOfLines={1}>{content.information.floor+"층 , "+content.information.area+"평"}</Text>
                    <Text style={styles.utext} numberOfLines={1}>{content.createdAt.toString().slice(0,10)}</Text>
                    <View  style={styles.c5}>
                    <TouchableOpacity style={styles.checkButton} onPress={()=>{
                      navigation.navigate('방 수정하기')}}>
                        <Text style={styles.checkButtonText}>수정</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.checkButton}
                  onPress={() =>axios.delete(`http://54.180.160.150:5000/api/v1/room/`+content.roomID,{
                    headers:{
                        Authorization:u_t,
                    }
                }).then(function(){Alert.alert("삭제 완료");})
                }><Text style={styles.checkButtonText}>삭제</Text></TouchableOpacity>                    </View>
                </View>
            </View>
        
        </View>
        </TouchableOpacity>
        )
}

const styles = StyleSheet.create({

  card:{
    flex:1,
    //컨텐츠들을 가로로 나열
    //세로로 나열은 column <- 디폴트 값임 
    flexDirection:"row",
    //margin:10,
    height:160,
    borderBottomWidth:0.5,
    borderBottomColor:"#797676",
    padding:10
  },
  c1:{
    flex:1
  },
  c2:{
    flex:2
  },
  c3:{
    flex:1,
    flexDirection:"row",
  },
  c4:{
    flex:3
  },
  c5:{
    flexDirection:"row",
    alignSelf:"flex-end"
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
  heartImage:{
    marginLeft:85,
    width:25,
    height:25
  },
  roomImage: {
    //marginTop:30,
    width:100,
    height:100
  },
  ptext: {
    color:"#000",
    fontSize:13,
    fontWeight:"700",
    marginTop:2
  },
  dtext: {
    color:"#797676",
    fontSize:9,
    fontWeight:"600",
    marginTop:10
},
ftext: {
    color:"#797676",
    fontSize:9,
    fontWeight:"600",
    marginTop:2
    },
utext: {
    color:"#000",
    fontSize:9,
    fontWeight:"600",
    marginTop:3,
    marginLeft:170
    },
    checkButton:{
        width:60,
        height:30,
        backgroundColor:"#fff",
        borderColor:"#D84315",
        borderWidth:1.5,
        borderRadius:30,
        marginLeft:10,
        marginTop:6
      },
      checkButtonText:{
         //폰트 사이즈
         fontSize:13,
         //폰트 두께
         fontWeight:'600',
         //위 공간으로 부터 이격
         marginTop:6,
         marginLeft:15,
         //왼쪽 공간으로 부터 이격
         textAlign:'left',
         color:"#D84315"
      },
})