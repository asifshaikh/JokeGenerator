import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar
        barStyle='dark-content'
        hidden={false}
        backgroundColor='#00BCD4'
        translucent={true}
      />
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
