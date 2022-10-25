import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
const MainStack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Tab">
      <MainStack.Screen
        name="Tab"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
