import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {Component} from "@firebase/component";

export default function DashboardScreen() {
    return (
        <View>
            <Text>DashboardScreen</Text>
            <StatusBar style="auto"/>
        </View>
    );

}
