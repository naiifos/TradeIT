import React from 'react'
import {StyleSheet, TouchableOpacity, Image, ScrollView, View,Text} from "react-native";

const ChatBox = ({route}) => {


    const { name } = route.params;
    const { date } = route.params;
    const { comment } = route.params;
    return (
        <View>
            <Text>We are in to ChatBox</Text>
            <Text>{ name }</Text>
            <Text>{ date }</Text>
            <Text>{ comment } </Text>
        </View>
    );

}

export default ChatBox;
