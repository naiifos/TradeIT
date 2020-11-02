import {createStackNavigator} from '@react-navigation/stack';
import createSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';
import AuthScreen from '../screens/AuthScreen';
import Home from '../screens/Home';
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import * as firebase from "firebase";
import {Image, Text, View} from "react-native";
import Navigationbar from "../component/Navigationbar";
import {firebaseConfig} from "../config";
import Trade from "../screens/Trade";


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const Stack = createStackNavigator();
export default function () {
    firebase.auth().onAuthStateChanged(function(user) {
        return <NavigationContainer>
            {user===null ?(
                <Stack.Navigator
                    initialRouteName="Auth"
                    screenOptions={{gestureEnabled: false}}
                >
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{title: 'Sign Up'}}
                    />
                    <Stack.Screen
                        name="Trade"
                        component={Trade}
                        options={{title: 'Trade'}}
                    />

                </Stack.Navigator>

            ) : (
                <Navigationbar />
            )}
        </NavigationContainer>;

    });
}
/*

       <NavigationContainer>
            {user===null ?(
                <Stack.Navigator
                    initialRouteName="Auth"
                    screenOptions={{gestureEnabled: false}}
                >
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{title: 'Sign Up'}}
                    />
                    <Stack.Screen
                        name="Trade"
                        component={Trade}
                        options={{title: 'Trade'}}
                    />

                </Stack.Navigator>

            ) : (
                <Navigationbar />
            )}
        </NavigationContainer>
 */
