
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native'
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const SignUp = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

            <Text style={{fontWeight: '100', fontSize: 34, marginBottom: 10}}>Welcome Back !</Text>
            <Text style={{marginBottom: 10, fontSize: 18}}>Sign in to continue</Text>

          <View style={styles.form}>

              <TextInput
                  style={styles.input}
                  placeholder="Name"
                  keyboardType="alphanumeric"

              />
              <TextInput
                  style={styles.input}
                  placeholder="Surname"
                  keyboardType="alphanumeric"
              />
              <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="alphanumeric"
              />
              <TextInput
                  style={styles.input}
                  placeholder="Password"
                  keyboardType="alphanumeric"
              />
              <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  keyboardType="alphanumeric"
              />
              <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  keyboardType="alphanumeric"
              />

          </View>
            
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> navigation.navigate('Home')}
                >
                <Text style={{color:'white'}}>Submit</Text>
                </TouchableOpacity>
                <Text onPress={()=> navigation.navigate('Login')} style={{marginBottom: 10, fontSize: 12}}>Existing user? Sign In here</Text>
        </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#55affa',
    },
    input:{
        
            height: 45,
            margin: 12,
            borderBottomWidth: 2,
            padding: 10,
          
    },
    button: {
        alignItems: "center",
        backgroundColor: "#1c87e5",
        padding: 30,
        margin: 30,
        borderRadius: 30,
      
        
      },
    form:{
        margin: 30,
        paddingTop: windowHeight/25

    }
})

export default SignUp;