
import React, {useState,useEffect} from 'react'
import {Button, View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import ChatCard from "./ChatCard";
import {useNavigation} from "@react-navigation/native";
import ChatBoxTradeInfo from "./ChatBoxTradeInfo";
import {ActivityIndicator} from "react-native-paper";
import {firestore} from "firebase";
import * as firebase from "firebase";
export default function Chat(){
    const navigation = useNavigation()

    function chatClicked(item){

        const name = (item.name === currentuser)?item.otherUser:item.name;
        console.log(" data to be passed from Chat = "+ item._id + " opening chat with " +name)

        navigation.navigate('ChatBoxChat', {
            name: name,
            thread:item._id
        });
    }

    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(true)
    const currentuser = firebase.auth().currentUser.name;
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('MESSAGE_THREADS')
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const threadsResult = querySnapshot.docs.map(documentSnapshot => {

                    return {
                        _id: documentSnapshot.id,
                        name: '',
                        latestMessage: { text: '' },
                        ...documentSnapshot.data()
                    }
                })
                setThreads(threadsResult)
                if (loading) {

                    const finalThreads  =[];
                    threadsResult.forEach(getArrayValues);
                    setThreads(finalThreads)

                    setLoading(false)
                    function getArrayValues(item, index) {

                        if(item.name === currentuser||item.otherUser === currentuser)
                        {
                            item.name=(item.name===currentuser)?item.otherUser:item.name;
                            finalThreads.push(item);
                      //      console.log( index + ":" + item.name + " "+item.otherUser);


                        }

                    }
                }
            })
        return () => unsubscribe()
    }, [])

    if (loading) {
        return <ActivityIndicator size='large' color='#555' />
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={threads}
                keyExtractor={(item) => {
                    return item.id;
                }}

                renderItem={({item}) => (
                    <ChatCard
                        key={item.id}
                        name={item.name}
                        comment={item.latestMessage.text.slice(0, 90)}
                        onPress={() =>   chatClicked(item)}
                    />
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginTop:10,
    },

});

