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
