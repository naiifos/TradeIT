import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import RootNavigation from '../routes/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthScreen from '../screens/AuthScreen';
import Trade from '../screens/Trade';
import Create from '../screens/Create';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import TradeInfo from '../screens/TradeInfo';
import ChatBox from '../screens/ChatBox';
import {createSwitchNavigator} from "react-navigation";

//const AuthStack = createSwitchNavigator({Auth:AuthScreen,Trade:Trade });


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

export default function App() {
    return (
        <NavigationContainer  >

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

        </NavigationContainer>
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

