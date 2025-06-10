import "dotenv/config";
import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "datrun",
  slug: "datrun",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "com.prosh2.datrun",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  extra: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    androidClientId: process.env.ANDROID_CLIENT_ID,
    iOSClientId: process.env.IOS_CLIENT_ID,
    webClientId: process.env.WEB_CLIENT_ID,
    eas: {
      projectId: "df2a9cd7-2042-49e0-b0aa-870e026d55f0",
    },
  },
  ios: {
    ...config.ios,
    bundleIdentifier: "com.prosh2.datrun",
    supportsTablet: true,
    googleServicesFile: "./GoogleService-Info.plist",
  },
  android: {
    ...config.android,
    package: "com.prosh2.datrun",
    edgeToEdgeEnabled: true,
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    ...config.web,
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        backgroundColor: "#232323",
        dark: {
          image: "./assets/images/splash-icon.png",
          backgroundColor: "#000000",
        },
      },
    ],
    "expo-web-browser",
    "@react-native-google-signin/google-signin",
  ],
  experiments: {
    typedRoutes: true,
  },
});

// export default {
//   expo: {
//     extra: {
//       firebaseApiKey: process.env.FIREBASE_API_KEY,
//       firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
//       firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
//       firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//       firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//       firebaseAppId: process.env.FIREBASE_APP_ID,
//       firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
//       androidClientId: process.env.ANDROID_CLIENT_ID,
//       iOSClientId: process.env.IOS_CLIENT_ID,
//       webClientId: process.env.WEB_CLIENT_ID,
//     },
//   },
// };
