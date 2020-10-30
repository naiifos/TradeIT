import React, {useReducer, useCallback, useState} from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    TextInput
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import CardLogin from '../user/CardLogin';
import * as authActions from './action/Auth';
import Text from "react-native-paper/src/components/Typography/Text";
import LoginScreen from "./LoginScreen";

const AuthScreen = ({navigation}) => {

    const [email,setEmail]=React.useState('');
    const [pwd,setPwd]=React.useState('');

    const signupHandler = () => {
        authActions.signup(
            email,

    return <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}
    >
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <CardLogin style={styles.authContainer}>
                <ScrollView>
                    <Text style={styles.text}>E-Mail</Text>
                    <TextInput style={styles.textinput}
                        id="email"
                        label="E-Mail"
                        keyboardType="email-address"
                        required
                        email
                        autoCapitalize="none"
                        errorText="Please enter a valid email address."
                        onChangeText={text => setEmail(text)}
                        initialValue=""
                    />
                    <Text style={styles.text}>Password</Text>
                    <TextInput style={styles.textinput}
                        id="password"
                        label="Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a valid password."
                        onChangeText={text => setPwd(text)}
                        initialValue=""
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Login" color={"#ff0000"} onPress={signupHandler}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Switch to Log In"
                            color={"#808080"}
                            onPress={() => {navigation.navigate('LoginScreen')}}
                        />
                    </View>
                </ScrollView>
            </CardLogin>
        </LinearGradient>
    </KeyboardAvoidingView>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    },
    text:{
        padding: 20,
    },
    textinput:{
        borderBottomWidth:2,
    }
});
export default AuthScreen;
