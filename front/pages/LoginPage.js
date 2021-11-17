import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput,Pressable ,Modal,Alert, FlatList } from 'react-native';
import home from "../iconimage/home.png"
import axios from "axios"
import { SearchBar } from 'react-native-elements';
import schooldata from '../schooldata.json';

export default function LoginPage({navigation,route}) {
//텍스트 입력 상태  
//아이디
const [value, onChangeText] = React.useState('');
//비번
const [value1, onChangeText1] = React.useState('');
  //모달
const [modalVisible, setModalVisible] = useState(false);

const [search, setSearch] = useState('');
const [filteredDataSource, setFilteredDataSource] = useState([]);
const [masterDataSource, setMasterDataSource] = useState([]);
 // 메일 변화
 const [mail, setmail]= useState('')
 const [name, setname]= useState('')

useEffect(() => {
   
  setFilteredDataSource(schooldata);
  setMasterDataSource(schooldata);
  
}, []);

const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = masterDataSource.filter(function (item) {
      const itemData = item.name
        ? item.name
        : '';
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(masterDataSource);
    setSearch(text);
  }
};

const ItemView = ({ item }) => {
  return (
    // Flat List Item
    <Text style={styles.itemStyle} onPress={() => getItem(item)}>
      {item.name}
    </Text>
  );
};


const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
      }}
    />
  );
};

const getItem = (item) => {
  // Function for click on an item
  alert(item.name);
  setname(item.name)
  setmail(item.mail)
  axios.post(`http://54.180.160.150:5000/api/v1/auth/public`, {
          university : item.name
          })
          .then(function(response)
          {
              console.log(response.data); 
              console.log(response.data.token); 
              navigation.navigate('MainPage',{u_token : response.data.token}); 
          })
          .catch(function (error) {console.log("오류"); })
  
  setModalVisible(!modalVisible); 
  
};

  return (
    <View style={styles.container}>
      <Text style={styles.title1}>학교 인증하고</Text>
      <Text style={styles.title2}>같은 학교 친구에게 방을 구해봐요!</Text>
      <Image style={styles.mainImage} source={home}/>
      <View style={styles.idContainer}>
        <Text style={styles.idText}>ID  </Text>
        <TextInput
          style={{ marginLeft:13,width:230,height: 40}}
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder="아이디를 입력해주세요."
        />
      </View>
      <View style={styles.pwContainer}>
        <Text style={styles.pwText}>PW  </Text>
        <TextInput
          secureTextEntry
          style={{ marginLeft:4,width:230, height: 40}}
          onChangeText={text => onChangeText1(text)}
          value1={value1}
          placeholder="비밀번호를 입력해주세요."
        /> 
      </View>
      <TouchableOpacity  onPress={() =>axios.post(`http://54.180.160.150:5000/api/v1/auth/signin`, {
                                    email : value, 
                                    password : value1
                                    })
                                    .then(function(response)
                                    {
                                        //console.log(response); 
                                        console.log(response.data);
                                        console.log(response.data.token);
                                         if(response.data.message =="로그인 성공")navigation.navigate('MainPage',{u_token : response.data.token})
                                                
                                        })
                                    .catch(function (error) {console.log(error); alert("로그인 실패! 아이디랑 비번 다시 입력 해주세요");})}>
                                    <View style={styles.loginButton} >
      <Text style={styles.loginButtonText}>로그인</Text></View></TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={()=>{navigation.navigate('학교등록')}}><Text style={styles.registerButtonText}>회원가입 하러가기</Text></TouchableOpacity>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={{color:"#D84315",fontSize: 15, fontWeight: '700',}}>집구경하고 싶은 학교를 골라주세요!</Text>
            <View style={styles.searchContainer}>
              <SearchBar
              //inputStyle={{height:30, backgroundColor: 'white'}}
              containerStyle={{height:45, backgroundColor: 'white',borderWidth: 1}}
              inputContainerStyle={{height:10,borderRadius: 5,backgroundColor: 'white'}}
              //round
                  searchIcon={{ size: 23 }}
                  onChangeText={(text) => searchFilterFunction(text)}
                  onClear={(text) => searchFilterFunction('')}
                  placeholder="학교를 검색해주세요."
                  value={search}
                />
              
              <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
              />
            </View>
            <Text style={{color:"#a5a5a5",fontSize: 11, fontWeight: '500',marginLeft:8,marginRight:8}}>* 인증없이 보러가기는 매물 확인만 가능하며, 채팅기능, 찜기능을 이용하려면 학교인증 후 로그인 해주세요:) *</Text>
        
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>창 닫기</Text>
            </Pressable>
              </View>
        </View>
      </Modal>
      <Pressable style={[styles.xButton, styles.xButton]} onPress={() => setModalVisible(true)}>
        <Text style={styles.xButtonText}>인증없이 보러가기</Text>
      </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title1:{
    //폰트 사이즈
    fontSize: 25,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:50,
    marginLeft:39,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#B71C1C"
  },
  title2:{
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:10,
    //왼쪽 공간으로 부터 이격
    marginLeft:39,
    marginRight:39,
    textAlign:'center'
  },
  mainImage:{
    width:180,
    height:180,
    marginTop:15,
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf:"center"
  },
  idContainer:{
    flexDirection:"row",
    alignSelf:"center",
    width:280,
    height:40,
    backgroundColor:"#fff",
    borderColor:"#797676",
    borderWidth:1.5,
    borderRadius:5,
    margin:7,
    marginTop:25,
  },
  idText:{
    color:"#000",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    marginTop:11,
    marginLeft:15
  },
  pwContainer:{
    flexDirection:"row",
    alignSelf:"center",
    width:280,
    height:40,
    backgroundColor:"#fff",
    borderColor:"#797676",
    borderWidth:1.5,
    borderRadius:5,
    margin:7
  },
  pwText:{
    color:"#000",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    marginTop:11,
    marginLeft:15
  },
  loginButton:{
    alignSelf:"center",
    width:280,
    height:40,
    backgroundColor:"#D84315",
    borderRadius:5,
    margin:7
  },
  loginButtonText:{
    color:"#fff",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    marginTop:11
  },
  registerButton:{
    alignSelf:"center",
    width:280,
    height:30,
    backgroundColor:"#fff" 
  },
  registerButtonText:{
    color:"#D84315",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    marginTop:5
  },
  xButton:{
    alignSelf:"center",
    width:130,
    height:20,
    //backgroundColor:"#8a8a8a",
    borderBottomColor:"#8a8a8a",
    borderBottomWidth:1,
    borderRadius:3 
  },
  xButtonText:{
    fontSize:13,
    color:"#8a8a8a",
    fontWeight:"500",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width:"90%",
    height:330,
    margin:20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop:10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  searchContainer:{
    alignSelf:"center",
    width:300,
    height:200,
    //marginLeft:30,
    marginTop:9
  },
  itemStyle: {
    padding: 10,
    fontSize: 14,fontWeight: '600',color:"#797676"
  },
});