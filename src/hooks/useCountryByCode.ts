import { fetchCountryByCode } from "@/utils/countries";
import { useQuery } from "@tanstack/react-query";

const useCountryByCode = (code:string | undefined)=> {
  const data = useQuery({
    queryKey: ["Country", code],
    queryFn: () => fetchCountryByCode(code!),
    enabled: !!code,
  });

  return data;
}


export default useCountryByCode;