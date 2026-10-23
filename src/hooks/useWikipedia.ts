import { fetchWikipediaSummary } from "@/services/wikipedia";
import { useQuery } from "@tanstack/react-query";

 
 
 const useWikipedia = (country: Country | undefined) => {
     const data = useQuery({
    queryKey: ["wikipedia", country?.alpha3Code],
    enabled: Boolean(country),
    queryFn: async () => {
      if (!country) {
        throw new Error("Landet hittades inte");
      }

      return fetchWikipediaSummary(country.name);
    },
  });
    return data;
 }

 export default useWikipedia;


 
