
/*i
import React from 'react';
import {ScrollView,StyleSheet,View,KeyboardAvoidingView} from "react-native";
import {createAppContainer,createSwitchNavigator} from "react-navigation";

import LoginScreen from '../screens/LoginScreen'
import LoadingScreen from '../screens/LoadingScreen'
import DashboardScreen from '../screens/DashboardScreen'

import * as firebase from 'firebase';
import {firebaseConfig} from "../config";
import {NavigationContainer} from "@react-navigation/native";
import Trade from '../screens/Trade';


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}



const AppSwitchNavigator=createSwitchNavigator({
    LoadingScreen:LoadingScreen,
    LoginScreen:LoginScreen,
    DashboardScreen:DashboardScreen,
    Trade:Trade
})

const AppNavigator = createAppContainer(AppSwitchNavigator)
export function AuthScreen(){
    return (
         <AppNavigator/>
    )
}
*/