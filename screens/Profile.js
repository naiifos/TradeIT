import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { firebaseConfig } from "../config";
import UserDataManagement from '../singleton/UserDataManagement';

export default function Profile() {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
   

    const [userToken, setUserToken] = useState(firebase.auth().currentUser);
    return (
        <View>
            <Text>
                Welcome to Trade It {userToken.email}
            </Text>
        </View>
    );
}
