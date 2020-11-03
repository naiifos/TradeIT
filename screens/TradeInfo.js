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
} from 'react-native';

import HeaderImageScrollView, {
    TriggeringView,
} from 'react-native-image-header-scroll-view';
import UserPhotoName from "../component/UserPhotoName";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window')

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;
const iconTrade = {
    icon: require('../assets/voiture_doccasion.jpg')
}
export default function TradeInfo({ route }) {

    const navigation = useNavigation()
    const goRedirection = () => {
        
        navigation.navigate('ChatBox');
    }


    /*Pull request from DB with longitude and latitude of the user who posted and put it in currentPosition Hook*/
    const [currentPosition, setCurrentPosition] = useState({

        latitude: 50.87291567821333,
        longitude: 4.358049109120915,
        latitudeDelta: 0.04,
        longitudeDelta: 0.008
    })


    // alert(" data of current position = " +  currentPosition.latitude + " // " + currentPosition.longitude);
    const navTitleView = useRef(null);

    const { name } = route.params;
    const { title } = route.params;
    const { description } = route.params;
    const { state } = route.params;
    const { location } = route.params;
    const { image } = route.params;
    


    const imageTradeInfo = {
        icon: require('../assets/voiture_doccasion.jpg')
    }
    const iconProfile = {
        icon: require('../assets/profilepicture.jpg')
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
                    <Image source={image} style={styles.image} />
                )}
                renderForeground={() => (
                    <View style={styles.titleContainer}>
                        <Text style={styles.imageTitle}>{title}</Text>
                    </View>
                )} 
                renderFixedForeground={() => (
                    <Animatable.View style={styles.navTitleView} ref={navTitleView}>
                        <Text style={styles.navTitle}></Text>
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
                   
                        <Text style={styles.adress}>{location}</Text>
                      
                   
                    
                </TriggeringView>
                <View style={[styles.section]}>
                    <Text style={styles.sectionContent}>{description}</Text>
                </View>
                <View style={[styles.section, { height: 250 }]}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}

                        region={{
                            latitude: currentPosition.latitude,
                            longitude: currentPosition.longitude,
                            latitudeDelta: currentPosition.latitudeDelta,
                            longitudeDelta: currentPosition.longitudeDelta,
                        }}>
                        <MapView.Marker
                            coordinate={{
                                latitude: currentPosition.latitude,
                                longitude: currentPosition.longitude
                            }}
                            description={location}
                        />
                    </MapView>


                </View>

                <Button
                    title="Trade IT ?"
                    color="#f7287b"
                    fontSize="12"
                    onPress={() => goRedirection()}
                />

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
        marginTop:10,
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