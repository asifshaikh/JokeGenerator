import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { firebase } from './Config';
import { StatusBar } from 'react-native';

const Dashboard = () => {
  // const [name,setName] = useState('');

  // useEffect(() =>{
  //   firebase.firestore().collection('users')
  //   .doc(firebase.auth().currentUser.uid).get()
  //   .then((snapshot)=>{
  //     if(snapshot.exists){
  //       setName(snapshot.data())
  //     }
  //     else{
  //       console.log('user does not exists')
  //     }
  //   })
  // },[])

  const [data, setData] = useState(undefined);

  const changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert('password reset email sent');
      })
      .catch((error: { message: any }) => {
        alert(error.message);
      });
  };

  const getAPIData = async () => {
    let url = 'https://v2.jokeapi.dev/joke/Any?type=single';
    let response = await fetch(url);
    let data = await response.json();
    setData(data);
  };
  useEffect(() => {
    getAPIData();
  }, []);

  const userSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert('user signed out');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return data ? (
    <>
      <StatusBar
        barStyle='dark-content'
        hidden={false}
        backgroundColor='#00BCD4'
        translucent={true}
      />
      <View style={styles.container}>
        <Text style={{ color: 'black', fontSize: 20 }}>Joke:{data.joke}</Text>
        <TouchableOpacity style={styles.button} onPress={getAPIData}>
          <Text style={styles.buttonText}>Get a Joke</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => userSignOut()}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              borderColor: 'white',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              margin: 10,
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changePassword()}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              borderColor: 'white',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              margin: 10,
            }}
          >
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </>
  ) : null;
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'beige',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    margin: 10,
    padding: 16,
    backgroundColor: 'green',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 15,
    shadowOpacity: 1,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
