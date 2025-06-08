import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function RunTrackingScreen() {
  const [path, setPath] = useState<Coordinates[]>([]);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);

  // Start timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime]);

  // Start location tracking
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 3,
        },
        (loc) => {
          const coords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setLocation(coords);
          setPath((prev) => [...prev, coords]);

          if (!region) {
            setRegion({
              ...coords,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        }
      );
    })();

    return () => {
      locationSubscription.current?.remove();
    };
  }, []);

  // Stop tracking
  const handleStop = () => {
    locationSubscription.current?.remove();
    setIsTracking(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Format time
  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate distance (naive haversine)
  const calculateDistance = (points: Coordinates[]): number => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    let distance = 0;
    for (let i = 1; i < points.length; i++) {
      const lat1 = points[i - 1].latitude;
      const lon1 = points[i - 1].longitude;
      const lat2 = points[i].latitude;
      const lon2 = points[i].longitude;
      const R = 6371e3; // meters

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      distance += R * c;
    }
    return distance / 1000; // in km
  };

  const distance = calculateDistance(path);

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          region={region}
          showsUserLocation
          followsUserLocation
        >
          <Polyline coordinates={path} strokeColor="#ff6b00" strokeWidth={5} />
          {location && <Marker coordinate={location} />}
        </MapView>
      )}

      <View style={styles.stats}>
        <Text style={styles.statText}>⏱ Time: {formatTime(elapsedTime)}</Text>
        <Text style={styles.statText}>📏 Distance: {distance.toFixed(2)} km</Text>
      </View>

      {isTracking && (
        <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
          <Text style={styles.stopText}>Stop</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  stats: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    elevation: 2,
  },
  statText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 4,
  },
  stopButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#ff3b30',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 50,
  },
  stopText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
