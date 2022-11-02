import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import CreateOrderScreen from '../screens/Order/CreateOderScreen';
import Cart from '../screens/Order/Cart';
import Order from '../screens/Order/Order';
import SupplierOrders from '../screens/Supplier/Orders';
import SupplierOrder from '../screens/Supplier/Order';
const HomeStack = createNativeStackNavigator();
export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitleAlign: 'center'}}
      />
      {/* <HomeStack.Screen
        name="CreateOder"
        component={CreateOrderScreen}
        options={{
          headerTitle: 'Create Order',
          headerShadowVisible: false,
        }}
      />
      <HomeStack.Screen
        name="CartScreen"
        component={Cart}
        options={{
          headerTitle: 'Orders',
          headerShadowVisible: false,
        }}
      />
      <HomeStack.Screen
        name="OrderScreen"
        component={Order}
        options={{
          headerTitle: 'Order',
          headerShadowVisible: false,
        }}
      /> */}
    </HomeStack.Navigator>
  );
};

const OrderStack = createNativeStackNavigator();

export const OrderNavigator = () => {
  return (
    <OrderStack.Navigator initialRouteName="CartScreen">
      <OrderStack.Screen
        name="OrderScreen"
        component={Order}
        options={{
          headerTitle: 'Order',
          headerShadowVisible: false,
        }}
      />
      <OrderStack.Screen
        name="CreateOder"
        component={CreateOrderScreen}
        options={{
          headerTitle: 'Create Order',
          headerShadowVisible: false,
        }}
      />
      <OrderStack.Screen
        name="CartScreen"
        component={Cart}
        options={{
          headerTitle: 'Orders',
          headerShadowVisible: false,
        }}
      />
    </OrderStack.Navigator>
  );
};

const SupplierStack = createNativeStackNavigator();

export const SupplierNavigator = () => {
  return (
    <SupplierStack.Navigator>
      <SupplierStack.Screen
        name="SupplierOrders"
        component={SupplierOrders}
        options={{
          headerTitle: 'Orders',
          headerTitleAlign: 'center',
        }}
      />
      <SupplierStack.Screen
        name="SupplierOrder"
        component={SupplierOrder}
        options={{
          headerTitle: 'Order',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      />
    </SupplierStack.Navigator>
  );
};
