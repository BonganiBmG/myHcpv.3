
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground } from 'react-native'
import React from 'react'
//import medical3 from '../../assets/medical3.png'


const image = { image: '../../assets/medical3.png' };
const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>

      </ImageBackground>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="small" color="#0000ff" />
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
  )
}

export default Loader

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: 'center'
    
 
  },
  image:{
    flex: 1,
    justifyContent: 'center',
  },
  
})