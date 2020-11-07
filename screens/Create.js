import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback, ActivityIndicator,
} from 'react-native';
import { Keyboard } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from '../component/ImagePicker';
import Input from '../component/Input';
import * as firebase from "firebase";
import 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from '../component/Context';
const Create = () => {

    const navigation = useNavigation()
    const [userToken, setUserToken] = useState(" ");
    const [selectedImage, setSelectedImage] = useState(null);


    const [form, setForm] = useState({
        title: "",
        location: "",
        description: ""
    })
    const [pickState, setPickState] = useState("New");
    const imageTakenHandle = imagePath => {
        setSelectedImage(imagePath);

    }

    function getShorterName(imageName) {

        let position = imageName.indexOf("ImagePicker");
        position += 12;
        return imageName.substring(position, imageName.length)

    }
    const getTradeData = () => {

        /*Upload image to firebase storage*/

        /*Upload post to cloud firestore */


        var goPush = true;
        if (form.title !== null) {
            if (form.title.length > 4 && form.title.length < 13) {
            } else {

                goPush = false;
                alert("Title must have less than 13 characters and  more than 4")
            }
            if (form.location.length > 5) {
            } else {
                goPush = false;
                alert("Put a location with at least 5 characters ")
            }
            if (selectedImage === null) {
                goPush = false;
                alert(" You must take an image of what you want to trade")
            }

            if (goPush) {
                alert(" Successful data")
                //alert(form.location +"Name user = "+)


                pushData();


            } else {

            }
        }

    }
    const getImage = async (imageName) => {
        let imageRef = firebase.storage().ref('images/' + imageName);
        const url = await imageRef.getDownloadURL();
        setPickedImage(url);

    }
    function pushData() {

        const imageName = getShorterName(JSON.stringify(selectedImage))

        uploadImageFirebaseStorage(selectedImage, imageName).then(() => {
            // alert("success");
            console.log(" SUCCESS UPLOAD IMAGE")

        }).catch(error => {
            //  alert(error.name);
            console.log(error)
        })

    }
    const uploadImageFirebaseStorage = async (uri, imageName) => {

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        try {
            var ref = firebase.storage().ref().child("images/" + imageName);
            await ref.put(blob);
            let imageRef = firebase.storage().ref('images/' + imageName);
            const url = await imageRef.getDownloadURL();
           
            firebase.firestore().collection('Post')
            .add({
                Description: form.description,
                Etat: pickState,
                Image: url,
                Location: form.location,
                Name: userToken.name,
                Title: form.title,
                User: userToken.email,
            })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch(error => {
                console.log('Something went wrong with added user to firestore: ', error);
            })
        } catch (e) {
            console.log(e);
        }

    };
    const Separator = () => (
        <View style={styles.separator} />
    );
    useEffect(() => {

        console.log(" ----------------------New Run--------------------------------------")
        //     console.log(" in to Create page ")
        navigator.geolocation.getCurrentPosition(
            (position) => {

                firebase.auth().currentUser.latitude = position.coords.latitude
                firebase.auth().currentUser.longitude = position.coords.longitude


                firebase.firestore().collection('User').doc(firebase.auth().currentUser.email)
                    .set({
                        DarkTheme: false,
                        Latitude: firebase.auth().currentUser.latitude,
                        Longitude: firebase.auth().currentUser.longitude,
                        Name: firebase.auth().currentUser.name,
                    })
                    //ensure we catch any errors at this stage to advise us if something does go wrong
                    .catch(error => {
                        console.log('Something went wrong with added user to firestore: ', error);
                    })

                // alert(latitude + " // " + longitude);
                // Add request to DB  HERE - Push the latitude and longitude of the users position
                setUserToken(firebase.auth().currentUser)
            },
            (error) => console.log(JSON.stringify(error)),
            { enableHighAccuracy: Platform.OS != 'android', maximumAge: 2000 }
        );


    }, [userToken]);
    firebase.auth().currentUser.longitude = userToken.longitude;
    firebase.auth().currentUser.latitude = userToken.latitude;

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={styles.container}>
                <Input text={"Title of trade"} placeholder={"Introduce the trade name "} value={form.title} onChange={(text) => setForm({ ...form, title: text })} />
                <Input text={"Location"} placeholder={"Introduce the location "} value={form.location} onChange={(text) => setForm({ ...form, location: text })} />
                <Input text={"Description"} placeholder={"Introduce the description "} value={form.description} onChange={(text) => setForm({ ...form, description: text })} />
                <Separator />
                <DropDownPicker style={styles.dropDownList}
                    items={[
                        { label: 'New', value: 'item1' },
                        { label: 'Like New', value: 'item2' },
                        { label: 'Used', value: 'item3' },
                    ]}
                    placeholder="Select a state"
                    defaultValue="item1"
                    containerStyle={{ height: 50 }}
                    onChangeItem={item => setPickState(item.label)}
                />
                <Separator />
                <ImagePicker onImageTake={imageTakenHandle} />
                <Button
                    title="Publish Trade"
                    color="#f7287b"
                    fontSize="12"
                    onPress={() => getTradeData()}
                />
            </View>
        </TouchableWithoutFeedback>

    );
};
export default Create;

const styles = StyleSheet.create({

    container: {
        padding: 20
    },
    title: {

        margin: 5,
        fontSize: 15,
        color: "#f7287b"
    },
    textInput: {
        margin: 5,
        fontSize: 14,
        color: '#05375a',
        borderBottomColor: '#f7287b', // Add this to specify bottom border color
        borderBottomWidth: 2,    // Add this to specify bottom border thickness
        width: "100%",
        left: "-1%"
    },
    textDescription: {
        margin: 5,
        fontSize: 14,
        color: '#05375a',
        borderWidth: 2,
        height: "10%",
        width: "100%",
        left: "-1%",
        borderColor: "#f7287b"

    },


    button: {
        fontSize: 16,
    },
    separator: {
        marginVertical: 9,
        borderBottomColor: '#737373',
    },
    separatorButton: {
        marginVertical: 5,
        borderBottomColor: '#737373',
        //    borderBottomWidth: StyleSheet.hairlineWidth,
    },

});


