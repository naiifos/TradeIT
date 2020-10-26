import React, { Component } from 'react';
import { Text, View, Image } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import Card from "../component/Card";
import { useNavigation } from "@react-navigation/native";

export default function Trade() {

    const navigation = useNavigation()
    const slides = {
        icon: require('../assets/favicon.png')
    }
    const tradePage = () => {
        navigation.navigate('TradeInfo')
    }
    return (
        <View >

            <Card title="Ballon" image={slides.icon} state="Used" location="Brussels-Belgium" onPress={tradePage} />
            <Card title="Ojos" image={slides.icon} state="New" location="Brussels-Belgium" onPress={tradePage} />

        </View>
    );
};
