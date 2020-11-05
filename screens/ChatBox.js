import React from 'react'
import {View} from 'react-native-animatable'
import {StyleSheet, TouchableOpacity, Image, ScrollView, Text} from "react-native";

const ChatBox = (idDiscution) => {//we will use idDiscution to fetch the image, the name and the blabla
    //of the discution we will render in this component

    const name="Moundir";
    const date="12:20";
    const path = "../assets/voiture_doccasion.jpg";//bdd => change that with the image of the person with whom we are talking
    const chatClicked= () => {
        alert("chat clicked");
    };
    return (
        <TouchableOpacity style={styles.theBox} onPress={chatClicked}>
                <Image style={styles.pp}
                    source={require(path)}
                />
                <View style={styles.textContainer}>
                    <View style={styles.nameDate}>
                        <Text style={styles.name}>name</Text>
                        <Text style={styles.date}>date</Text>
                    </View>
                    <View style={styles.comment}>
                        <Text>Lorem ipsum je connais pas la suite mais je l'avais vu l'autre fois
                            dans un truc il s'appelait on va voir si le text dépasse pas.
                            Lorem ipsum je connais pas la suite mais je l'avais vu l'autre fois
                            dans un truc il s'appelait on va voir si le text dépasse pas.
                        </Text>
                    </View>
                </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    theBox: {
        top:40,
        flexDirection: 'row',
        height:85,
        borderBottomWidth:1,
        borderTopWidth:1,
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
    },
    nameDate:{
        flexDirection:'row',
        marginBottom:10,
        marginRight:8,
    },
    name:{
        flex:1,
    },
    date:{

    },
    comment:{

    },
});
export default ChatBox
