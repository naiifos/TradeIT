import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,

} from 'react-native';

const Button = props => {
    return (
        <TouchableOpacity onPress={() => {/* do this */ }}>
            <View style={{ ...styles.button}} >
                <Text style={{ ...styles.buttonText}}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    button: {
        backgroundColor: "darkOrange",
        paddingVertival: 12,
        paddingHorizontal: 25,
        borderRadius: 25

    },
    buttonText: {
        color: "white",
        fontSize: 18
    }

});


export default Button;
