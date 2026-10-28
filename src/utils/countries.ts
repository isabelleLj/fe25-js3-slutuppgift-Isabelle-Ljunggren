export const mapCountry = (country: any): Country => {
    const nativeNames: { common: string }[] = Object.values(
  country.names.native ?? {},
);

  return {
    name: country.names.common,
    nativeName: nativeNames[0]?.common,
    alpha3Code: country.codes.alpha_3,
    region: country.region,
    subregion: country.subregion,
    capital: country.capitals[0]?.name,
    flags: {
      png: country.flag.url_png,
      svg: country.flag.url_svg,
    },
    population: country.population,
    area: country.area?.kilometers,
    latlng: country.coordinates
      ? [country.coordinates.lat, country.coordinates.lng]
      : undefined,
    languages: country.languages?.map((language: any) => ({
      name: language.name,
      nativeName: language.native_name,
      iso639_1: language.iso639_1 || undefined,
      iso639_2: language.iso639_2b || undefined,
    })),
    currencies: Object.fromEntries(
      (country.currencies ?? []).map((currency: Currency & { code: string }) => [
        currency.code,
        {
          name: currency.name,
          symbol: currency.symbol,
        },
      ]),
    ),
  };
}

export async function fetchCountryByCode(code: string): Promise<Country> {
  const response = await fetch(
    `https://api.restcountries.com/countries/v5/codes.alpha_3/${code}?pretty=1`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_COUNTRIES_V5_API_KEY}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok || result.errors?.length || !result.data.objects?.length) {
    throw new Error(
      result.errors?.[0]?.message ?? "Gick inte att hämta landet",
    );
  }

  return mapCountry(result.data.objects[0]);
}