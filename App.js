import { createStackNavigator } from '@react-navigation/stack';
import createSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import AuthScreen from './screens/AuthScreen';
import Home from './screens/Home';
import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import { Image, Text, View } from "react-native";
import Navigationbar from "./component/Navigationbar";
import { firebaseConfig } from "./config";
import Trade from "./screens/Trade";
import Test from "./screens/Test";
import { AuthContext } from './component/Context';

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const user = firebase.auth().currentUser;
  const [userToken, setUserToken] = React.useState(true);
  const Stack = createStackNavigator();
  const authContext = React.useMemo(() => ({

    signIn: () => {
      alert(" context works ");
      setUserToken(false);
    },
    signOut: () => { },
    signUp: () => { },

  }));
  global.goSingin = true;
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
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


