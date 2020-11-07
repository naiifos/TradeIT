import React from 'react'
import { Text, TextInput, View, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import * as firebase from "firebase";
import 'firebase/firestore';
const checkButton = (props) => {

    /*check if the current user is the one who posted */
    if(!firebase.auth().currentUser.equals(props)){

        console.log(" the user is the same ")

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
    }else {

        console.log("the user is not the same") 
    
    
        return (
            <View>
                 <Text>
                
                </Text>
            </View>
        )
    }

}

export default checkButton
