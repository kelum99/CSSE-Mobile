import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Button
        title="Create Order"
        onPress={() => navigation.navigate('CreateOder')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
