
type GeocodingResult = {
  results?: GeocodingLocation[];
};

type GeocodingLocation = {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
};

type WeatherResponse = {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
};

