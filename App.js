import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import Navigationbar from "./component/Navigationbar";
import { firebaseConfig } from "./config";
import { AuthContext } from './component/Context';
import UserDataManagement from './singleton/UserDataManagement';

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  
  const [userToken, setUserToken] = useState(null);
  const Stack = createStackNavigator();
  const beforeAt= (email) => {
    
  }
  const authContext = React.useMemo(() => ({

    signIn: (email, pwd) => { signinHandler(email, pwd); },
    signOut: () => { if (userToken !== null) { firebase.auth().signOut(); alert(" deconnexion  de " + userToken.email) ;setUserToken(null)} else { alert(" pas de deconnexion") } },
    signUp: (email, pwd) => { signupHandler(email, pwd); },

  }));

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      const indexOfArobas = firebase.auth().currentUser.email.indexOf('@');
      firebase.auth().currentUser.name = firebase.auth().currentUser.email.substring(0,indexOfArobas)   
      setUserToken(firebase.auth().currentUser)
      UserDataManagement.setUserData(userToken)
     
     
   //   alert(" value of data singleton = " + UserDataManagement.getUserData())
    } else {
      setUserToken(null)

    }

  })

  function signupHandler(email, pwd) {




    firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode + " - " + errorMessage)
      // ...
    });




  }


  function signinHandler(email, pwd) {



    firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorCode + " - " + errorMessage)
      // ...
    });
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


