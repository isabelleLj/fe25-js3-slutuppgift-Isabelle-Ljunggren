import { fetchCapitalCoordinates, fetchWeather } from "@/services/weather";
import { useQuery } from "@tanstack/react-query";




const useWeather = (country: Country | undefined) => {
const data = useQuery({
    queryKey: ["weather", country?.alpha3Code],
    enabled: Boolean(country),
    retry: 3,
    queryFn: async () => {
      if (!country) {
        throw new Error("Landet hittades inte");
      }

      let coordinates: {
        latitude: number;
        longitude: number;
      } | null = null;

      if (country.capital) {
        const capitalLocation = await fetchCapitalCoordinates(
          country.capital,
          country.name,
        );

        if (capitalLocation) {
          coordinates = {
            latitude: capitalLocation.latitude,
            longitude: capitalLocation.longitude,
          };
        }
      }

      if (!coordinates && country.latlng?.length === 2) {
        const [latitude, longitude] = country.latlng;

        coordinates = { latitude, longitude };
      }

      if (!coordinates) {
        throw new Error("Koordinater saknas");
      }

      return fetchWeather(coordinates.latitude, coordinates.longitude);
    },
  });

  return data;

}
export default useWeather; 