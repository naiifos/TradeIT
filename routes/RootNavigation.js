import { createStackNavigator } from '@react-navigation/stack';
import createSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import AuthScreen from '../screens/AuthScreen';
import Home from '../screens/Home';
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import { Image, Text, View } from "react-native";
import Navigationbar from "../component/Navigationbar";
import { firebaseConfig } from "../config";
import Trade from "../screens/Trade";
import Test from "../screens/Test";

export default function AuthStack() {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    //const user=firebase.auth().currentUser;
    const user = firebase.auth().currentUser;

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Auth"
                screenOptions={{ gestureEnabled: false }}
            >
                {user === null ? (
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{
                            title: 'Authenticate',
                            headerStyle:
                            {
                                backgroundColor: '#f7287b',
                            },

                            headerTitleStyle:
                            {
                                color: 'white',
                                fontWeight: 'bold',
                                marginTop: -10,
                                fontSize: 20,

                            },
                            headerTintColor: '#fff',

                            headerTransparent: true,

                        }}
                    />


                ) : (

                        <Stack.Screen
                            name="Auth"
                            component={Test}
                            options={{
                                title: 'Test',


                            }}
                        />

                    )}


            </Stack.Navigator>
        </NavigationContainer>
    );

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
