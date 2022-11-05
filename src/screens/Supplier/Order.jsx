import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, Box, VStack, HStack, Text, useToast, Alert, Center} from 'native-base';
import axios from 'axios';
import moment from 'moment';

export const HStackText = props => {
  return (
    <HStack my={3} justifyContent={'space-between'}>
      <Text color={'gray.600'} fontSize={16} fontWeight="600">
        {props.title}{' '}
      </Text>
      <Text fontSize={16} fontWeight="bold">
        {props.value}
      </Text>
    </HStack>
  );
};

const SupplierOrder = ({route}) => {
  const {order} = route.params;
   const [data, setData] = useState({});
   const toast = useToast();

  useEffect(() => {
  getOrder();
    console.log('xx', order);
  }, [order]);

    const getOrder = async () => {
      try {
        const res = await axios.get(
          `http://10.0.2.2:4002/api/order/${order._id}`,
        );
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    const updateOrder = async status => {
      try {
        const res = await axios.patch(
          `http://10.0.2.2:4002/api/order/supplier/${order._id}`,
          {
            supplierStatus: status,
            statusUpdateDate: moment(Date.now()).format('YYYY-MM-DD'),
          },
        );
        if (res.status === 200) {
          getOrder();
          if (status === 'Sent') {
            toast.show({
              render: () => {
                return (
                  <Alert justifyContent="center" status="success" variant="solid">
                    <Text color="white" fontWeight="medium">
                      Order Sent!
                    </Text>
                  </Alert>
                );
              },
              duration: 2000,
              placement: 'top',
            });
          } else {
            toast.show({
              render: () => {
                return (
                  <Alert justifyContent="center" status="error" variant="solid">
                    <Text color="white" fontWeight="medium">
                      Order Cancelled!
                    </Text>
                  </Alert>
                );
              },
              duration: 2000,
              placement: 'top',
            });
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    };

  return (
    <SafeAreaView style={Styles.MainContainer}>
      {order && (
        <Box px={8} py={4} mx={4} my={2} style={Styles.card}>
          <VStack>
            <HStackText title="Material" value={order.material} />
            <HStackText title="Quantity" value={order.quantity} />
            <HStackText title="Amount" value={order.budget} />
            <HStackText
              title="Deadline"
              value={moment(order.deliveryDate).format('YYYY-MM-DD')}
            />
            <HStackText title="Status" value={order.material} />
          </VStack>
        </Box>
      )}

      <Box mx={5} my={3}>
        <HStack justifyContent={'space-around'}>
          <Button backgroundColor={'green.500'} onPress={() => updateOrder('Sent')}>Send Order</Button>
          <Button backgroundColor={'red.500'} onPress={() => updateOrder('Cancelled')}>Cancel Order</Button>
        </HStack>
      </Box>
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

export default SupplierOrder;
