import {Box, Button, FormControl, Input, Select} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment/moment';

const CreateOrderScreen = () => {
  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
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
  return (
    <SafeAreaView style={Styles.MainContainer}>
      <Box mx={5} my={3} flex={1}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Material
            </FormControl.Label>
            <Select
              fontSize={14}
              variant="rounded"
              minWidth="200"
              accessibilityLabel="Choose Material"
              placeholder="Choose Material">
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>
          </FormControl>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Quantity
            </FormControl.Label>
            <Input
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
            <Box py={5} px={3} style={Styles.supplyWarningCard} m={5}>
              Select material to continue
            </Box>
            <View style={Styles.supplyCardContainer}>
              <Box py={5} px={3} style={Styles.supplyCard} m={5}>
                Saman Construction
              </Box>
              <Box py={5} px={3} style={Styles.supplyCard} m={5}>
                Saman Construction
              </Box>
              <Box py={5} px={3} style={Styles.supplyCard} m={5}>
                Saman Construction
              </Box>
            </View>
          </FormControl>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Delivery Date
            </FormControl.Label>
            <Text onPress={showDatepicker}>
              {moment(date).format('YYYY-MM-DD')}
            </Text>
          </FormControl>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Delivery Site
            </FormControl.Label>
            <Select
              fontSize={14}
              variant="rounded"
              minWidth="200"
              accessibilityLabel="Select Delivery Site"
              placeholder="Select Delivery Site">
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>
          </FormControl>
          <FormControl my={2}>
            <FormControl.Label _text={{fontWeight: 'bold', fontSize: 16}}>
              Amount
            </FormControl.Label>
            <Input
              fontSize={14}
              variant={'rounded'}
              placeholder="Enter Quantity"
              keyboardType="numeric"
            />
          </FormControl>
          <Box alignItems="center" justifyContent="center" my={2}>
            <Button width="80%" rounded={'full'} variant={'solid'}>
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
    width: 120,
  },
  supplyCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default CreateOrderScreen;
