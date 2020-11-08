//ctrl+f et chercher bdd. tout les commentaires avec bdd c'est qu'il faut changer
import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {firebaseConfig} from '../config';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    Button,
    TouchableOpacity,
} from 'react-native';
//import data from '../data/ProfileData';
import * as firebase from "firebase";

const {width, height} = Dimensions.get('window');
/*const LOGO_WIDTH = 220; ici c'est pour le logo qui vient en bas à gauche (je l'ai enlever d'ailleur)
const LOGO_HEIGHT = 40;*/
const DOT_SIZE = 40;
const TICKER_HEIGHT = 15;
const CIRCLE_SIZE = width * 0.6;
//const userName = "Moundir";//bdd => mettre le pseudo de firebase
let itemToDelete;
//Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

//


const Circle = ({scrollX, data}) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
            {data.map(({color}, index) => {
                const inputRange = [
                    (index - 0.55) * width,
                    index * width,
                    (index + 0.55) * width,
                ];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 1, 0],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 0.2, 0],
                });
                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.circle,
                            {
                                backgroundColor: color,
                                opacity,
                                transform: [{scale}],
                            },
                        ]}
                    />
                );
            })}
        </View>
    );
};

const Ticker = ({scrollX}) => {

    return (
        <View style={styles.tickerContainer}>
            <Text style={styles.tickerText}>{firebase.auth().currentUser.name}</Text>
        </View>
    )
};

const Item = ({imageUri, heading, description, index, scrollX}) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const inputRangeOpacity = [
        (index - 0.3) * width,
        index * width,
        (index + 0.3) * width,
    ];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
    });
    const translateXHeading = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.1, 0, -width * 0.1],
    });
    const translateXDescription = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.7, 0, -width * 0.7],
    });
    const opacity = scrollX.interpolate({
        inputRange: inputRangeOpacity,
        outputRange: [0, 1, 0],
    });

    return (
        <View style={styles.itemStyle}>
            <Animated.Image
                source={{uri: imageUri}}
                style={[
                    styles.imageStyle,
                    {
                        transform: [{scale}],
                    },
                ]}
            />
            <View style={styles.textContainer}>
                <Animated.Text
                    style={[
                        styles.heading,
                        {
                            opacity,
                            transform: [{translateX: translateXHeading}],
                        },
                    ]}
                >
                    {heading}
                </Animated.Text>
                <Animated.Text
                    style={[
                        styles.description,
                        {
                            opacity,
                            transform: [
                                {
                                    translateX: translateXDescription,
                                },
                            ],
                        },
                    ]}
                >
                    {description}
                </Animated.Text>
            </View>
        </View>
    );
};

const Pagination = ({scrollX, data}) => {
    const inputRange = [-width, 0, width];
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [-DOT_SIZE, 0, DOT_SIZE],
    });
    return (
        <View style={[styles.pagination]}>
            <Animated.View
                style={[
                    styles.paginationIndicator,
                    {
                        position: 'absolute',
                        // backgroundColor: 'red',
                        transform: [{translateX}],
                    },
                ]}
            />
            {data.map((item) => {
                return (
                    <View key={item.key} style={styles.paginationDotContainer}>
                        <View
                            style={[styles.paginationDot, {backgroundColor: item.color}]}
                        />
                    </View>
                );
            })}
        </View>
    );
};
export default function Profile({navigation}) {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [result, setResult] = useState([]);
    const [butState, setButState] = useState(false);
    let count=0;
    useEffect(() => {
                firebase.firestore().collection("Post").where("User", "==", firebase.auth().currentUser.email)
                    .get()
                    .then(function (querySnapshot) {
                        const data=[];
                        console.log("into useeffect");
                        querySnapshot.forEach(function (doc) {
                            if(count===0){
                                itemToDelete=doc.id;
                            }
                            count++;
                            data.push({type:'Human',imageUri:doc.data().Image,heading:doc.data().Title,
                                description:doc.data().Description, key:doc.id,color:'#9dcdfa'});
                        });
                        setResult(data);
                    })
                    .catch(function (error) {
                        console.log("Error getting documents: ", error);
                    });
    }, [butState,navigation]);
    const deletePost= () => {
        setButState(!butState);
        console.log(" item to delete = "+ itemToDelete)
        firebase.firestore().collection("Post").doc(itemToDelete).delete().then(function() {
            //ajouter un code qui va supprimer aussi en local dans results
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
    const onViewRef = React.useRef((viewableItems)=> {

        console.log("---------------------------- New Item ------------------------");
        console.log(viewableItems.viewableItems[0].key);
        itemToDelete=viewableItems.viewableItems[0].key;
        // Use viewable items in state or as intended
    })

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    return (
        <View style={styles.container}>
            <StatusBar style='auto' hidden/>
            <Circle scrollX={scrollX} data={result}/>

                <Animated.FlatList
                    keyExtractor={(item) => item.key}
                    data={result}
                    renderItem={({item, index}) => (
                        <Item {...item} index={index} scrollX={scrollX}/>
                    )}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {useNativeDriver: true}
                    )}
                    scrollEventThrottle={16}
                />
            <Pagination scrollX={scrollX} data={result}/>
            <Ticker scrollX={scrollX} data={result}/>
            <Button style={{  color:"#f7287b"}}title="DELETE" onPress={deletePost}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 45,
    },
    imageStyle: {
        width: width * 0.75,
        height: width * 0.75,
        resizeMode: 'contain',
        flex: 1,
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-end',
        flex: 0.5,
        bottom: 60,
    },
    heading: {
        color: '#444',
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 5,
    },
    description: {
        color: '#ccc',
        fontWeight: '600',
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
        lineHeight: 16 * 1.5,
    },
    /*logo: {
        opacity: 0.9,
        height: LOGO_HEIGHT,
        width: LOGO_WIDTH,
        resizeMode: 'contain',
        position: 'absolute',
        left: 10,
        bottom: 10,
        transform: [
            { translateX: -LOGO_WIDTH / 2 },
            { translateY: -LOGO_HEIGHT / 2 },
            { rotateZ: '-90deg' },
            { translateX: LOGO_WIDTH / 2 },
            { translateY: LOGO_HEIGHT / 2 },
        ],
    },*/
    pagination: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        flexDirection: 'row',
        height: DOT_SIZE,
    },
    paginationDot: {
        width: DOT_SIZE * 0.3,
        height: DOT_SIZE * 0.3,
        borderRadius: DOT_SIZE * 0.15,
    },
    paginationDotContainer: {
        width: DOT_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationIndicator: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    tickerContainer: {
        position: 'absolute',
        top: 10,
        left: 20,
        overflow: 'hidden',
        height: TICKER_HEIGHT,
    },
    tickerText: {
        fontSize: TICKER_HEIGHT,
        lineHeight: TICKER_HEIGHT,
        textTransform: 'uppercase',
        fontWeight: '700',
    },

    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        top: '10%',
    },
});
