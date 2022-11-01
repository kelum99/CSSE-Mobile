import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeNavigator, OrderNavigator} from './ScreenNavigators';
import Cart from '../screens/Order/Cart';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        //headerShown: false,
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: '#0891b2',
          height: 60,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeNavigator}
        options={{
          tabBarIcon: val => (
            <Icons
              //color={val.focused ? '#595959' : '#fff'}
              color={val.focused ? '#fff' : '#E9EDED'}
              name={val.focused ? 'home-variant' : 'home-variant-outline'}
              size={26}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrderNavigator}
        options={{
          tabBarIcon: val => (
            <Icons
              //color={val.focused ? '#595959' : '#fff'}
              color={val.focused ? '#fff' : '#E9EDED'}
              name={val.focused ? 'ballot' : 'ballot-outline'}
              size={28}
            />
          ),
          title: 'Orders',
        }}
      />
      {/* <Tab.Screen
        name="Test1"
        component={HomeNavigator}
        options={{
          tabBarIcon: val => (
            <Icons
              //color={val.focused ? '#595959' : '#fff'}
              color={val.focused ? '#fff' : '#E9EDED'}
              name={val.focused ? 'account' : 'account-outline'}
              size={28}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};
export default TabNavigator;
