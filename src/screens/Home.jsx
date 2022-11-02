import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Button, Center} from 'native-base';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
      <Center my={10}>
        <Button
          my={5}
          onPress={() =>
            navigation.navigate('OrdersTab', {screen: 'CreateOder'})
          }>
          Create Order
        </Button>
        <Button
          variant={'outline'}
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'Main'}]})
          }>
          Log Out
        </Button>
      </Center>
    </SafeAreaView>
  );
};

export default HomeScreen;
