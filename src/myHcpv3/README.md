# Welcome to the myHcp App project! 

This project creates a platform that connects healthcare practitioners to patients through a mobile application built with React Native and Expo. The app provides a more convenient and efficient way for patients to find and access healthcare services across different specialties. This document will guide you through the setup and usage of the myHcp App.
* Node.js (version 16.x or higher)
* npm or yarn package manager
* Expo CLI (`npm install -g expo-cli`)
* Firebase account (for authentication and data storage)
* Google Maps API key (for location and mapping features)
## Technical Stack

The myHcp App is built using the following technologies:

* React Native (v0.72.10): Cross-platform mobile application framework
* Expo (v49.0.15): Development platform for building and deploying React Native applications
* Firebase (v10.7.1): Used for user authentication, data storage, and real-time database management
* React Navigation (v6.1.9): For navigation between different screens in the application

### Additional Technical Dependencies

* **React Native Maps (v1.7.1)**: Provides map integration for displaying healthcare practitioners' locations, enabling users to find nearby services
* **React Native Paper (v5.13.5)**: Material Design components for React Native, used for UI elements like buttons, cards, and modals
* **Expo Location (v16.1.0)**: Provides access to device location and geofencing functionality
* **React Native Reanimated Carousel (v3.5.1)**: Used for creating smooth, interactive carousel components
* **React Native Web**: Enables the app to run on web browsers with the same codebase

## Project Structure

The myHcp App project is structured as follows:

```
myHcpv3/
├── assets/               # Images, fonts, and other static resources
├── src/                  # Main source code
│   ├── Home/             # Components related to the Home dashboard
│   │   ├── bookingDashboard.js  # Booking dashboard interface
│   │   ├── bookingTime.js       # Time selection for bookings
│   │   ├── Data.js              # Data utilities and mock data
│   │   ├── Details.js           # Service details screen
│   │   ├── Home.js              # Main home screen
│   │   ├── myHealth.js          # User health profiles
│   │   ├── ServiceList.js       # List of available healthcare services
│   │   ├── settings.js          # User settings screen
│   │   ├── SignUp.js            # User registration screen
│   │   └── wellness.js          # Wellness tracking features
│   ├── firebaseConfig.js  # Firebase configuration and initialization
│   ├── Loader.js          # Loading screen component
│   ├── Login.js           # User authentication screen
│   └── popi.js            # Protection of Personal Information component
├── navigation/          # Navigation configuration and screens
├── App.js               # Main application component
├── .env                 # Environment variables (not committed to version control)
└── .env.example         # Example environment variables template
```

## Navigation Flow

The myHcp App uses React Navigation (specifically Native Stack Navigator) to manage navigation between screens. The main navigation flow is defined in `App.js`:

```javascript
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} options={{title:"Services "}} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="SignUp" component={SignUp} options={{title:"Sign Up"}} />
  </Stack.Navigator>
</NavigationContainer>
```

### Navigation Flow Diagram:

```
Login Screen
    │
    ├── Sign Up Screen (for new users)
    │
    └── Home Screen (Services Dashboard)
            │
            └── Service Details Screen
```

Users begin at the Login screen, where they can either log in with existing credentials or navigate to the Sign Up screen. After successful authentication, users are directed to the Home screen (Services Dashboard), where they can browse healthcare services. Selecting a service navigates to the Details screen with information about that specific service.

## Features and Components

### Authentication (Login.js, SignUp.js)
- **Login Screen**: Provides email and password fields for user authentication using Firebase Auth
- **Sign Up Screen**: Collects user information to create new accounts in the system

### Services Dashboard (Home.js, ServiceList.js)
The main dashboard displays a list of healthcare practitioner categories:
- Nurses
- Dentists
- General Practitioners (GPs)
- Specialists (including Audiologists, Dieticians, Psychiatrists)
- Social Workers

Each category shows:
- Number of available practitioners
- Relevant icon for easy identification
- Brief description of services offered

### Service Details (Details.js)
When users select a service category from the dashboard, they are taken to the Details screen which provides:
- Comprehensive information about the service
- List of available practitioners
- Filtering options (by location, availability, etc.)
- Integration with maps to show provider locations

### Booking System (bookingDashboard.js, bookingTime.js)
- **Booking Dashboard**: Displays available appointment slots and practitioners
- **Booking Time Selection**: Interface for selecting appointment dates and times

### User Health Management (myHealth.js, wellness.js)
- **My Health**: Personal health profile and history
- **Wellness Tracking**: Tools for monitoring health metrics and wellness goals

### Settings and Configuration (settings.js)
User preferences, notification settings, and app configuration options

### Location Services
The app uses Expo Location and React Native Maps to provide location-based features:
- Finding nearby healthcare providers
- Showing directions to healthcare facilities
- Geofencing for appointment reminders

## Environment Setup

### Prerequisites
* Node.js (version 16.x or higher)
* npm or yarn package manager
* Expo CLI (`npm install -g expo-cli`)
* Firebase account (for authentication and data storage)
* Google Maps API key (for location and mapping features)

### Installation

1. Clone the myHcp App repository from GitHub:
   ```
   git clone https://github.com/your-username/myHcpv3.git
   cd myHcpv3
   ```

2. Install the required packages:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root (based on `.env.example`)
   - Add the following configurations:
   ```
   # Firebase Configuration
   FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
   FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
   FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
   FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
   FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
   FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

   # Google Maps API Key
   GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

4. Location Permissions:
   - The app requires location permissions to function properly
   - For Android: Update the `android/app/src/main/AndroidManifest.xml` with appropriate location permissions
   - For iOS: Update the `ios/[YourProjectName]/Info.plist` with appropriate location usage descriptions

5. Start the development server:
   ```
   npm start
   ```
   This will open the Expo developer tools in your browser. From there, you can run the app on an Android or iOS simulator, or on your physical device using the Expo Go app.

### Running on Different Platforms

- **iOS Simulator**: `npm run ios`
- **Android Emulator**: `npm run android`
- **Web Browser**: `npm run web`
