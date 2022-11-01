import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet} from 'react-native';
import {Button, Box, VStack, HStack, Text, Center} from 'native-base';
import axios from 'axios';

export const HStackText = props => {
  return (
    <HStack justifyContent={'space-between'}>
      <Text color={'gray.600'} fontSize={16} fontWeight="600">
        {props.title}{' '}
      </Text>
      <Text fontSize={16} fontWeight="bold">
        {props.value}
      </Text>
    </HStack>
  );
};

const SupplierOrders = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await axios.get('http://localhost:4002/api/order/', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log(res);
      if (res.status === 200) {
        console.log('order', res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={Styles.MainContainer}>
      <Box alignItems={'flex-end'} my={3} mx={3}>
        <Button
          onPress={() => navigation.reset({index: 0, routes: [{name: 'Main'}]})}
          variant="outline"
          style={{
            width: '50%',
          }}>
          Log Out
        </Button>
      </Box>
      <Pressable onPress={() => navigation.navigate('SupplierOrder')}>
        <Box px={8} py={4} mx={4} my={2} style={Styles.card}>
          <VStack>
            <HStackText title="Material" value="Sand" />
            <HStackText title="Quantity" value="20" />
            <HStackText title="Amount" value="25000 LKR" />
            <HStackText title="Deadline" value="2022-11-10" />
            <HStackText title="Status" value="pending" />
          </VStack>
        </Box>
      </Pressable>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 15,
  },
});

export default SupplierOrders;
