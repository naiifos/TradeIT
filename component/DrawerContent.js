import React from 'react'
import { View, StyleSheet, Dimensions, } from 'react-native';
import MapView from 'react-native-maps';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { AuthContext } from './Context';
import YourLocalisation from '../screens/YourLocalisation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { render } from 'react-dom';
const DrawerContent = (props) => {

    const { signOut } = React.useContext(AuthContext)
    
    return (
        <View {...props} style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <Drawer.Section style={styles.drawerSection} >

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="home-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Trade IT"
                        onPress={() => { props.navigation.navigate('Trade') }}
                    />
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection}>

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="map-marker"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Your Location"
                        onPress={() => { alert(" ur location should be shown")}}
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>

                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    )
}

export default DrawerContent


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 5,
    },
    bottomDrawerSection: {
        marginTop: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});