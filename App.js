
import Header from './component/Header';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from "expo-status-bar";
import AuthStack from "./routes/RootNavigation";
import Navigationbar from "./component/Navigationbar";


export default function App() {
    return (
        <View style={style.container}>
            <AuthStack/>
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
