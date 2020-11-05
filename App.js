import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import Navigationbar from "./component/Navigationbar";
import { firebaseConfig } from "./config";
import { AuthContext } from './component/Context';
import UserDataManagement from './singleton/UserDataManagement';
import Test from './screens/Test';
import 'firebase/firestore';
export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {

    console.log("------------------------------------------------------------------------------------------------------------------------")

  }, []);
  const [userToken, setUserToken] = useState(null);


  const [latitude, setLatitude] = useState("initialized");
  const Stack = createStackNavigator();
  const authContext = React.useMemo(() => ({

    signIn: (email, pwd) => { signinHandler(email, pwd); },
    signOut: () => { if (userToken !== null) { firebase.auth().signOut(); alert(" deconnexion  de " + userToken.email); setUserToken(null); console.log(" value of user token when logout " + firebase.auth().currentUser.email) } else { alert(" pas de deconnexion") } },
    signUp: (email, pwd) => { signupHandler(email, pwd); },

  }));


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      console.log(" Traitement ajout db de " +firebase.auth().currentUser.email)
      firebase.auth().currentUser.name = returnNameFromEmail(firebase.auth().currentUser.email);
      firebase.auth().currentUser.longitude = 0;
      firebase.auth().currentUser.latitude = 0;
      
      firebase.firestore().collection('User').doc(firebase.auth().currentUser.email)
        .set({
          DarkTheme: false,
          Latitude: 1,
          Longitude: 0,
          Name: firebase.auth().currentUser.Name,
        })
        //ensure we catch any errors at this stage to advise us if something does go wrong
        .catch(error => {
          console.log('Something went wrong with added user to firestore: ', error);
        })
  
      console.log(" User "+firebase.auth().currentUser.email + " ajouté " )
      firebase.firestore().collection('User').doc(firebase.auth().currentUser.email)
        .get()
        .then(function (doc) {
          if (doc.exists) {

            firebase.auth().currentUser.name = doc.data().Name
            firebase.auth().currentUser.latitude = doc.data().Latitude
            firebase.auth().currentUser.longitude = doc.data().Longitude
            console.log("Document data in async authState :", firebase.auth().currentUser.name + "  " + firebase.auth().currentUser.latitude + "  " + firebase.auth().currentUser.longitude);

            setUserToken(firebase.auth().currentUser)

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        }); console.log("Document data outside async authState :", firebase.auth().currentUser.name + "  " + firebase.auth().currentUser.latitude + "  " + firebase.auth().currentUser.longitude);





    } else {
      console.log(" setting null user token ")
      setUserToken(null)

    }
  })

  function signupHandler(email, pwd) {

    /* storing auth */
    firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + " - " + errorMessage)
      // ...
    });
    /* storing cloud firestore user */



   




  }

  function returnNameFromEmail(string) {

    return string.substring(0, string.indexOf('@'))
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


