import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native'

import { useNavigation } from "@react-navigation/native";
const LoadingScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const { loadScreen } = React.useContext(AuthContext)

    
    useEffect(() => {
        setTimeout(
            function () {
                console.log(" in to the timer")
                setIsLoading(false)
            }, 5000);
    }, [])

    if (!isLoading) {
        navigation.navigate('Trade');
    }
    return (


        <ActivityIndicator />

    )
}

export default LoadingScreen
