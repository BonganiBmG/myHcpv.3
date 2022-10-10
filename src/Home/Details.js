
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,  } from 'react-native'
import React, { Component, useState, useEffect, } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ServiceList from './ServiceList';
import Loader from '../Loader';
//import Carousel from 'react-native-snap-carousel';




//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';





const Details = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const hcps = ServiceList
  let refCarousel = null

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      console.log(location);
    })();
  }, []);

  let text = 'Loading..';
  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
  }

  const RenderMarker = () => {
    return (

      <View>

        {
          hcps.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={{ latitude: marker.coord['latitude'], longitude: marker.coord['longitude'] }}
                title={marker.name}
                image={marker.avatar}


              />


            )


          })

        }

      </View>


    )
  }

  const renderCard = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 10, height: 1, display: 'flex', flexDirection: 'row' }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 20, width: Dimensions.get('window').width / 2, }}>{item.name}</Text>
          


        </View>



      </View>


    )

  }



  return (
    <View style={styles.container}>

      {hcps != null ?

        <View>

          <MapView style={styles.map}
            initialRegion={{
              latitude: -26.110390,
              longitude: 28.053440,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}

          >
          

            <RenderMarker />


          </MapView>

          <View>
            <Text
              //ref={(c) => { refCarousel = c; }}
              //data={hcps}
              //renderItem={renderCard}
              //sliderWidth={Dimensions.get('window').width}
              //itemWidth={300}
              //containerCustomStyle={styles.Carousel}

            />




          </View>

        </View>

        : <Loader />

      }
    </View>
  );

};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

 //Carousel: {
    //position: 'absolute',
    //bottom: 0,
    //height: Dimensions.get('window').height / 3,
  //}

});

export default Details;