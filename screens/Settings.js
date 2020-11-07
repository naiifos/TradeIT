import {
    Text,
    View,
    TextInput,
    ScrollView,
} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import PwdToggleInput from '../data/PwdToggleInput';

export default function Profile() {
    return (
        <ScrollView >
            <PwdToggleInput/>
        </ScrollView>
    );
}
