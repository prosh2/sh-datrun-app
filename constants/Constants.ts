import Constants from "expo-constants";

export const {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId,
  firebaseAppId,
  firebaseMeasurementId,
  androidClientId,
  iOSClientId,
  webClientId,
} = Constants.expoConfig?.extra || {};

export const USER_DISPLAY_PICTURE_FALLBACK = "../assets/images/favicon.png";
