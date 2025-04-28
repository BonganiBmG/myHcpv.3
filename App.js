import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import components
import Login from './src/Login';
import Home from './src/Home/Home';
import Details from './src/Home/Details';
import SignUp from './src/Home/SignUp';

// Import Firebase - already initialized in the config file
import { app, auth, db } from './src/firebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {
  // Firebase is already initialized in the firebaseConfig.js file
  console.log('Firebase app initialized');
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{title:"Services "}} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="SignUp" component={SignUp} options={{title:"Sign Up"}} />
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
});


