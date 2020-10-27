import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

export default function UserPhotoName({ nameUser }) {

    const iconProfile = {
        icon: require('../assets/profilepicture.jpg')
    }
    return (
        <View style={styles.cardProfile}>
            <Image
                style={{ width: "30%", height: "30%", borderRadius: 10 }}
                source={iconProfile.icon} />
            <Text style={styles.user}>{nameUser}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    cardProfile: {
        flex: 0.3,
    },
    user: {
        position: 'absolute',
        left: '40%',
        top: '5%',
        fontWeight: 'bold'

    },
});