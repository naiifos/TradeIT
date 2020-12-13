import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Button, Platform} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import * as firebase from "firebase";

export default function pwdToggleInput() {
    //current pwd
    const [pwdChange, setPwdChange] = useState(true);
    const [pwdValue, setPwdValue] = useState("");
    const [textVerif, setTextVerif] = useState("");
    const [iconName, setIconName] = useState("eye");
    //new pwd
    const [newPwdChange, setNewPwdChange] = useState(true);
    const [newPwdValue, setNewPwdValue] = useState("");
    const [newIconName, setNewIconName] = useState("eye");
    //
    const [isNotifEnabled, setIsNotifEnabled] = useState(firebase.auth().currentUser.Notification);//notif are enabled (donc on recoit les notifs)

    function toggleNotifSwitch (){

        setIsNotifEnabled(previousState => !previousState);

    }

    //Firebase
    const userEmail =firebase.auth().currentUser ? firebase.auth().currentUser.email : "user pas connue";
    const user=firebase.auth().currentUser;
    //
    const onIconPress = () => {
        setIconName(pwdChange ? "eye-off" : "eye");
        setPwdChange(!pwdChange);

    }
    const onNewIconPress = () => {
        setNewIconName(newPwdChange ? "eye-off" : "eye");
        setNewPwdChange(!newPwdChange);

    }
    const onChangePwd = (pwd) => {
        setPwdValue(pwd);
    }
    const onChangeNewPwd = (pwd) => {
        setNewPwdValue(pwd);
    }
    const changePwd = () => {
        const credential = firebase.auth.EmailAuthProvider.credential(userEmail, pwdValue);
        user.reauthenticateWithCredential(credential)
            .then(function () {
                // User re-authenticated.
            }).catch(function (error) {
                setTextVerif("Wrong password.");
                // An error happened.
        });
        if (newPwdValue === "") {
            setTextVerif("New password cannot be empty!");
        }
        else if(newPwdValue.length<6){
            setTextVerif("Put more than 6 characters!");
        }
        else {
            user.updatePassword(newPwdValue)
                .then(r => {
                    setTextVerif("Password SAVED.");
                    setPwdValue("");
                    setNewPwdValue("");
                })
                .catch(error => {
                    alert("the error: " + error);
                })
            ;
        }
    }

    useEffect(() => {
        firebase.firestore().collection('User').doc(firebase.auth().currentUser.email)
            .set({
                DarkTheme: false,
                Notification: isNotifEnabled,
                Latitude: firebase.auth().currentUser.latitude,
                Longitude: firebase.auth().currentUser.longitude,
                Name: firebase.auth().currentUser.name,
            })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch(error => {
                console.log('Something went wrong with added user to firestore: ', error);
            })
    }, [isNotifEnabled]);
    return (
        <View>
            <View style={styles.pwdView}>
                <View style={styles.textPwdModify}>
                    <Text style={styles.pwdModify}>Modify password</Text>
                    <View><Text>{textVerif}</Text></View>
                </View>
                <View style={styles.global}>
                    <TextInput placeholder={"Current password"} value={pwdValue} secureTextEntry={pwdChange}
                               style={styles.pwdInput} onChangeText={(value) => onChangePwd(value)}/>
                    <TouchableOpacity onPress={onIconPress}>
                        <Icon name={iconName} color={"#81a1ff"} style={styles.eyeIcon} size={30}/>
                    </TouchableOpacity>

                </View>
                <View style={styles.global}>
                    <TextInput placeholder={"New password"} value={newPwdValue} secureTextEntry={newPwdChange}
                               style={styles.pwdInput} onChangeText={(value) => onChangeNewPwd(value)}/>
                    <TouchableOpacity onPress={onNewIconPress}>
                        <Icon name={newIconName} color={"#81a1ff"} style={styles.eyeIcon} size={30}/>
                    </TouchableOpacity>

                </View>
                <View style={styles.savePwdChanges}>
                    <Button
                        title="Save changes"
                        onPress={changePwd}
                    />
                </View>

            </View>
            <View style={styles.notifView}>
                <Text style={styles.pwdModify}>Receive notifications</Text>
                <View style={styles.enableNotif}>
                    <Text style={styles.enableText}>(Notifications are {isNotifEnabled ? "enabled" : "disabled"})</Text>
                    <View>
                        <Switch
                            trackColor={{false: "#767577", true: "#81b0ff"}}
                            thumbColor={isNotifEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleNotifSwitch}
                            value={isNotifEnabled}
                        />
                    </View>

                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    textPwdModify: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pwdView: {
        margin: 10,
    },
    global: {
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    eyeIcon: {
        margin: 5,
        padding: 5,
    },
    pwdInput: {
        flex: 1,
    },
    pwdModify: {
        padding: 10,
        fontSize: 15,
        fontWeight: '700',
    },
    savePwdChanges: {
        marginTop: 10,
    },
    enableNotif: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,

    },
    enableText: {
        flex: 1,
    },
    notifView: {
        borderBottomWidth: 1,
        margin: 10,
    },
})
