import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import * as firebase from "firebase";
import 'firebase/firestore';
import Card from "../component/Card";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../component/Context';

export default function Trade() {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigation = useNavigation()
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);

    const handleSearch = text => {
        const results = fullData.filter(item =>
            item.Title.toString().toLowerCase().includes(text.toLowerCase())
        );

      
        setData(results);
        setSearchTerm(text);
        console.log("  Full Data Table  "+fullData.length)
        console.log("  Data Table  "+data.length)
  
    };
    const tradePage = (item) => {

        console.log("user email =   "+item.User)
        navigation.navigate('TradeInfo', {

            title: item.Title,
            name: item.Name,
            date: item.CreatedAt,
            image: item.Image,
            state: item.Etat,
            description: item.Description,
            user: item.User,
            id: item.key,
        });

    }
   
    useEffect(() => {

        setLoading(true)
        firebase.firestore()
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
                setFullData(users)
                setLoading(false)

            
            });
    }, [])

   

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#f7287b" />
          </View>
        );
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
                    style={{ backgroundColor: '#ffffff', paddingHorizontal: 20 }}
                />
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Card
                        title={item.Title}
                        state={item.Etat}
                        name={item.Name}
                        date={item.CreatedAt}
                        image={item.Image}
                        onPress={() => tradePage(item)} /* faudra ajouter l'image a un moment*/
                    />
                )}
            />

        </View>
    );
};


