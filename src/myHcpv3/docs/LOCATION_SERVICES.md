# Location Services in myHcp App

This document provides comprehensive documentation on the implementation and usage of location-based features in the myHcp application, including map integration, geolocation services, and permission handling.

## Overview

The myHcp app leverages location-based services to enable users to:

1. Find healthcare practitioners near their current location
2. View practitioner locations on a map
3. Get directions to healthcare facilities
4. Receive proximity-based notifications and reminders

## Technical Implementation

### Core Dependencies

The location features in myHcp rely on the following key packages:

1. **Expo Location**: Provides access to the device's location system
   ```
   expo-location: ~16.1.0
   ```

2. **React Native Maps**: Provides map components for React Native
   ```
   react-native-maps: 1.7.1
   ```

3. **React Native Web Maps**: Provides web compatibility for map components
   ```
   react-native-web-maps: ^0.3.0
   ```

## Location Permission Handling

### Permission Flow

The app follows this process for requesting and handling location permissions:

1. Check current permission status
2. If not granted, request permissions with clear explanation
3. Handle user decision (granted, denied, or limited)
4. Store permission status for future reference

### Implementation

```javascript
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export const useLocationPermission = () => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState(null);

  const requestLocationPermission = async () => {
    try {
      // Check current permission status
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
      
      let finalStatus = existingStatus;
      
      // If permission not granted, request it
      if (existingStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }
      
      // Update state based on permission result
      if (finalStatus !== 'granted') {
        setLocationErrorMsg('Permission to access location was denied');
        return false;
      }
      
      setLocationPermission('granted');
      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationErrorMsg('Error requesting location permission');
      return false;
    }
  };

  useEffect(() => {
    // Check permission on component mount
    requestLocationPermission();
  }, []);

  return {
    locationPermission,
    locationErrorMsg,
    requestLocationPermission
  };
};
```

### Usage in Components

```javascript
import { useLocationPermission } from '../hooks/useLocationPermission';

const MapScreen = () => {
  const { locationPermission, locationErrorMsg, requestLocationPermission } = useLocationPermission();
  
  // Render map only if permission granted
  if (locationPermission !== 'granted') {
    return (
      <View style={styles.container}>
        <Text>We need location permission to show nearby practitioners.</Text>
        <Button title="Grant Permission" onPress={requestLocationPermission} />
        {locationErrorMsg && <Text style={styles.errorText}>{locationErrorMsg}</Text>}
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // ...map props
      />
    </View>
  );
};
```

## Getting User Location

### Current Location

To get the user's current location:

```javascript
import * as Location from 'expo-location';

const getCurrentLocation = async () => {
  try {
    // Get current location with high accuracy
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });
