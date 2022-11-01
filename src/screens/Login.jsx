import {Input, Button, useToast, Alert, Text, Box, Center} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

const LoginScreen = ({navigation, route}) => {
  const [formData, setFormData] = useState({userName: '', password: ''});
  const {user} = route.params;
  const toast = useToast();
  const supplier = {
    userName: 'Saman',
    password: 'saman123',
  };
  const siteManager = {
    userName: 'Nimal',
    password: 'nimal123',
  };

  const login = () => {
    if (user === 'supplier') {
      if (
        supplier.userName === formData.userName &&
        supplier.password === formData.password
      ) {
        toast.show({
          render: () => {
            return (
              <Alert justifyContent="center" status="success" variant="solid">
                <Text color="white" fontWeight="medium">
                  Login Success!
                </Text>
              </Alert>
            );
          },
          duration: 2000,
          placement: 'top',
        });
        navigation.reset({index: 0, routes: [{name: 'Supplier'}]});
      } else {
        toast.show({
          render: () => {
            return (
              <Alert justifyContent="center" status="error" variant="solid">
                <Text color="white" fontWeight="medium">
                  Login Faild! Try Again!
                </Text>
              </Alert>
            );
          },
          duration: 2000,
          placement: 'top',
        });
      }
    } else {
      if (
        siteManager.userName === formData.userName &&
        siteManager.password === formData.password
      ) {
        toast.show({
          render: () => {
            return (
              <Alert justifyContent="center" status="success" variant="solid">
                <Text color="white" fontWeight="medium">
                  Login Success!
                </Text>
              </Alert>
            );
          },
          duration: 2000,
          placement: 'top',
        });
        navigation.reset({index: 0, routes: [{name: 'Tab'}]});
      } else {
        toast.show({
          render: () => {
            return (
              <Alert justifyContent="center" status="error" variant="solid">
                <Text color="white" fontWeight="medium">
                  Login Faild! Try Again!
                </Text>
              </Alert>
            );
          },
          duration: 2000,
          placement: 'top',
        });
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
      <Box my={8} px={5}>
        <Input
          fontSize={16}
          my={3}
          variant={'outline'}
          placeholder="Enter Username"
          onChangeText={text => setFormData({...formData, userName: text})}
        />
        <Input
          type="password"
          fontSize={16}
          my={3}
          variant={'outline'}
          placeholder="Enter Password"
          onChangeText={text => setFormData({...formData, password: text})}
        />
        <Center>
          <Button
            fontSize={16}
            fontWeight="bold"
            width="60%"
            my={2}
            onPress={login}>
            Log In
          </Button>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
