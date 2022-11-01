import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Button, Box, VStack, HStack, Text} from 'native-base';
import axios from 'axios';
import moment from 'moment';

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

const Cart = ({navigation}) => {
  const [choose, setChoose] = useState('Pending');
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:4002/api/order/');
      if (res.status === 200) {
        setOrders(res.data);
        console.log('sss', res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [choose]);
  return (
    <SafeAreaView style={Styles.MainContainer}>
      <Box mx={5} my={3}>
        <HStack justifyContent={'space-around'}>
          <Button
            variant={choose === 'Pending' ? 'solid' : 'outline'}
            onPress={() => setChoose('Pending')}>
            Pennding Order
          </Button>
          <Button
            variant={choose === 'History' ? 'solid' : 'outline'}
            onPress={() => setChoose('History')}>
            Order History
          </Button>
        </HStack>
      </Box>
      <ScrollView style={{flex: 1}}>
        {orders && orders.length > 0 && (
          <>
            {orders
              .filter(val =>
                choose === 'Pending'
                  ? val.status === 'Pending'
                  : val.status !== 'Pending',
              )
              .map(order => (
                <Pressable
                  key={order._id}
                  onPress={() =>
                    navigation.navigate('HomeStack', {
                      screen: 'OrderScreen',
                      params: {order},
                    })
                  }>
                  <Box px={8} py={4} mx={4} my={2} style={Styles.card}>
                    <VStack>
                      <HStackText title="Material" value={order.material} />
                      <HStackText title="Quantity" value={order.quantity} />
                      <HStackText title="Supplier" value={order.supplier} />
                      <HStackText title="Amount" value={order.budget} />
                      <HStackText
                        title="Deadline"
                        value={moment(order.deliveryDate).format('YYYY-MM-DD')}
                      />
                      <HStackText title="Status" value={order.status} />
                    </VStack>
                  </Box>
                </Pressable>
              ))}
          </>
        )}
      </ScrollView>
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

export default Cart;
