
async function fetchCapitalCoordinates(
  capital: string,
  countryName: string,
): Promise<GeocodingLocation | null> {
  const params = new URLSearchParams({
    name: capital,
    count: "10",
    language: "sv",
    format: "json",
  });

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`,
  );

  if (!response.ok) {
    throw new Error("Kunde inte hitta huvudstadens koordinater");
  }

  const data: GeocodingResult = await response.json();

  if(!("results" in data)) {
    throw new Error("No result");
  }

  const locations = data.results ?? [];

  const matchingCapital = locations.find(
    (location) => location.name.toLowerCase() === capital.toLowerCase()
      && location.country?.toLowerCase() === countryName.toLowerCase(),
  );

  return matchingCapital ?? null;
}

async function fetchWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,wind_speed_10m,weather_code",
    wind_speed_unit: "kmh",
    timezone: "auto",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta väderinformation");
  }

  return response.json();
}

export { fetchCapitalCoordinates, fetchWeather };
