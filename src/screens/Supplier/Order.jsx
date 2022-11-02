import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, Box, VStack, HStack, Text, Center} from 'native-base';
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
  useEffect(() => {
    console.log('xx', order);
  }, [order]);
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
          <Button backgroundColor={'green.500'}>Send Order</Button>
          <Button backgroundColor={'red.500'}>Cancle Order</Button>
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
