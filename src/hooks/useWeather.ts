import { fetchWeather } from "@/services/weather";
import { useQuery } from "@tanstack/react-query";

const useWeather = (country: Country | undefined) => {
  return useQuery({
    queryKey: ["weather", country?.alpha3Code],
    enabled: Boolean(country?.latlng?.length === 2),
    retry: 3,
    staleTime: 1000 * 60 * 2,
    queryFn: async () => {
      if (!country?.latlng || country.latlng.length !== 2) {
        throw new Error("Huvudstadens koordinater saknas");
      }

      const [latitude, longitude] = country.latlng;

      return fetchWeather(latitude, longitude);
    },
  });
};

export default useWeather;