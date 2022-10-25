import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import CreateOrderScreen from '../screens/Order/CreateOderScreen';
const HomeStack = createNativeStackNavigator();
export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CreateOder"
        component={CreateOrderScreen}
        options={{
          headerTitle: 'Create Order',
          headerShadowVisible: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const OrderStack = createNativeStackNavigator();

export const OrderNavigator = () => {
  return (
    <OrderStack.Navigator>
      {/* <OrderStack.Screen
        name="CreateOder"
        component={CreateOrderScreen}
        options={{
          headerTitle: 'Create Order',
          headerShadowVisible: false,
        }}
      /> */}
    </OrderStack.Navigator>
  );
};
