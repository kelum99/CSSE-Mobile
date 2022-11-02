import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet} from 'react-native';
import {Button, Box, VStack, HStack, Text, Center, Heading} from 'native-base';
import axios from 'axios';
import moment from 'moment/moment';

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
  }, []);

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
      <Heading textAlign="center">Saman Constructions</Heading>
      {orders && (
        <>
          {orders
            .filter(
              val =>
                val.status === 'Approved' &&
                val.supplier === 'Saman Constructions',
            )
            .map(order => (
              <Pressable
                key={order._id}
                onPress={() =>
                  navigation.navigate({
                    name: 'SupplierOrder',
                    params: {order},
                  })
                }>
                <Box px={8} py={4} mx={4} my={2} style={Styles.card}>
                  <VStack>
                    <HStackText title="Material" value={order.material} />
                    <HStackText title="Quantity" value={order.quantity} />
                    <HStackText title="Amount" value={order.budget} />
                    <HStackText
                      title="Delivery Date"
                      value={moment(order.deliveryDate).format('YYYY-MM-DD')}
                    />
                    <HStackText title="Location" value={order.deliverySite} />
                  </VStack>
                </Box>
              </Pressable>
            ))}
        </>
      )}
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
