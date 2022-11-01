import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, Box, VStack, HStack, Text, useToast, Alert} from 'native-base';
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

const Order = ({route}) => {
  const [data, setData] = useState({});
  const {order} = route.params;
  const toast = useToast();
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
  useEffect(() => {
    getOrder();
  });
  const updateOrder = async status => {
    try {
      const res = await axios.patch(
        `http://10.0.2.2:4002/api/order/${order._id}`,
        {
          status: status,
          statusUpdateDate: moment(Date.now()).format('YYYY-MM-DD'),
        },
      );
      if (res.status === 200) {
        getOrder();
        if (status === 'Approved') {
          toast.show({
            render: () => {
              return (
                <Alert justifyContent="center" status="success" variant="solid">
                  <Text color="white" fontWeight="medium">
                    Order Accepted!
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
                    order Declined!
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
      {order && data && (
        <Box px={8} py={4} mx={4} my={2} style={Styles.card}>
          <VStack>
            <HStackText title="Material" value={data.material} />
            <HStackText title="Quantity" value={data.quantity} />
            <HStackText title="Supplier" value={data.supplier} />
            <HStackText title="Amount" value={data.budget + 'LKR'} />
            <HStackText
              title="Deadline"
              value={moment(data.deliveryDate).format('YYYY-MM-DD')}
            />
            <HStackText title="Status" value={data.status} />
          </VStack>
        </Box>
      )}
      {data.status === 'Pending' && (
        <Box mx={5} my={3}>
          <HStack justifyContent={'space-around'}>
            <Button
              backgroundColor={'green.500'}
              onPress={() => updateOrder('Approved')}>
              Accept
            </Button>
            <Button
              backgroundColor={'red.500'}
              onPress={() => updateOrder('Declined')}>
              Decline
            </Button>
          </HStack>
        </Box>
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

export default Order;
