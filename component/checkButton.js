import React, { useRef, useEffect, useState } from 'react'
import { Text, TextInput, View, Image, FlatList, StyleSheet,Button, ActivityIndicator } from 'react-native'
import * as firebase from "firebase";
import 'firebase/firestore';
const checkButton = (props) => {

    const currentUser =firebase.auth().currentUser.email;
    useEffect(() => {

        console.log(" current user  "  + firebase.auth().currentUser.email)
    }, []);
    const user = "fcbarcelone@outlook.com";
    /*check if the current user is the one who posted */
  
    if(currentUser === user){

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
    
   


}

export default checkButton
