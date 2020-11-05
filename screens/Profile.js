import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { firebaseConfig } from "../config";
import UserDataManagement from '../singleton/UserDataManagement';

export default function Profile() {


   

    return (
        <View>
            <Text>
                Welcome to Trade It {firebase.auth().currentUser.email} {firebase.auth().currentUser.Name} 
       
             </Text>
        </View>
    );
}
