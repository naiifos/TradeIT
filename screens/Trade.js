

import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Image, FlatList, StyleSheet } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import Card from "../component/Card";
import { useNavigation } from "@react-navigation/native";
import Navigationbar from "../component/Navigationbar";
import filter from 'lodash.filter';

export default function Trade() {
    const iconTrade = {
        icon: require('../assets/voiture_doccasion.jpg')
    }
    const [tradesAdverts, setTrades] = useState([
        /* Pull the data from DB, get all the trades adverts and store them in to tradesAdverts hook*/
        { title: 'Ballon', state: 'Use', image: iconTrade.icon, location: 'Rue Claessens 21', name: 'Sofian', description: 'Voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. ', id: '1' },
        {
            title: 'Bateau', state: 'New', image: iconTrade.icon, location: 'Liege-Belgium', name: 'Moundir',
            description: 'Voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. ',
            id: '2'
        },
        { title: 'Chaussure', state: 'New', image: iconTrade.icon, location: 'Brussels-Belgium', name: 'Mohamed', description: 'hollaaaqq', id: '3' },

    ]);

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

    const handleSearch = text => {
        setSearchTerm(text);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [tampon, setTampon] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const navigation = useNavigation()


    useEffect(() => {
        let results = tampon.filter(item =>
            item.title.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (searchTerm.toString().length === 0) {
            if (!isEmpty) {
                setTampon(tradesAdverts);
                setIsEmpty(true)
            } else {
                setTrades(tampon);
            }
        } else {

            setTrades(results);

        }



    }, [searchTerm]);



    return (
        <View >
            <View
                style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 20
                }}
            >
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    value={searchTerm}
                    onChangeText={text => handleSearch(text)}
                    placeholder="Search"
                    style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
                />
            </View>
            <FlatList
                data={tradesAdverts}
                keyExtractor={item => item.id}
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: '#101010',
        marginTop: 60,
        fontWeight: '700'
    },
    listItem: {
        marginTop: 10,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%'
    },
    listItemText: {
        fontSize: 18
    }
});

