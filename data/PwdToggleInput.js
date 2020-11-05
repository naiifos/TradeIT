import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Switch} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';

export default function pwdToggleInput() {
    const [pwdChange, setPwdChange] = useState(true);
    const [iconName, setIconName] = useState("eye");
    const [isNotifEnabled, setIsNotifEnabled] = useState(true);//notif are enabled (donc on recoit les notifs)
    const toggleNotifSwitch = () => setIsNotifEnabled(previousState => !previousState);
    const onIconPress = () => {
        setIconName(pwdChange ? "eye-off" : "eye");
        setPwdChange(!pwdChange);

    }
    return (
        <View>
            <View style={styles.pwdView}>
                <Text style={styles.pwdModify}>Modify password</Text>
                <View style={styles.global}>
                    <TextInput secureTextEntry={pwdChange} style={styles.pwdInput}/>
                    <TouchableOpacity onPress={onIconPress}>
                        <Icon name={iconName} style={styles.eyeIcon} size={30}/>
                    </TouchableOpacity>
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
    pwdView:{
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
    enableNotif: {
        flexDirection: 'row',
        alignItems: 'center',
        margin:10,

    },
    enableText:{
      flex:1,
    },
    notifView: {
        borderBottomWidth: 1,
        margin: 10,
    },
})
