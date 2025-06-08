import { Coordinates } from "@/components/model/Navigation";
import { calculateDistance } from "@/utils/calculate-distance";
import { formatTime } from "@/utils/time";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline, Region } from "react-native-maps";

export default function RunTrackingScreen() {
  const [path, setPath] = useState<Coordinates[]>([]);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null
  );

  // Start timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime]);

  const startTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
      return;
    }
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
  };

  // Start location tracking
  useEffect(() => {
    startTracking();
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

  // Calculate distance (naive haversine)
  const distance = useMemo(() => calculateDistance(path), [path]);

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
        <Text style={styles.statText}>
          📏 Distance: {distance.toFixed(2)} km
        </Text>
      </View>

      {isTracking && (
        <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
          <Text style={styles.stopText}>Stop</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  stats: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    elevation: 2,
  },
  statText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 4,
  },
  stopButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#ff3b30",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 50,
  },
  stopText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
