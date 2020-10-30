import {createStackNavigator} from '@react-navigation/stack';
import createSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import Trade from '../screens/Trade';
import React from "react";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <NavigationContainer>
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
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{title: 'Log In'}}
                />
                <Stack.Screen
                    name="Trade"
                    component={Trade}
                    options={{title: 'Trade'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

