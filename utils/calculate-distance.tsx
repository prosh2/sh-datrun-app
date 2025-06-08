import { Coordinates } from "@/components/model/Navigation";

 export const calculateDistance = (points: Coordinates[]): number => {
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