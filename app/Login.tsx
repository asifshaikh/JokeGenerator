import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './Config';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let LoginUser = async (email: string, password: string) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert(
        'User logged in Successfully \n' +
          'email : ' +
          email +
          '\npassword :' +
          password
      );
    } catch (error: any) {
      alert(error.message);
    }
  };
  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('password reset email sent');
      })
      .catch((error: { message: any }) => {
        alert(error.message);
      });
  };
  return (
    <>
      <StatusBar
        barStyle='dark-content'
        hidden={false}
        backgroundColor='#00BCD4'
        translucent={true}
      />
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 20 }}>
          Login
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Email'
          placeholderTextColor={'black'}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Password'
          placeholderTextColor={'black'}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        ></TextInput>
        <TouchableOpacity onPress={() => LoginUser(email, password)}>
          <Text
            style={{
              width: 250,
              fontSize: 16,
              fontWeight: 'bold',
              borderColor: 'grey',
              borderWidth: 1,
              padding: 10,
              paddingLeft: 100,
              borderRadius: 10,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 20 }}>
            Dont have account ? Register Now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => forgotPassword()}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 20 }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'beige',
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: 'gray',
  },
});
