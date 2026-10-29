import { fetchCountryByCode } from "@/utils/countries";
import { useQuery } from "@tanstack/react-query";

const useCountryByCode = (code:string | undefined)=> {
  const data = useQuery({
    queryKey: ["Country", code],
    queryFn: () => fetchCountryByCode(code!),
    enabled: !!code,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  return data;
}


export default useCountryByCode;