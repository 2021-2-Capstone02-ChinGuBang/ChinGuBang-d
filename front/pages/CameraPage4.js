import React from 'react'
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default function CameraPage4({navigation}) {
	const askForPermission = async () => {
		const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
		if (permissionResult.status !== 'granted') {
			Alert.alert('no permissions to access camera!', [{ text: 'ok' }])
			return false
		}
		return true
	}

	takeImage = async () => {
		// make sure that we have the permission
		const hasPermission = await askForPermission()
		if (!hasPermission) {
			return
		} else {
			// launch the camera with the following settings
			let image = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [3, 4],
				quality: 1,
				base64: true,
			}).catch(error => console.log({ error }));
			// make sure a image was taken:
			if (!image.cancelled) {
        navigation.navigate('방 내놓기',{"image4":image.uri, "base4":image.base64})
        // console.log(image.uri)
        // console.log(image.base64)
        alert("사진이 등록되었습니다!");
			}
		}
	}

    pickImage = async () => {
        // make sure that we have the permission
        const hasPermission = await askForPermission()
        if (!hasPermission) {
           return
        } else {
           // launch the camera with the following settings
           let pickimage = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ImagePicker.MediaTypeOptions.Images,
             allowsEditing: true,
             aspect: [3, 4],
             quality: 1,
             base64: true,
           })
           // make sure a image was taken:
           if (!pickimage.cancelled) {
            navigation.navigate('방 내놓기',{"image4":pickimage.uri, "base4":pickimage.base64})
            //console.log(JSON.stringify(pickimage))
            alert("사진이 등록되었습니다!");
           }
        }
      }

	return (
		<View style={styles.container}>
         <TouchableOpacity style={styles.cameraButton} onPress={takeImage}>
        <Text style={styles.cameraText}>카메라</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
        <Text style={styles.galleryText}>갤러리</Text>
      </TouchableOpacity>  
    
      </View>
	)
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
      flexDirection:"row",
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:100
     },
  
    cameraButton:{
      width:110,
      height:40,
      backgroundColor:"#D84315",
      borderRadius:20
    },
    cameraText:{
      textAlign:"center",
      color:"#ffffff",
      fontSize:20,
      marginTop:9
    },
    galleryButton:{
      marginLeft:20,
      width:110,
      height:40,
      backgroundColor:"#D84315",
      borderRadius:20
    },
    galleryText:{
      textAlign:"center",
      color:"#ffffff",
      fontSize:20,
      marginTop:9
    }
})