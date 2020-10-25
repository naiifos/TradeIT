import {Text, View, StyleSheet, Button} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {Component} from "@firebase/component";
import * as Google from 'expo-google-app-auth';

export default function LoginScreen() {
    alert("yesssssssssssssssssssssss");
    function signInWithGoogleAsync() {
        try {

            const result = Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                behavior: 'web',
                iosClientId: '307766767212-umvfeobjh51n9bameos9qhg58ano9svs.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            }).then(test)

            function test() {
                if (result.type === 'success') {
                    return result.accessToken;
                } else {
                    return {cancelled: true};
                }
            }

        } catch (e) {
            return {error: true};
        }
    }

    return (
        <View>
            <Text>LoginScreen</Text>
            <Button title={'Sign in with google'} onPress={() => signInWithGoogleAsync()}/>
        </View>
    );


}
