import React, { useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import Card from "../component/Card";
import { useNavigation } from "@react-navigation/native";
import Navigationbar from "../component/Navigationbar";

export default function Trade() {
    const iconTrade = {
        icon: require('../assets/voiture_doccasion.jpg')
    }


    const [tradesAdverts, setTrades] = useState([
        /* Pull the data from DB, get all the trades adverts and store them in to tradesAdverts hook*/
        { title: 'Ballon', state: 'Use', image: iconTrade.icon, location: 'Rue Claessens 21', name: 'Sofian', description: 'Voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. ', id: '1' },
        {
            title: 'Voiture', state: 'New', image: iconTrade.icon, location: 'Liege-Belgium', name: 'Moundir',
            description: 'Voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. ',
            id: '2'
        },
        { title: 'Chaussure', state: 'New', image: iconTrade.icon, location: 'Brussels-Belgium', name: 'Mohamed', description: 'hollaaaqq', id: '3' },

    ]);
    const navigation = useNavigation()


    const tradePage = (item) => {

        const jsonName = JSON.stringify(item.name)
        const name_ = jsonName.match(/[a-zA-Z]+/g);


        navigation.navigate('TradeInfo', {

            title: item.title,
            name: name_,
            image: item.image,
            state: item.state,
            location: item.location,
            id: item.id,
            description: item.description,
        });

    }
    return (
        <View >
            <FlatList
                data={tradesAdverts}
                renderItem={({ item }) => (
                    <Card
                        title={item.title}
                        state={item.state}
                        name={item.name}
                        image={item.image}
                        location={item.location}
                        onPress={() => tradePage(item)} /* faudra ajouter l'image a un moment*/
                    />
                )}
            />

        </View>
    );
};

/*
 <Card title="Ballon" image={iconTrade.icon} name="Moundir" state="Used" location="Brussels-Belgium" onPress={tradePage} />
 <Card title="Ballon" image={iconTrade.icon} name="Sofian" state="Used" location="Brussels-Belgium" onPress={tradePage} />

*/
