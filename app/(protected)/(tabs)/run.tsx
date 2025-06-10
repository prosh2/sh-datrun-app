import { RootStackParamList } from "@/components/model/Navigation";
import StartRunFallback from "@/components/StartRunFallback";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

type StartRunNav = StackNavigationProp<RootStackParamList, "StartRun">;

export default function StartRunScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<StartRunNav>();

  if (Platform.OS === "web") {
    return <StartRunFallback />;
  }

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Location access is required to use this feature.",
      );
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    const initialRegion: Region = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    setRegion(initialRegion);
    setLoading(false);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleStartRun = () => {
    if (location) {
      navigation.navigate("run-tracking", {
        startLocation: location.coords,
      });
    } else {
      Alert.alert(
        "Location not available",
        "Please wait while we fetch your location.",
      );
    }
  };

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          showsMyLocationButton
        >
          <Marker coordinate={region} title="You" />
        </MapView>
      ) : (
        <View style={styles.loadingMap}>
          <ActivityIndicator size="large" color="#ff6b00" />
          <Text style={{ color: "#666", marginTop: 10 }}>Loading map...</Text>
        </View>
      )}

      <TouchableOpacity style={styles.startButton} onPress={handleStartRun}>
        <Text style={styles.startText}>Start Run</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 50 },
  map: { flex: 1 },
  loadingMap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#ff6b00",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 50,
    elevation: 5,
  },
  startText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
