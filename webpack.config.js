const createExpoWebpackConfig = require('@expo/webpack-config');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file
const env = dotenv.config().parsed || {};

// Mock implementations
const normalizeColorsMock = `
// Mock implementation of normalize-colors
module.exports = function normalizeColor(color) {
  if (typeof color === 'string' && color.startsWith('#')) {
    return parseInt(color.substring(1), 16);
  }
  return color;
};
module.exports.default = module.exports;
`;

const assetRegistryMock = `
// Mock implementation of assets-registry
module.exports = {
  registerAsset: (asset) => 1,
  getAssetByID: (id) => ({ uri: "" }),
  getAssetById: (id) => ({ uri: "" }),
  __esModule: true,
  default: {
    registerAsset: (asset) => 1,
    getAssetByID: (id) => ({ uri: "" }),
    getAssetById: (id) => ({ uri: "" }),
  }
};
`;

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfig(env, argv);
  
  // Customize the config for better React Native Web support
  
  // Add aliases for React Native Web
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
    'react-native-maps': 'react-native-web-maps',
    '@react-native': '@react-native-web',
    // Additional specific aliases for missing modules
    '@react-native/normalize-colors': path.resolve(__dirname, 'node_modules/@react-native/normalize-colors'),
    '@react-native/assets-registry': path.resolve(__dirname, 'node_modules/@react-native/assets-registry'),
    '@react-native/assets-registry/registry': path.resolve(__dirname, 'node_modules/@react-native/assets-registry/registry'),
    // Common polyfills
    'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter': 'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
    'react-native/Libraries/vendor/emitter/EventEmitter': 'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
    'react-native/Libraries/Core/Devtools/getDevServer': 'react-native-web/dist/modules/getDevServer',
    'react-native/Libraries/Core/Devtools/parseErrorStack': 'react-native-web/dist/modules/parseErrorStack',
    'react-native/Libraries/Core/Devtools/symbolicateStackTrace': 'react-native-web/dist/modules/symbolicateStackTrace',
    'react-native/Libraries/Utilities/Platform': 'react-native-web/dist/exports/Platform',
    'react-native/Libraries/Image/Image': 'react-native-web/dist/exports/Image',
    'react-native/Libraries/Text/Text': 'react-native-web/dist/exports/Text',
    'react-native/Libraries/Components/View/View': 'react-native-web/dist/exports/View',
    'react-native/Libraries/Components/TextInput/TextInput': 'react-native-web/dist/exports/TextInput',
    'react-native/Libraries/StyleSheet/StyleSheet': 'react-native-web/dist/exports/StyleSheet',
    // Add more aliases as needed for your specific project
  };

  // Fallback for modules that don't have web versions
  config.resolve.fallback = {
    ...config.resolve.fallback,
    'react-native-gesture-handler': path.join(__dirname, 'node_modules/react-native-web/dist/modules/UnimplementedView'),
    'react-native-screens': path.join(__dirname, 'node_modules/react-native-web/dist/modules/UnimplementedView'),
    'process/browser': require.resolve('process/browser'),
    'path': require.resolve('path-browserify'),
    'fs': false,
    'os': require.resolve('os-browserify/browser'),
    'crypto': require.resolve('crypto-browserify'),
    'stream': require.resolve('stream-browserify'),
    'buffer': require.resolve('buffer'),
    'util': require.resolve('util'),
  };
  
  // Use NormalModuleReplacementPlugin to provide direct module implementations
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /@react-native\/normalize-colors/,
      (resource) => {
        resource.request = path.resolve(__dirname, 'normalize-colors-mock.js');
      }
    )
  );
  
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /@react-native\/assets-registry\/registry/,
      (resource) => {
        resource.request = path.resolve(__dirname, 'asset-registry-mock.js');
      }
    )
  );
  
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /react-native\/Libraries\/Image\/AssetRegistry/,
      (resource) => {
        resource.request = path.resolve(__dirname, 'asset-registry-mock.js');
      }
    )
  );
  
  // Write mock files directly
  const fs = require('fs');
  try {
    fs.writeFileSync(
      path.resolve(__dirname, 'normalize-colors-mock.js'),
      normalizeColorsMock
    );
    
    fs.writeFileSync(
      path.resolve(__dirname, 'asset-registry-mock.js'),
      assetRegistryMock
    );
  } catch (error) {
    console.warn('Error creating mock files:', error);
  }

  // Modify environment variables
  // Convert env variables to strings for DefinePlugin
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  // Add IS_WEB flag and other environment variables
  config.plugins.forEach(plugin => {
    if (plugin.constructor.name === 'DefinePlugin') {
      // Preserve existing definitions
      const existingDefinitions = plugin.definitions;
      
      // Add new definitions
      plugin.definitions = {
        ...existingDefinitions,
        'process.env.IS_WEB': 'true',
        ...envKeys
      };
    }
  });
  
  // Add needed polyfills and global variables
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.platform': JSON.stringify('web'),
      // Fix for issue with HRTimerPolyfill
      'process.hrtime': () => null,
    })
  );
  
  // Handle Google Maps API Key for web maps
  if (env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    const googleMapsApiKey = env.REACT_APP_GOOGLE_MAPS_API_KEY;
    config.externals = {
      ...config.externals,
      GoogleMapsLoader: {
        root: 'google',
        commonjs2: 'google-maps',
        commonjs: 'google-maps',
        amd: 'google-maps',
      },
    };
    
    // Add script to HTML head
    config.plugins.forEach(plugin => {
      if (plugin.constructor.name === 'HtmlWebpackPlugin') {
        if (!plugin.userOptions.scriptLoading) {
          plugin.userOptions.scriptLoading = 'blocking';
        }
        if (!plugin.userOptions.googleMapsApiKey) {
          plugin.userOptions.googleApiKey = googleMapsApiKey;
          plugin.userOptions.headTags = [
            {
              tagName: 'script',
              attributes: {
                async: true,
                defer: true,
                src: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`,
              },
            },
          ];
        }
      }
    });
  }

  // Exclude specific modules from being processed
  config.module.rules.push({
    test: /\/node_modules\/@react-native-community\/cli-platform-.*/,
    use: 'null-loader',
  });
  
  // Fix for issues with Node.js polyfills
  if (!config.resolve.alias) {
    config.resolve.alias = {};
  }
  
  config.resolve.alias = {
    ...config.resolve.alias,
    process: 'process/browser',
  };
  
  // Enable Node.js polyfills
  if (!config.resolve.modules) {
    config.resolve.modules = [];
  }
  
  config.resolve.modules.push('node_modules');

  return config;
};

