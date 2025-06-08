import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StartRunFallback() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run Tracking Unavailable</Text>
      <Text style={styles.message}>
        GPS tracking is only available on the mobile app. Please open this app on an iOS or Android device to start your run.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 400,
  },
});
