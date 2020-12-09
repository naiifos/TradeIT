
import React, {useEffect, useState} from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import {auth, firestore} from "firebase";

const ChatBoxChat = ({ route }) => {
    const { thread } = route.params
    const threadValue = thread.toString();

    const user = auth().currentUser.toJSON()
    const [messages, setMessages] = useState([

    ])

    useEffect(() => {
        console.log(" ChatBoxChat Page");
        const unsubscribeListener = firestore()
            .collection('MESSAGE_THREADS')
            .doc(threadValue)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data()

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    }

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.displayName
                        }
                    }

                    return data
                })

                setMessages(messages)
            })

        return () => unsubscribeListener()
    }, [])
    async function handleSend(messages) {
        const text = messages[0].text
        await firestore()
            .collection('MESSAGE_THREADS')
            .doc(threadValue)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: user.uid,
                    displayName: user.displayName
                }
            })
        await firestore()
            .collection('MESSAGE_THREADS')
            .doc(threadValue)
            .set(
                {
                    latestMessage: {
                        text,
                        createdAt: new Date().getTime()
                    }
                },
                { merge: true }
            )
    }



    const { name } = route.params; /*email*/
    //  const { date } = route.params;
    return (

        <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{
                _id: user.uid
            }}
        />

    );

}

export default ChatBoxChat;

/*
    *Changement de nom du titre de la page cht quand envois d'un message
    *Affichge d'une conversation dans une autre conversation |  A verifier quand ca arrive
  *Redirection vers la page tradeinfo-Chatbox a partir de chat-Chatbox quand on envoie un message | voir quand ca Arrive  || - Ca arrive quand jenvois un msg TradeInfo/ChatBoxTradeInfo puis je vais dans Chat/ChatBoxTradeInfo et je renvois msg
    *Ouvrir un nouveau chat vide avec quelqu'un

    *

/*
   <Text>We are in to ChatBoxTradeInfo</Text>
            <Text>{name}</Text>
            <Text>{date}</Text>
*/