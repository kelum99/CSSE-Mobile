import {
  Box,
  Button,
  FormControl,
  Input,
  Select,
  Text,
  useToast,
  Alert,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import axios from 'axios';

const CreateOrderScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [supplier, setSupplier] = useState();
  const [supplierData, setSupplierData] = useState([]);
  const [values, setValues] = useState({
    material: '',
    quantity: 0,
    supplier: '',
    deliveryDate: '',
    orderDate: moment(Date.now()).format('YYYY-MM-DD'),
    budget: 0,
    deliverySite: '',
  });
  const toast = useToast();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setValues({
      ...values,
      deliveryDate: moment(currentDate).format('YYYY-MM-DD'),
    });
  };
  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const showSuppliers = () => {
    if (values.material && values.material !== '') {
      if (values.material === 'Sand') {
        setSupplierData([
          {
            name: 'Saman Constructions',
            material: 'Sand',
            quantity: '150 cubes',
          },
          {name: 'ABC Enterprises', material: 'Sand', quantity: '100 cubes'},
          {
            name: 'SamDam Constructions',
            material: 'Sand',
            quantity: '200 cubes',
          },
        ]);
      } else if (values.material === 'Briks') {
        setSupplierData([
          {
            name: 'Saman Constructions',
            material: 'Briks',
            quantity: '2500',
          },
        ]);
      } else if (values.material === 'Cement') {
        setSupplierData([
          {
            name: 'Saman Constructions',
            material: 'Cement',
            quantity: '1000',
          },
          {
            name: 'SamDam Constructions',
            material: 'Cement',
            quantity: '1000',
          },
        ]);
      } else if (values.material === 'Metals') {
        setSupplierData([]);
      } else {
        setSupplierData([]);
      }
    }
  };

  useEffect(() => {
    showSuppliers();
  }, [values.material]);

  const onSubmit = async () => {
    try {
      // console.log('sada', {
      //   ...values,
      //   supplier: supplier,
      //   status: 'pending',
      //   statusUpdateDate: moment(Date.now()).format('YYYY-MM-DD'),
      // });
      const res = await axios.post('http://10.0.2.2:4002/api/order/', {
        ...values,
        supplier: supplier,
        status: 'Pending',
        statusUpdateDate: moment(Date.now()).format('YYYY-MM-DD'),
      });
      if (res.status === 201) {
        toast.show({
          render: () => {
            return (
              <Alert justifyContent="center" status="success" variant="solid">
                <Text color="white" fontWeight="medium">
                  Order Created!
                </Text>
              </Alert>
            );
          },
          duration: 2000,
          placement: 'top',
        });
        navigation.navigate('OrdersTab', {screen: 'CartScreen'});
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={Styles.MainContainer}>
      <Box mx={5} my={3} flex={1}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Material
            </FormControl.Label>
            <Select
              onValueChange={value => setValues({...values, material: value})}
              fontSize={14}
              variant="rounded"
              minWidth="200"
              accessibilityLabel="Choose Material"
              placeholder="Choose Material">
              <Select.Item label="Sand" value="Sand" />
              <Select.Item label="Cement" value="Cement" />
              <Select.Item label="Briks" value="Briks" />
              <Select.Item label="Metals" value="Metals" />
            </Select>
          </FormControl>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Quantity
            </FormControl.Label>
            <Input
              onChangeText={text =>
                setValues({...values, quantity: parseInt(text)})
              }
              fontSize={14}
              variant={'rounded'}
              placeholder="Enter Quantity"
              keyboardType="numeric"
            />
          </FormControl>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Suppliers
            </FormControl.Label>
            {values.material && values.material !== '' ? (
              <>
                {supplierData.length > 0 ? (
                  supplierData.map(val => (
                    <Pressable
                      key={val.name}
                      onPress={() => setSupplier(val.name)}>
                      <View>
                        <Box
                          py={5}
                          px={3}
                          style={
                            supplier === val.name
                              ? Styles.selectedSupplier
                              : Styles.supplyCard
                          }
                          mx={5}
                          my={3}>
                          <Text fontSize={16} fontWeight="600">
                            {val.name}
                          </Text>
                          <Text>Material : {val.material}</Text>
                          <Text>Quantity : {val.quantity}</Text>
                        </Box>
                      </View>
                    </Pressable>
                  ))
                ) : (
                  <Box py={5} px={3} style={Styles.supplyWarningCard} m={5}>
                    <Text mx={3} fontWeight="600">
                      Not Available Now!
                    </Text>
                  </Box>
                )}
              </>
            ) : (
              <Box py={5} px={3} style={Styles.supplyWarningCard} m={5}>
                <Text mx={3} fontWeight="600">
                  Select material to continue
                </Text>
              </Box>
            )}
          </FormControl>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Delivery Date
            </FormControl.Label>
            <Text fontWeight={'bold'} mx={3} onPress={showDatepicker}>
              {moment(date).format('YYYY-MM-DD')}
            </Text>
          </FormControl>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Delivery Site
            </FormControl.Label>
            <Select
              onValueChange={value =>
                setValues({...values, deliverySite: value})
              }
              fontSize={14}
              variant="rounded"
              minWidth="200"
              accessibilityLabel="Select Delivery Site"
              placeholder="Select Delivery Site">
              <Select.Item label="Kottawa" value="Kottawa" />
              <Select.Item label="Malabe" value="Malabe" />
              <Select.Item label="Gampaha" value="Gampaha" />
              <Select.Item label="Rathnapura" value="Rathnapura" />
            </Select>
          </FormControl>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Amount
            </FormControl.Label>
            <Input
              onChangeText={text =>
                setValues({...values, budget: parseFloat(text)})
              }
              fontSize={14}
              variant={'rounded'}
              placeholder="Enter Quantity"
              keyboardType="numeric"
            />
          </FormControl>
          <Box alignItems="center" justifyContent="center" my={2}>
            <Button
              onPress={onSubmit}
              width="80%"
              rounded={'full'}
              variant={'solid'}>
              Next
            </Button>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  supplyWarningCard: {
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  supplyCard: {
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  supplyCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  selectedSupplier: {
    elevation: 4,
    backgroundColor: '#67e8f9',
    borderRadius: 20,
  },
});

export default CreateOrderScreen;
