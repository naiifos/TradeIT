import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert, ShadowPropTypesIOS } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const [imageName, setImageName] = useState();

    const verifyPermissions = async () => {
        const resultCameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultCamera = await Permissions.askAsync(Permissions.CAMERA);
        if (resultCameraRoll.status !== 'granted' || resultCamera.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });
        setPickedImage(image.uri);
        //    setImageName(getShorterName(JSON.stringify(pickedImage)))
        console.log(" image uri = " + image.uri)
        props.onImageTake(image.uri);
    };
    function getShorterName(imageName) {

        let position = imageName.indexOf("ImagePicker");
        position += 12;
        return imageName.substring(position, imageName.length)

    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Text>No image picked yet.</Text>

                ) : (
                        <Image style={styles.image} source={{ uri: pickedImage }} />
                    )}

            </View>
            <Button
                title="Take Image"
                color="#f7287b"
                onPress={takeImageHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        //  marginBottom:10,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImgPicker;
