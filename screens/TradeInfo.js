import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Dimensions,
    StatusBar,
    Platform,
    ActivityIndicator,
} from 'react-native';

import HeaderImageScrollView, {
    TriggeringView,
} from 'react-native-image-header-scroll-view';
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as firebase from "firebase";
import 'firebase/firestore';
import {auth, firestore} from "firebase";
import Geocoder from 'react-native-geocoding';

// Initialize the module (needs to be done only once)
const { width, height } = Dimensions.get('window')

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

export default function TradeInfo({ route }) {
    console.log("-------------------Trade Info----------------------------")
    const navigation = useNavigation();
    const navTitleView = useRef(null);
    const currentUser = firebase.auth().currentUser.name;
    const { name } = route.params;
    const { title } = route.params;
    const { description } = route.params;
    const { state } = route.params;
    const { image } = route.params;
    const { date } = route.params;
    const { user } = route.params;
    const [latitude, setLatitude] = useState("null")
    const [longitude, setLongitude] = useState("null")
    const [adress, setAdress] = useState("")
    const [loading, setLoading] = useState(false);
    const currentuser = firebase.auth().currentUser.name;
    const [contactCheck, setContactCheck] = useState(false)
    console.log(" current user = " +currentUser)
    /*
    *la methode permet de verifier si le user a deja creer un chat avec une personne ou pas
     */
    function navigationRedirect(data) {
        console.log(" data to be passed from Trade Info = "+ data)
        navigation.navigate('Messages', {
        });
    }
    function goRedirection() {


        firebase.firestore()
            .collection('MESSAGE_THREADS')
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot((docSnapshot) => {
                   // const dataSource = [];
                const dataSource = docSnapshot.docs.map(documentSnapshot => {
                    return {
                        id: documentSnapshot.id,
                        name: documentSnapshot.data().name,
                        otherUser: documentSnapshot.data().otherUser
                    }
                })
                        const finalData = [];
                         dataSource.forEach(getArrayValues);

                        function getArrayValues(item) {

                            if ((item.name === currentuser && item.otherUser === name)|| (item.name === name && item.otherUser === currentuser))
                            {
                                item.name = (item.name === currentuser) ? item.otherUser : item.name;
                                finalData.push(item);

                            }
                        }

                        if (finalData.length === 0) {
                       //     console.log(" aucun chat crée avec " + name + " et " + currentUser)
                           // alert(name+ " added to your contacts, go on contacts menu and say hi");
                            firestore()
                                .collection('MESSAGE_THREADS')
                                .add({
                                    name: name,
                                    otherUser: currentUser,
                                    latestMessage: {
                                        text: `Say hi to ${name}`,
                                        createdAt: new Date().getTime()
                                    }
                                })
                                .then(docRef => {
                                //    console.log(" value of finalData table = " + docRef.id);
                                    docRef.collection('MESSAGES')
                                        .add({
                                            text: `Chat with ${name} created. Welcome!`,
                                            createdAt: new Date().getTime(),
                                            system: true
                                        })
                                        .then(() => {
                                            console.log("  ")
                                            navigationRedirect();

                                        })
                                })



                        } else {
                         //   alert(name+ " is already in your contacts");

                            //  console.log(" un chat est deja existant avec " + name + " et " +currentUser +" id du chat = " +finalData[0].id)
                          //  console.log(" value of finalData " + finalData);

                            navigationRedirect();
                            setContactCheck(true);

                        }

            })
    }


    useEffect(() => {

        const results = firebase.firestore()
            .collection('User')
            .doc(user)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    parseInt(doc.data().Latitude)
                    parseInt(doc.data().Longitude)
                    const latitude =doc.data().Latitude
                    const longitude =doc.data().Longitude
                 //   const HERE_API_KEY= "bQAQCC_Dyl4b1GQuXzCnYcDDU3OoDGDX5ojO9qcJDM8"
                    const HERE_API_KEY= "Z8x2Ta9e6VDhtux4YyJtzXfjnhpsAx2yn7luU7X3zaY"

                    getAddressFromCoordinates(latitude,longitude)
                        .then((resJson) => {
                            console.log("TRADE INFO ADRESS  getAddressFromCoordinates = "+resJson)
                            setAdress(resJson);
                        })
                    function getAddressFromCoordinates( latitude, longitude ) {

                        return new Promise((resolve) => {
                            const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${HERE_API_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude}`
                            fetch(url)
                                .then(res => res.json())
                                .then((resJson) => {
                                    // the response had a deeply nested structure :/
                                    if (resJson
                                        && resJson.Response
                                        && resJson.Response.View
                                        && resJson.Response.View[0]
                                        && resJson.Response.View[0].Result
                                        && resJson.Response.View[0].Result[0]) {
                                        resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
                                    } else {
                                        resolve()
                                    }
                                })
                                .catch((e) => {
                                    console.log('Error in getAddressFromCoordinates', e)
                                    resolve()
                                })
                        })
                    }


                    setLatitude(doc.data().Latitude);
                    setLongitude(doc.data().Longitude);

                }else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        return () => results
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#f7287b" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <HeaderImageScrollView
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.6}

                minOverlayOpacity={0.3}
                renderHeader={() => (
                    <Image source={{ uri: image, }} style={styles.image} />
                )}
                renderForeground={() => (
                    <View style={styles.titleContainer}>
                        <Text style={styles.imageTitle}>{title}</Text>
                    </View>
                )}
                renderFixedForeground={() => (
                    <Animatable.View style={styles.navTitleView} ref={navTitleView}>
                        <Text style={styles.navTitle}/>
                    </Animatable.View>
                )}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>

                </View>
                <TriggeringView
                    style={styles.section}
                    onHide={() => navTitleView.current.fadeInUp(200)}
                    onDisplay={() => navTitleView.current.fadeOut(100)}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={styles.title}>{name}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <FontAwesome name="star" size={16} color="#FF6347" />

                            <Text style={{ marginHorizontal: 2 }}>State:</Text>
                            <Text>{state}</Text>


                        </View>


                    </View>
                    <Text>{date}</Text>



                </TriggeringView>
                <View style={[styles.section]}>
                    <Text style={styles.sectionContent}>{description}</Text>
                </View>
                <View style={[styles.section, { height: 250 }]}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}

                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.008,
                        }}>
                        <MapView.Marker
                            coordinate={{
                                latitude:latitude,
                                longitude:longitude}}
                                title={name+" location"}
                                description={adress}
                        />
                      
                    </MapView>


                </View>
                <View>
                    {

                        user !== firebase.auth().currentUser.email ?
                            (
                                <Button
                                    title={`Trade with ${name}`}
                                    icolor="#f7287b"
                                    fontSize="12"
                                    onPress={() => goRedirection()}
                                />

                            ) : (

                                <View>

                                </View>

                            )}


                </View>


            </HeaderImageScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    state: {
        fontWeight: "bold",

    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    adress: {
        fontSize: 15,
        marginTop: 10,
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    categoryContainer: {
        flexDirection: 'row',
        backgroundColor: '#FF6347',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        paddingHorizontal: 15,
    },
    category: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        marginTop: 300,
        fontSize: 24,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 40 : 5,
        opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        minHeight: 300,
    },
});
