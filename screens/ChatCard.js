import React from 'react'
import {View} from 'react-native-animatable'
import {StyleSheet, TouchableOpacity, Image, ScrollView, Text} from "react-native";
const ChatCard = ({name,date,comment,onPress} ) => {//we will use idDiscution to fetch the image, the name and the blabla
    //of the discution we will render in this component


    const path = "../assets/profilepicture.jpg";//bdd => change that with the image of the person with whom we are talking


    return (
        <TouchableOpacity  onPress={onPress} style={styles.theBox}>
            <Image style={styles.pp}
                   source={require(path)}
            />
            <View style={styles.textContainer}>
                <View style={styles.nameDate}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
                <View style={styles.comment}>
                    <Text>{comment}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    theBox: {
        flexDirection: 'row',
        height:85,
        alignItems:'center',
    },
    pp:{
        width:60,
        height:60,
        borderRadius:100,
        marginLeft: 5,
    },
    textContainer:{
        flexDirection: 'column',
        marginLeft:10,
        flex:1,
        flexWrap:'wrap',
        borderBottomWidth:1,

        borderColor: '#f7287b'
    },
    nameDate:{
        flexDirection:'row',
        marginRight:8,
        marginTop:5,
    },
    name:{
        flex:1,
        fontWeight: '700',
    },
    date:{
        fontWeight: '700',
    },
    comment:{
        flex:1,
        marginTop:10,
        color:'#a9a9a9'
    },
});
export default ChatCard
