import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/Login';
import Home from './src/Home/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './src/Home/Details';
import SignUp from './src/Home/SignUp';
//import { ViewPropTypes } from 'deprecated-react-native-prop-types';




const Stack = createNativeStackNavigator();
export default function App() {
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


