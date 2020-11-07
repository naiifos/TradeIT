import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Trade from '../screens/Trade';
import Create from '../screens/Create';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import TradeInfo from '../screens/TradeInfo';
import ChatBox from '../screens/ChatBox';
import Chat from '../screens/Chat';
import YourLocalisation from '../screens/YourLocalisation';
import { AuthContext } from '../component/Context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import LoadingScreen from '../screens/LoadingScreen';


const size = 20;
const color = "#f7287b";
const CreateStack = createStackNavigator();
function CreateStackScreen() {
    return (
        <CreateStack.Navigator >
            <CreateStack.Screen
                name="Create" component={Create}
                options={{
                    headerStyle: {
                        backgroundColor: '#f7287b',
                    },
                    headerTitleStyle: {
                        position: 'absolute',
                        color: 'white',
                        left: -170,
                        top: -10,
                        fontSize: 25

                    },
                }} />
        </CreateStack.Navigator>
    );
}

const TradeStack = createStackNavigator();
function TradeStackScreen() {
    return (

        <TradeStack.Navigator initialRouteName="Trade">
           
            <TradeStack.Screen name="Trade" component={Trade}
                options={{
                    headerStyle: {
                        backgroundColor: '#f7287b',
                    },

                    headerTitleStyle: {
                        position: 'absolute',
                        color: 'white',
                        left: -170,
                        top: -10,
                        fontSize: 25

                    },
                }} />
            <TradeStack.Screen name="TradeInfo" component={TradeInfo}
                options={{
                    title: 'Trade Info',
                    headerStyle:
                    {
                        backgroundColor: '#f7287b',
                    },

                    headerTitleStyle:
                    {
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 4,
                        fontSize: 20,

                    },
                    headerTintColor: '#fff',
                    headerTitle: false,
                    headerTransparent: true,

                }}
            />
            <TradeStack.Screen name="ChatBox" component={ChatBox}
                options={{
                    title: 'Chat Box',
                    headerStyle:
                    {
                        backgroundColor: '#f7287b',
                    },

                    headerTitleStyle:
                    {
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 4,
                        fontSize: 20,

                    },
                    headerTintColor: '#fff',


                }}
            />

        </TradeStack.Navigator>
    );
}



const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={Profile}
                options={{
                    headerStyle: {
                        backgroundColor: '#f7287b',
                    },
                    headerTitleStyle: {
                        position: 'absolute',
                        color: 'white',
                        left: -170,
                        top: -10,
                        fontSize: 25

                    },
                }} />
        </ProfileStack.Navigator>
    );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {

    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={Settings
            } options={{
                headerStyle: {
                    backgroundColor: '#f7287b',
                },
                headerTitleStyle: {
                    position: 'absolute',
                    color: 'white',
                    left: -170,
                    top: -10,
                    fontSize: 25

                },
            }} />
        </SettingsStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


function AppScreen() {


    return (
        <Tab.Navigator initialRouteName="Create"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}>
            <Tab.Screen name="Create" component={CreateStackScreen}
                options={{

                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="rocket" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen name="Trade" component={TradeStackScreen}
                options={{
                    tabBarLabel: 'Trade',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen name="Profile" component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen name="Settings" component={SettingsStackScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="settings" color={color} size={26} />
                    ),
                }}
            />



        </Tab.Navigator>


    )
}

function logout() {
    signOut();

    useEffect(() => {
        navigation.navigate('Auth')
    });

}

function CustomDrawerContent(props) {

    const { signOut } = React.useContext(AuthContext)
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem icon={() => (
                <Icon
                    name="exit-to-app"
                    color={color}
                    size={size}
                />
            )}
                label="Sign Out"
                onPress={() => { signOut() }} />
        </DrawerContentScrollView>
    );
}

const ChatStackNavigator = createStackNavigator();
function ChatNavigation() {

    return (
        <ChatStackNavigator.Navigator initialRouteName="Chat"  >

            <ChatStackNavigator.Screen name="Chat" component={Chat} />
            <ChatStackNavigator.Screen name="ChatBox" component={ChatBox} />

        </ChatStackNavigator.Navigator>
    );

}
export default function App() {



    return (
        <Drawer.Navigator initialRouteName="Trade" drawerContent={props => <CustomDrawerContent {...props} />} >
            <Drawer.Screen name="Trade IT" component={AppScreen} />
            <Drawer.Screen name="Chat" component={ChatNavigation}
                options={{

                    drawerIcon: (({ focused }) => <Icon
                        name="message"
                        color={color}
                        size={size}
                    />)

                }}
            />
            <Drawer.Screen name="Your Location" component={YourLocalisation}
                options={{

                    drawerIcon: (({ focused }) => <Icon
                        name="map-marker"
                        color={color}
                        size={size}
                    />)

                }} />

        </Drawer.Navigator>
    )

}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: '#f7287b',
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',

        fontSize: 5,
    }
});

