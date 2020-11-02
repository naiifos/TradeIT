import { createStackNavigator } from '@react-navigation/stack';
import createSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import AuthScreen from './screens/AuthScreen';
import Home from './screens/Home';
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import { Image, Text, View } from "react-native";
import Navigationbar from "./component/Navigationbar";
import { firebaseConfig } from "./config";
import Trade from "./screens/Trade";
import Test from "./screens/Test";
import { AuthContext } from './component/Context';
import Auth from "./screens/action/Auth";
import Login from './screens/action/Login'
export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const auth = Auth(); 
  const login = Login();
 // const [userToken, setUserToken] = React.useState(firebase.auth().currentUser);
  const user = FirebaseAuth.getInstance().getCurrentUser();
  const Stack = createStackNavigator();
  const authContext = React.useMemo(() => ({

    signIn: (email,pwd) => { signinHandler(email,pwd);  },
    signOut: () => {},
    signUp: (email,pwd) => { signupHandler(email,pwd);},

  }));
  /* firebase.FirebaseAuth.addAuthStateListener(change);
  const change= () => {
    alert("gg la valeur a changer");
  } */

  async function   signupHandler(email,pwd) {
  
    alert(" Sign Up - Else condition || Value of usertoken  = "+userToken  )

    const response = await auth(email, pwd)
    alert(response.data.token);
    if (response.status !== 200) {

        throw new Error('Something went wrong in the auth screen!');
    }
    else{

      alert(" else condition from sign up || value of token  = " + userToken)
     
       
    }



    
}


async function   signinHandler(email,pwd) {



  const response = await login(email, pwd)
  if (response.status !== 200) {


      throw new Error('Something went wrong in the login screen!');
  }
  else{
    alert(" else condition from sign in || value of token  = " + userToken)
  }

}

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
    {userToken === null? (
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

            <Navigationbar/>

          )}


    
    </NavigationContainer>
    </AuthContext.Provider>
  );
}


