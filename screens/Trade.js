import React, { Component } from 'react';
import { Text, View, Image } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import Card from "../component/Card";
import { useNavigation } from "@react-navigation/native";

export default function Trade() {

    const navigation = useNavigation()
    const iconTrade = {
        icon: require('../assets/favicon.png')
    }
    const iconProfile = {
        icon: require('../assets/splash.png')
    }
    const tradePage = () => {
        navigation.navigate('TradeInfo')
    }
    return (
        <View >

            <Card title="Ballon" image={iconTrade.icon} nameUser="Sofian" state="Used" location="Brussels-Belgium" onPress={tradePage} />
            <Card title="Ojos" image={iconTrade.icon} nameUser="Moundir" state="New" location="Brussels-Belgium" onPress={tradePage} />

        </View>
    );
};
