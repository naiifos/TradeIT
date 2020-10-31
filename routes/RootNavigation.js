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

const Stack = createStackNavigator();
firebase.initializeApp(firebaseConfig);
const user=firebase.auth().currentUser;

export default function AuthStack() {
    return (
        <NavigationContainer>


            {!user ?(

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
                        name="Home"
                        component={Home}
                        options={{title: 'Home'}}
                    />

                </Stack.Navigator>

            ) : (
                <Navigationbar />
            )}


        </NavigationContainer>
    );
}
