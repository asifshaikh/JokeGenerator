import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import favicon from './favicon.png';

const SplashScreenView = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Registration');
    }, 4000); // 4 seconds
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={favicon}></Image>
    </View>
  );
};
export default SplashScreenView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
});
