import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import {SupplierNavigator} from './ScreenNavigators';
import MainScreen from '../screens/Main';
import LoginScreen from '../screens/Login';
const MainStack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Main">
      <MainStack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <MainStack.Screen
        name="Tab"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Supplier"
        component={SupplierNavigator}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
