import { mapCountry } from "@/utils/countries";
import { useQuery } from "@tanstack/react-query";


const useCountries = () =>  {
 const data = useQuery({
    queryKey: ["Countries"],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  return data;
}

async function fetchCountriesFromApi(offset = 0, limit = 100) {
  const response = await fetch(
    `https://api.restcountries.com/countries/v5?offset=${offset}&limit=${limit}?response_fields=${[
      "names.common",
      "names.native",
      "names.translations",
      "capitals",
      "flag.url_png",
      "flag.url_svg",
      "region",
      "subregion",
      "population",
      "coordinates.lat",
      "coordinates.lng",
      "currencies",
    ].join(",")}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_COUNTRIES_V5_API_KEY}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok || result.errors?.length) {
    throw new Error(
      result.errors?.[0]?.message ?? "Gick inte att hämta länderna",
    );
  }

  return result;
}

async function fetchCountries(): Promise<Country[]> {
  const limit = 100;

  const { data } = await fetchCountriesFromApi(0, 1);
  const total: number = data.meta.total;

  const offsets = Array.from(
    { length: Math.ceil(total / limit) },
    (_, index) => index * limit,
  );

  const countries = await Promise.all(
    offsets.map(async (offset) => {
      const { data } = await fetchCountriesFromApi(offset, limit);
      return data.objects as unknown[];
    }),
  );

  return countries.flat().map(mapCountry);
}

export default useCountries;

