import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { firebase } from './Config';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  let registerUser = async (
    email: any,
    password: any,
    firstName: any,
    lastName: any
  ) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser?.sendEmailVerification({
            handleCodeInApp: true,
            url: 'http://task-1fe59.firebaseapp.com',
          })
          .then(() => {
            alert('Verification Email sent');
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
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
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>
          Sign Up
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Enter First Name'
          placeholderTextColor={'black'}
          onChangeText={(firstName) => setfirstName(firstName)}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Last Name'
          placeholderTextColor={'black'}
          onChangeText={(lastName) => setlastName(lastName)}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Email'
          placeholderTextColor={'black'}
          onChangeText={(email) => setEmail(email)}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Password'
          placeholderTextColor={'black'}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          autoCorrect={false}
        ></TextInput>
        <TouchableOpacity
          onPress={() => registerUser(email, password, firstName, lastName)}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              borderColor: 'white',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 20 }}>
            Already have an account? Login Now
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});
