import React, {useState} from 'react'
import {Button, View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import ChatCard from "./ChatCard";
import {useNavigation} from "@react-navigation/native";
import ChatBox from "./ChatBox";

export default function Chat(){
    const navigation = useNavigation()
    const [info, setInfo] = useState([
        /* Pull the data from DB, get all the trades adverts and store them in to tradesAdverts hook*/
        {id:'1',name: 'moun', date: '12:20', comment: "hi man"},
        {id:'2',name: 'souf', date: '12/11/2020', comment: "whats'up"},
        {id:'3',name: 'moh', date: '14/10/2020', comment: "bonjour je vous contacte pour la voiture"}
    ]);
    function chatClicked(item){

        navigation.navigate('ChatBox', {


            name: item.name,
            date: item.date,
            comment: item.comment,
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={info}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <ChatCard
                        name={item.name}
                        date={item.date}
                        comment={item.comment}
                        onPress={() =>   chatClicked(item)}
                    />
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginTop:120,
        borderTopWidth:1,
    },

});
/*
<FlatList
    data={info}
    keyExtractor={item => item.id}
    renderItem={({item}) => (
        <ChatCard
            name={item.name}
            date={item.date}
            comment={item.comment}
            onPress={() => chatClicked()}
        />
    )}
/>*/
