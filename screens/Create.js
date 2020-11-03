import React, { useState, useEffect, Compo } from 'react';
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import { Keyboard } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from '../component/ImagePicker';
import Input from '../component/Input';
import { render } from 'react-dom';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AuthContext } from '../component/Context';

const Create = () => {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let latitude = JSON.stringify(position.coords.latitude)
                let longitude = JSON.stringify(position.coords.longitude)

                // alert(latitude + " // " + longitude);
                // Add request to DB  HERE - Push the latitude and longitude of the users position
            },
            (error) => console.log(JSON.stringify(error)),
            { enableHighAccuracy: Platform.OS != 'android', maximumAge: 2000 }
        );
    });

    const [form, setForm] = useState({
        title: "",
        location: "",
        description: ""
    })
    const {signOut} = React.useContext(AuthContext)
    const [pickState, setPickState] = useState();
    const getTradeData = () => {

       // signOut();
       /*
        if(form.title.length > 13)
        {
            alert( "Title must have less than 13 characters ")
        }else{
            
             alert(form.title + " " + form.location + " " + form.description + "" + pickState);
        }
        */
    }
    const Separator = () => (
        <View style={styles.separator} />
    );

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
                <ImagePicker />
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


