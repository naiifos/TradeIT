import React from 'react'
import { View,Text } from 'react-native'

const Test = ({word}) => {
    return (
        <View>
            <Text>
                Hello we are in the test page  {word}
            </Text>
        </View>
    )
}

export default Test
