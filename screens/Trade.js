import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import * as firebase from "firebase";
import 'firebase/firestore';
import Card from "../component/Card";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../component/Context';

export default function Trade() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [bool, setBool] = useState(false);
    var boolean = true;


    useEffect(() => {
        
        setLoading(true)
        console.log(" in to bool timer ")
        console.log(" size of data table " + data.length)
        setTimeout(
            function () {

                setLoading(false)
            }, 5000);
        console.log(" after timer ")

    }, [data])
    useEffect(() => {

        console.log(" Trade page ---------- ")
        const subscriber = firebase.firestore()
            .collection('Post')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setData(users);


                //   console.log(" value of data retrieved from db == "+ data)
            });
        subscriber;

    }, [])


    const iconTrade = {
        icon: require('../assets/voiture_doccasion.jpg')
    }

    const [tradesAdverts, setTrades] = useState([
        /* Pull the data from DB, get all the trades adverts and store them in to tradesAdverts hook*/
        { title: 'Ballon', state: 'Use', image: iconTrade.icon, location: 'Rue Claessens, 21', name: 'Sofian', description: 'Voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. ', id: '1' },
        {
            title: 'Bateau', state: 'New', image: iconTrade.icon, location: 'Liege-Belgium', name: 'Moundir',
            description: 'Voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. voiture a troc contre une moto si possible. Veuillez accepter le trade si vous voulez. ',
            id: '2'
        },
        { title: 'Chaussuressss', state: 'New', image: iconTrade.icon, location: 'Brussels-Belgium', name: 'Mohamed', description: 'hollaaaqq', id: '3' },

    ]);

    const tradePage = (item) => {


        navigation.navigate('TradeInfo', {

            title: item.title,
            name: item.name,
            image: item.image,
            state: item.state,
            location: item.location,
            id: item.id,
            description: item.description,
        });

        /* ajouter l'algo pour laisser que 13 caracheteres de la localisation */

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
                console.log("avant d'effectuer la recherche voici la valeur de data " + data)
                setTampon(data); /* il faut que data soit rempli a ce moment du code - ajouter un await un qlq chose du genre */
                setIsEmpty(true)
            } else {
                setTrades(tampon);
            }
        } else {

            setTrades(results);

        }



    }, [searchTerm]);

    if (loading) {
        return <ActivityIndicator />
    }


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
                data={data}
                renderItem={({ item }) => (
                    <Card
                        title={item.Title}
                        state={item.Etat}
                        name={item.Name}
                        image={item.Image}
                        location={item.Location}
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

