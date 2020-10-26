
import Navigationbar from './component/Navigationbar';
import Header from './component/Header';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from "expo-status-bar";


  export default function App() {
    return (
        <View style={style.container}>
          <Navigationbar/>
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

