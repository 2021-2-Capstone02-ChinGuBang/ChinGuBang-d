import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import search from "../iconimage/search.png"
import { SearchBar } from 'react-native-elements';
import schooldata from '../schooldata.json';
import axios from "axios"

export default function SchoolRegisterPage({navigation,route}) {

 

  const [value2, onChangeText2] = React.useState('이메일 입력');
  const [value3, onChangeText3] = React.useState('인증번호');

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  // 메일 변화
  const [mail, setmail]= useState('')
  const [name, setname]= useState('')
// 다음페이지 버튼 활성화
  const [nbutton,setnbutton]=useState(true)

  useEffect(() => {
   
        setFilteredDataSource(schooldata);
        setMasterDataSource(schooldata);
        setmail()
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
  };

  return nbutton == true ? (
    
    <View style={styles.container}>
     
      <Text style={styles.title1}>학교 선택</Text>
      <Text style={styles.subtitle}>학교</Text>
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

      <Text style={styles.title2}>학교 웹메일 인증하기</Text>
      <View style={styles.emailContainer}>
        <TextInput
            style={{ width:130,height: 40, borderWidth:1,borderColor:"#E5E5E5"}}
            onChangeText={text => onChangeText2(text)}
            value2={value2}
            />
         <View style={styles.schoolEmail}><Text style={styles.schoolEmailText}>{mail}</Text></View>
         <TouchableOpacity style={styles.codeButton}  
                                onPress={() =>axios.post(`http://54.180.160.150:5000/api/v1/auth/email`, {
                                    email : value2+mail, 
                                    })
                                    .then(function(response)
                                    {
                                        //console.log(response); 
                                        console.log(response);
			                              //navigation.navigate('MainPage')           
			                               })
                                    .catch(function (error) {console.log("오류");})
                                    }><Text style={styles.codeButtonText}>요청</Text></TouchableOpacity>
      </View>
      <View style={styles.schoolregiContainer}>
        <TextInput
            style={{ width:270,
              height:40,
              borderWidth:1,
              borderColor:"#E5E5E5"}}
            onChangeText={text => onChangeText3(text)}
            value3={value3}
            />


         <TouchableOpacity style={styles.checkButton}
         onPress={() =>axios.post(`http://54.180.160.150:5000/api/v1/auth/code`, {
          email : value2+mail,
          code : value3
          })
          .then(function(response)
          {
              console.log(response.data); 
              console.log(response.data.data.isOkay);  
              setnbutton(!response.data.data.isOkay);    
              console.log(!response.data.data.isOkay);
              console.log(nbutton);
              alert(response.data.message);
           })
          .catch(function (error) {console.log("오류"); alert("인증번호 인증 실패");})
          }><Text style={styles.checkButtonText}>확인</Text></TouchableOpacity>

          
      </View>
      
      <TouchableOpacity style={styles.schoolregiButton} onPress={()=>alert("학교를 인증해주세요!")}><Text style={styles.schoolregiButtonText}>학교 웹메일로 인증하기</Text></TouchableOpacity>
      <StatusBar style="auto"/>
      
    </View>
  ):(
    <View style={styles.container}>
      <Text style={styles.title1}>학교 선택</Text>
      <Text style={styles.subtitle}>학교</Text>
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

      <Text style={styles.title2}>학교 웹메일 인증하기</Text>
      <View style={styles.emailContainer}>
        <TextInput
            style={{ width:130,height: 40, borderWidth:1,borderColor:"#E5E5E5"}}
            onChangeText={text => onChangeText2(text)}
            value2={value2}
            />
         <View style={styles.schoolEmail}><Text style={styles.schoolEmailText}>{mail}</Text></View>
         <TouchableOpacity style={styles.codeButton}  
                                onPress={() =>axios.post(`http://54.180.160.150:5000/api/v1/auth/email`, {
                                    email : value2+mail, 
                                    })
                                    .then(function(response)
                                    {
                                        //console.log(response); 
                                        console.log(response);
			                              //navigation.navigate('MainPage')           
			                               })
                                    .catch(function (error) {console.log("오류");})
                                    }><Text style={styles.codeButtonText}>요청</Text></TouchableOpacity>
      </View>
      <View style={styles.schoolregiContainer}>
        <TextInput
            style={{ width:270,
              height:40,
              borderWidth:1,
              borderColor:"#E5E5E5"}}
            onChangeText={text => onChangeText3(text)}
            value3={value3}
            />
         <TouchableOpacity style={styles.checkButton}
         onPress={() =>axios.post(`http://54.180.160.150:5000/api/v1/auth/code`, {
          email : value2+mail,
          code : value3
          })
          .then(function(response)
          {
              console.log(response.data); 
              console.log(response.data.data.isOkay);  
              setnbutton(!response.data.data.isOkay);    
              console.log(!response.data.data.isOkay);
              console.log(nbutton);
              alert(response.data.message);
           })
          .catch(function (error) {console.log("오류"); alert("인증번호 인증 실패");})
          }><Text style={styles.checkButtonText}>확인</Text></TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.schoolregiButton} disabled={nbutton} onPress={()=>{navigation.navigate('회원가입',{email : value2+mail, university : name})}}><Text style={styles.schoolregiButtonText}>학교 웹메일로 인증하기</Text></TouchableOpacity>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
itemStyle: {
    padding: 10,
  },
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
    marginTop:5,
    marginLeft:30,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#000"
  },
  subtitle:{
    //폰트 사이즈
    fontSize:20,
    //폰트 두께
    fontWeight:'700',
    //위 공간으로 부터 이격
    marginTop:15,
    marginLeft:30,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#797676"
  },
  searchContainer:{
    width:320,
    height:200,
    marginLeft:30,
    marginTop:9
  },
  searchImage:{
    //marginTop:7
  },
  schoolPickButton:{
    width:60,
    height:30,
    backgroundColor:"#fff",
    borderColor:"#D84315",
    borderWidth:1.5,
    borderRadius:30,
    marginLeft:30,
    marginTop:9
  },
  title2:{
    //폰트 사이즈
    fontSize: 25,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:13,
    marginLeft:30,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#000"
  },
  emailContainer:{
    flexDirection:"row",
    width:360,
    height:40,
    backgroundColor:"#fff",
    borderRadius:20,
    marginLeft:20,
    marginTop:12
  },
  schoolEmail:{
    width:130,
    height: 40, 
    borderWidth:1,
    marginLeft:10,
    borderColor:"#E5E5E5"
  },
  schoolEmailText:{
    //폰트 사이즈
    fontSize:13,
    //폰트 두께
    fontWeight:'600',
    //위 공간으로 부터 이격
    marginTop:8,
    marginLeft:5,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#000"
  },
  codeButton:{
    width:60,
    height:30,
    backgroundColor:"#fff",
    borderColor:"#D84315",
    borderWidth:1.5,
    borderRadius:30,
    marginLeft:9,
    marginTop:5
  },
  codeButtonText:{
    //폰트 사이즈
    fontSize:15,
    //폰트 두께
    fontWeight:'600',
    //위 공간으로 부터 이격
    marginTop:6,
    marginLeft:15,
    //왼쪽 공간으로 부터 이격
    textAlign:'left',
    color:"#D84315"
  },
  schoolregiContainer:{
    flexDirection:"row",
    marginLeft:20,
    marginTop:9
  },
  checkButton:{
    width:60,
    height:30,
    backgroundColor:"#fff",
    borderColor:"#D84315",
    borderWidth:1.5,
    borderRadius:30,
    marginLeft:10,
    marginTop:5
  },
  checkButtonText:{
     //폰트 사이즈
     fontSize:15,
     //폰트 두께
     fontWeight:'600',
     //위 공간으로 부터 이격
     marginTop:6,
     marginLeft:15,
     //왼쪽 공간으로 부터 이격
     textAlign:'left',
     color:"#D84315"
  },
  schoolregiButton:{
    position: 'absolute',
    alignSelf:"center",
    width:320,
    height:40,
    backgroundColor:"#D84315",
    borderRadius:5,
    bottom:50
  },
  schoolregiButtonText:{
    color:"#fff",
    fontWeight:"700",
    fontSize:18,
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center",
    marginTop:8
  }
})
