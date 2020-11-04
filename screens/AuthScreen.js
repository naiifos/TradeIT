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
import Text from "react-native-paper/src/components/Typography/Text";
<<<<<<< HEAD
import { useNavigation } from "@react-navigation/native";
import Auth from "./action/Auth";
import Login from './action/Login'
=======
import {useNavigation} from "@react-navigation/native";
>>>>>>> 9dcbca5bd9f634ece77202ffd52aac07de9f0a42
import * as firebase from "firebase";
import AuthStack from "../routes/RootNavigation";
import { AuthContext } from '../component/Context';

const AuthScreen = () => {
    const navigation = useNavigation();

    const [email,setEmail]=React.useState('');
    const [pwd,setPwd]=React.useState('');
    const [isSignUp,setIsSignUp]=React.useState(false);
    const {signIn} = React.useContext(AuthContext)
    const {signUp} = React.useContext(AuthContext)


    const authHandler = () => {


        if(isSignUp) {
          //  alert("signup = "  +email + " || " + pwd)
            signUp(email,pwd); /*inscription*/

        }else{
          //  alert("signin = "  +email + "    " + pwd)

            signIn(email,pwd);  /*connexion*/
        }

    };

    /*inscription - Redirection vers Trade */
    async function   signupHandler() {
        const response = await auth(email, pwd)
        if (response.status !== 200) {
            throw new Error('Something went wrong in the auth screen!');
        }

        else{


        }

    }

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
export default AuthScreen;
