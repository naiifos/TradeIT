import React, { useReducer, useCallback, useState } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardLogin from '../user/CardLogin';
import * as authActions from './action/Auth';
import Text from "react-native-paper/src/components/Typography/Text";
import { useNavigation } from "@react-navigation/native";
import Auth from "./action/Auth";
import Login from './action/Login'
import * as firebase from "firebase";
import AuthStack from "../routes/RootNavigation";
import  Navigationbar from "../component/Navigationbar";
import Test from "./Test";
import {AuthContext} from '../component/Context';
export default function AuthScreen() {
    const navigation = useNavigation();
    const auth = Auth();
    const login = Login();
    const [email, setEmail] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [isSignUp, setIsSignUp] = React.useState(false);
    const {signIn} = React.useContext(AuthContext)

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const value = firebase.auth().currentUser;

    const authHandler = () => {
        if (isSignUp) {
            signupHandler();

        } else {
            signIn();

        }

    };


    /*inscription - Redirection vers Trade */
    async function signupHandler() {

    
    }
    /*connexion -  Redirection vers App (Trade)*/

    const signinHandler = async () => {

        alert(" in to login ")
      /* 
        alert(" in to login ")
        global.goSingin = false;
        alert(" global  = " +global.goSingin )

        */
   
        const response = await login(email, pwd);
        alert("response  value = " + response.status)
        if (response.status !== 200) {
            alert(" IN TO IF")
            throw new Error('Something went wrong in the login screen!');
        }
        else {
            alert(" IN TO ELSE  " +  value)
            
        }
        
    };
    async function signinHandlerss() {
        alert("asyn funtion");


        const response = await login(email, pwd)
        if (response.status !== 200) {


            throw new Error('Something went wrong in the login screen!');
        }
        else {
            if (value === null) {

                alert(" EQUALS NULL ")
            } else {

                alert(" EQUALS VALUE ")


            }
        }

    }
    return <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}
    >
        <LinearGradient colors={['#f7287b', '#5c2038']} style={styles.gradient}>
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
                        <Button title={isSignUp ? 'Sign Up' : 'Login'} color={"#ff0000"} onPress={authHandler} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                            color={"#808080"}
                            onPress={() => {
                                setIsSignUp(isSignUp => !isSignUp);
                            }}
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
    text: {
        padding: 20,
    },
    textinput: {
        borderBottomWidth: 2,
    }
});
