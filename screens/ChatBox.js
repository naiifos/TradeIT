import React from 'react'
import { View,Text} from "react-native";

const ChatBox = ({route}) => {


    const { name } = route.params; /*email*/
    const { date } = route.params;
    return (
        <View>
            <Text>We are in to ChatBox</Text>
            <Text>{ name }</Text>
            <Text>{ date }</Text>
        </View>
    );

}

export default ChatBox;
