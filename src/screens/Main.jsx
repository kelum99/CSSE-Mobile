import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Button} from 'native-base';

const MainScreen = ({navigation}) => {
  return (
    <SafeAreaView style={Style.main}>
      <Button
        my={3}
        onPress={() =>
          navigation.navigate({name: 'Login', params: {user: 'supplier'}})
        }>
        Supplier
      </Button>
      <Button
        onPress={() =>
          navigation.navigate({name: 'Login', params: {user: 'siteManager'}})
        }>
        Site Manager
      </Button>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
