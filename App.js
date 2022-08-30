import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParentSignup from './ParentSignup';
import ParentLogin from './ParentLogin';
import ParentProfile from './ParentProfile';
import BabyProfile from './BabyProfile';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={ParentSignup} />
        <Stack.Screen name="LogIn" component={ParentLogin} />
        <Stack.Screen name="Dashboard" component={ParentProfile} />
        <Stack.Screen name="BabyProfile" component={BabyProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    fontStyle: 'bold',
    margin: 12,
    padding: 15,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'orange',
  }
});
