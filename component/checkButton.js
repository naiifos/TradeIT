import React, { useRef, useEffect, useState } from 'react'
import { Text, TextInput, View, Image, FlatList, StyleSheet,Button, ActivityIndicator } from 'react-native'
import * as firebase from "firebase";
import 'firebase/firestore';
const checkButton = (props) => {

    
    useEffect(() => {
        
        console.log(" nom du user connecté "+firebase.auth().currentUser.email )
        console.log(" nom du user qui a posté  " +props.user )
    }, []);
    
    /*check if the current user is the one who posted */
  
    if(firebase.auth().currentUser.email === props.user){

        console.log(" the user is the same ")

        return (
            <View>
            
            </View>
        )
    }else {

        console.log("the user is not the same") 
    
    
        return (
            <View>
                     
               <Button
                    title="Trade IT ?"
                    color="#f7287b"
                    fontSize="12"
                    onPress={() => goRedirection()}
                />
            </View>
        )
    }
    

    function goRedirection(){

        console.log(" nothing to show")
    }
   


}

export default checkButton
