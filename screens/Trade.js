import React, { Component } from 'react';
import {  Text,View, Image } from 'react-native'
import {StatusBar} from "expo-status-bar";
import {Button} from "react-native";
import Card from "../component/Card";
export default function Trade({navigation}) {


    const slides = {
        icon: require('../assets/favicon.png')
      }
    return (
        <View>
            
            <Card title="Ballon" image={slides.icon} state="Used" location="Brussels-Belgium" />
       
        </View>
    );
};
