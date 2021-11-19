import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function Loading(){
    return(
    <View style={styles.container}>
        <Text style={styles.title}>로딩 중...</Text>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#fdc453",
    },
    title:{
        fontSize:20,
        fontWeight:'700'

    }
})