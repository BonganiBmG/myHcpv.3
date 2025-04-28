# Welcome to the myHcp App project! 

This project creates a platform that connects healthcare practitioners to patients through a mobile application built with React Native and Expo. The app provides a more convenient and efficient way for patients to find and access healthcare services across different specialties. This document will guide you through the setup and usage of the myHcp App.

## Setup

### Prerequisites

To run the myHcp App, you will need the following software installed on your machine:

* Node.js (version 14.x or higher)
* npm or yarn package manager
* Expo CLI (`npm install -g expo-cli`)
* Firebase account (for authentication and data storage)

## Technical Stack

The myHcp App is built using the following technologies:

* React Native: Cross-platform mobile application framework
* Expo: Development platform for building and deploying React Native applications
* Firebase: Used for user authentication, data storage, and real-time database management
* React Navigation: For navigation between different screens in the application
* Google Maps (planned): For displaying healthcare practitioner locations

## Installation

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
   - Create a `.env` file in the project root (or modify the existing one)
   - Add the following configurations:
   ```
   # Google Maps API Key (if implementing map features)
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE

   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
   REACT_APP_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
   REACT_APP_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
   REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID

   # App Configuration
   REACT_APP_NAME=myHcp
   REACT_APP_ENVIRONMENT=development
   ```

4. Start the development server:
   ```
   npm start
   ```
   This will open the Expo developer tools in your browser. From there, you can run the app on an Android or iOS simulator, or on your physical device using the Expo Go app.

## Application Features

### Authentication
The app provides user authentication functionality:
- **Login**: Existing users can sign in with their email and password
- **Sign Up**: New users can create an account

### Services Dashboard
After logging in, users are taken to the Services Dashboard which displays a list of healthcare practitioner categories:
- Nurses
- Dentists
- General Practitioners (GPs)
- Specialists (including Audiologists, Dieticians, Psychiatrists)
- Social Workers

Each category shows the number of available practitioners and includes a relevant icon.

### Service Details
Users can tap on any service category to view more details and potentially book appointments in future implementations.

## Project Structure

The myHcp App project is structured as follows:

- `/src`: Contains the main source code
  - `/Home`: Components related to the main dashboard and service listings
  - `Login.js`: Authentication screen component
  - `firebaseConfig.js`: Firebase configuration and initialization
- `/assets`: Contains images and other static resources
- `/navigation`: Navigation configuration

## Development

To contribute to the development of the myHcp App:

1. Create a Firebase project and configure it with your app
2. Update the Firebase configuration in both `.env` and `src/firebaseConfig.js` (if needed)
3. Make your changes to the codebase
4. Test your changes using `npm start`

## Conclusion

The myHcp App project aims to provide a convenient and efficient way for patients to access healthcare services. With this app, users can browse different types of healthcare practitioners and view their details. Future enhancements will include appointment scheduling, practitioner location mapping, and more interactive features.
