import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import React, { useEffect, useState,useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import Navigationbar from "./component/Navigationbar";
import { firebaseConfig } from "./config";
import { AuthContext } from './component/Context';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {
    View,
    Platform,
    ActivityIndicator,
} from 'react-native';
import 'firebase/firestore';
export default function App() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [signUpBool, setSignUp] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const Stack = createStackNavigator();

    const authContext = React.useMemo(() => ({

        signIn: (email, pwd) => { signinHandler(email, pwd); },
        signOut: () => { if (userToken !== null) { firebase.auth().signOut(); alert(" deconnexion  de " + userToken.email); setUserToken(null); console.log(" value of user token when logout " + firebase.auth().currentUser.email) } else { alert(" pas de deconnexion") } },
        signUp: (email, pwd) => { signupHandler(email, pwd);  },

    }));

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });

        useEffect(() => {
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                console.log(notification)
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener);
                Notifications.removeNotificationSubscription(responseListener);
            };
        }, []);


    firebase.auth().onAuthStateChanged(function (user) {
        if (user)
        {

            if (signUpBool)
            {
                navigator.geolocation.getCurrentPosition(
                    (position) => {

                        firebase.auth().currentUser.latitude = position.coords.latitude
                        firebase.auth().currentUser.longitude = position.coords.longitude
                        firebase.auth().currentUser.name = returnNameFromEmail(firebase.auth().currentUser.email);


                        firebase.firestore().collection('User').doc(firebase.auth().currentUser.email)
                            .set({
                                DarkTheme: false,
                                Latitude: firebase.auth().currentUser.latitude,
                                Longitude: firebase.auth().currentUser.longitude,
                                Name: firebase.auth().currentUser.name,
                                Notification: true
                            })
                            //ensure we catch any errors at this stage to advise us if something does go wrong
                            .catch(error => {
                                console.log('Something went wrong with added user to firestore: ', error);
                            })

                        console.log(" NOUVEAU USER INSCRIS " + firebase.auth().currentUser.email)

                        setSignUp(false);
                    },
                    (error) => console.log(JSON.stringify(error)),
                    { enableHighAccuracy: Platform.OS != 'android', maximumAge: 2000 }
                );

            } else {
                console.log(" connexion normale de " + firebase.auth().currentUser.email)
                firebase.firestore().collection('User').doc(firebase.auth().currentUser.email)
                    .get()
                    .then(function (doc) {
                        if (doc.exists) {

                            firebase.auth().currentUser.name = doc.data().Name
                            firebase.auth().currentUser.latitude = doc.data().Latitude
                            firebase.auth().currentUser.longitude = doc.data().Longitude
                            firebase.auth().currentUser.Notification = doc.data().Notification
                            setUserToken(firebase.auth().currentUser)
                            setIsLoading(false);
                        } else {
                            console.log("No such document!");
                        }
                    }).catch(function (error) {
                    console.log("Error getting document:", error);
                });

            }


        } else {
            setUserToken(null)
            setIsLoading(false);
            console.log(" else condition auth user")
        }
    })
    /* quand un user sign up avec un compte qui exite deja  */
    function returnNameFromEmail(string) {

        return string.substring(0, string.indexOf('@'))
    }
    function signupHandler(email, pwd) {

        /* storing auth */
        firebase.auth().createUserWithEmailAndPassword(email, pwd)
            .then(() => {
                setSignUp(true);

            })
            .catch(function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + " - " + errorMessage)
                setSignUp(false);

                // ...
            });
        /* storing cloud firestore user */
    }


    function signinHandler(email, pwd) {

        firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorCode + " - " + errorMessage)
            // ...
        });

    }

        async function registerForPushNotificationsAsync() {
            let token;
            if (Constants.isDevice) {
                const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!');
                    return;
                }
                token = (await Notifications.getExpoPushTokenAsync()).data;
                console.log(token);
            } else {
                alert('Must use physical device for Push Notifications');
            }

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }

            return token;
        }


    if (signUpBool) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#f7287b" />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#f7287b" />
            </View>
        );
    }


    return (


        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {

                    userToken === null ?
                        (
                            <Stack.Navigator
                                initialRouteName="Auth"
                                screenOptions={{ gestureEnabled: false }}

                            >

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
                            </Stack.Navigator>

                        ) : (


                            <Navigationbar />

                        )}



            </NavigationContainer>
        </AuthContext.Provider>
    );
}


