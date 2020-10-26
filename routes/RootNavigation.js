import { createStackNavigator } from '@react-navigation/stack';
import {createSwitchNavigator} from 'react-navigation';
import AuthScreen from '../user/AuthScreen';
import Trade from '../screens/Trade';

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
});
const TradeNavigator = createStackNavigator({
    Trade:Trade
});

const MainNavigator = createSwitchNavigator({
    Auth:AuthNavigator,
    Trade:TradeNavigator

});

export default RootNavigation(MainNavigator);