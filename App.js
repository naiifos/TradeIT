
import Navigationbar from './component/Navigationbar';
import Header from './component/Header';
import React from 'react';
import {Text, View,StyleSheet} from 'react-native';
import {StatusBar} from "expo-status-bar";
import MySwitch from "./routes/RootNavigation";


  export default function App() {
    return (
        <View style={style.container}>
          <MySwitch/>
        </View>
      )
  }

  const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
});

