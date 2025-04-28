
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import ServiceList from './ServiceList';
import Loader from '../Loader';

// Import Carousel if you're using it (uncomment and install the package if needed)
// import Carousel from 'react-native-reanimated-carousel';

// Conditionally import map components based on platform
let MapView;
let Marker;

// For web, we might need to handle missing functionality
const isWeb = Platform.OS === 'web';

if (isWeb) {
  // Web-specific imports
  try {
    const WebMapModule = require('react-native-web-maps');
    MapView = WebMapModule.default;
    Marker = WebMapModule.Marker || function DummyMarker(props) {
      return <View {...props} style={{ position: 'absolute', width: 20, height: 20, backgroundColor: 'red', borderRadius: 10 }} />;
    };
  } catch (e) {
    // Fallback for web if the module doesn't exist
    console.warn('Map functionality limited on web:', e.message);
    MapView = props => (
      <View {...props} style={[props.style, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Map View not available on web</Text>
      </View>
    );
    Marker = props => null;
  }
} else {
  // Native mobile imports
  const MapsModule = require('react-native-maps');
  MapView = MapsModule.default;
  Marker = MapsModule.Marker;
}


const Details = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapError, setMapError] = useState(false);
  const hcps = ServiceList;
  let refCarousel = null;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Error getting location');
      }
    })();
  }, []);

  const handleMapError = () => {
    setMapError(true);
    console.error('Map failed to load properly');
  };

  // Function to render each marker on the map
  const RenderMarker = () => {
    return (
      <>
        {hcps && hcps.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ 
              latitude: marker.coord?.latitude || -26.110390, 
              longitude: marker.coord?.longitude || 28.053440 
            }}
            title={marker.name}
          >
            {isWeb ? (
              <View style={{ width: 24, height: 24, backgroundColor: 'red', borderRadius: 12 }} />
            ) : null}
          </Marker>
        ))}
      </>
    );
  };

  // Function to render each card in the carousel
  const renderCard = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCategory}>{item.catergory}</Text>
          <Text style={styles.cardReviews}>
            Reviews {item.review} <MaterialIcons name="star-rate" size={16} color="#00b8d4" />
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {hcps ? (
        <View style={styles.contentContainer}>
          {/* Map View with error handling */}
          {mapError ? (
            <View style={[styles.map, styles.errorMap]}>
              <Text>Unable to load map. Please try again later.</Text>
            </View>
          ) : (
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude: -26.110390,
                longitude: 28.053440,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              onError={handleMapError}
            >
              {/* Only render markers if we have a valid MapView */}
              {!mapError && <RenderMarker />}
            </MapView>
          )}

          {/* Carousel Section - Currently Disabled */}
          {/* Uncomment and install required packages to enable carousel */}
          {/* 
          <View style={styles.carouselContainer}>
            <Carousel
              ref={(c) => { refCarousel = c; }}
              data={hcps}
              renderItem={renderCard}
              width={Dimensions.get('window').width}
              height={200}
              loop
              mode="parallax"
              style={styles.carousel}
            />
          </View>
          */}
        </View>
      ) : (
        <Loader />
      )}
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
  contentContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Platform.OS === 'web' ? 500 : Dimensions.get('window').height,
  },
  errorMap: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  carouselContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  carousel: {
    width: '100%',
    height: 200,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 10,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    margin: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardCategory: {
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 5,
  },
  cardReviews: {
    fontSize: 16,
    color: '#00b8d4',
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default Details;