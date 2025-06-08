export type RootStackParamList = {
  StartRun: undefined;
  'run-tracking': {
    startLocation: {
      latitude: number;
      longitude: number;
    };
  };
};

export interface Coordinates {
  latitude: number;
  longitude: number;
}