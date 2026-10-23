import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { getWeatherDescription } from "@/utils/weatherDescription";
import { fetchWikipediaSummary } from "@/services/wikipedia";
import useWeather from "@/hooks/useWeather";
import useWikipedia from "@/hooks/useWikipedia";

async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(
    "https://countries.dev/countries?fields=name,nativeName,alpha3Code,region,subregion,capital,flags,population,area,latlng,languages,currencies",
  );

  if (!response.ok) {
    throw new Error("Gick inte att hämta länderna");
  }

  return response.json();
}

function CountryDetails() {
  const { code } = useParams();
  const location = useLocation();

  const {
    data: countries,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["Countries"],
    queryFn: fetchCountries,
  });

  const country = countries?.find((country) => country.alpha3Code === code);
  const {
    data: weather,
    isPending: isWeatherPending,
    isError: isWeatherError,
    refetch: refetchWeather,
  } = useWeather(country);

  const {
    data: wikipedia,
    isPending: isWikipediaPending,
    isError: isWikipediaError,
    refetch: refetchWikipedia,
  } = useWikipedia(country);

  const backUrl = location.state?.from ?? "/";

  if (isPending) {
    return (
      <div className="flex items-center justify-center gap-2 p-8">
        <Spinner />
        <span>Hämtar landets information...</span>
      </div>
    );
  }

  if (isError || !country) {
    return (
      <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-slate-950 px-3 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-2xl font-bold">Landet hittades inte</h1>
        <Link to={backUrl} className="mt-4 inline-block underline">
          Tillbaka till listan
        </Link>
      </main>
    );
  }

  const languages = (country.languages ?? []).map(
    (language) => language.nativeName ?? language.name,
  );

  const currencies = Object.values(country.currencies ?? {});

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-slate-950 px-3 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <Link
          to={backUrl}
          className="inline-block rounded-md underline underline-offset-4"
        >
          ← Tillbaka
        </Link>

        <section className="space-y-6 rounded-2xl border bg-card p-4 text-card-foreground sm:p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <img
              src={country.flags.svg}
              alt={`${country.name}s flagga`}
              className="h-auto w-full max-w-xs rounded-md border border-white/10 object-contain sm:w-64"
            />

            <div className="min-w-0 space-y-2">
              <h1 className="text-3xl font-bold">{country.name}</h1>

              {country.nativeName && (
                <p className="text-lg text-muted-foreground">
                  {country.nativeName}
                </p>
              )}

              <p>
                <span className="font-semibold">Region:</span>{" "}
                {country.region || "Uppgift saknas"}
              </p>

              <p>
                <span className="font-semibold">Underregion:</span>{" "}
                {country.subregion || "Uppgift saknas"}
              </p>

              <p>
                <span className="font-semibold">Huvudstad:</span>{" "}
                {country.capital || "Uppgift saknas"}
              </p>

              <p>
                <span className="font-semibold">Befolkning:</span>{" "}
                {country.population.toLocaleString("sv-SE")}
              </p>

              <p>
                <span className="font-semibold">Språk:</span>{" "}
                {languages.length ? languages.join(", ") : "Uppgift saknas"}
              </p>

              <p>
                <span className="font-semibold">Valuta:</span>{" "}
                {currencies.length
                  ? currencies
                      .map((currency) =>
                        currency.symbol
                          ? `${currency.name} (${currency.symbol})`
                          : currency.name,
                      )
                      .join(", ")
                  : "Uppgift saknas"}
              </p>
            </div>
          </div>
          <section className="space-y-3  bg-card p-4 text-card-foreground sm:p-6">
            <h2 className="text-xl font-semibold">Väder i huvudstaden</h2>

            {isWeatherPending && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Spinner />
                <span>Hämtar väder...</span>
              </div>
            )}

            {isWeatherError && (
              <div className="space-y-3">
                <p role="alert">Det gick inte att hämta vädret.</p>

                <button
                  type="button"
                  onClick={() => refetchWeather()}
                  className="rounded-md border px-4 py-2 hover:bg-muted"
                >
                  Försök igen
                </button>
              </div>
            )}

            {weather && (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Väder:</span>{" "}
                  {getWeatherDescription(weather.current.weather_code)}
                </p>

                <p>
                  <span className="font-semibold">Temperatur:</span>{" "}
                  {weather.current.temperature_2m} °C
                </p>

                <p>
                  <span className="font-semibold">Vind:</span>{" "}
                  {weather.current.wind_speed_10m} km/h
                </p>
              </div>
            )}
          </section>
          <section className="space-y-4 rounded-2xl border bg-card p-4 text-card-foreground sm:p-6">
            <h2 className="text-xl font-semibold">Om {country.name}</h2>

            {isWikipediaPending && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Spinner />
                <span>Hämtar information från Wikipedia...</span>
              </div>
            )}

            {isWikipediaError && (
              <div className="space-y-3">
                <p role="alert">
                  Det gick inte att hämta information från Wikipedia.
                </p>

                <button
                  type="button"
                  onClick={() => refetchWikipedia()}
                  className="rounded-md border px-4 py-2 hover:bg-muted"
                >
                  Försök igen
                </button>
              </div>
            )}

            {wikipedia && (
              <div className="space-y-4">
                {wikipedia.thumbnail && (
                  <img
                    src={wikipedia.thumbnail.source}
                    alt={`Bild som illustrerar ${country.name}`}
                    className="h-auto max-h-80 w-full rounded-xl object-cover"
                  />
                )}

                {wikipedia.extract && (
                  <p className="leading-7 text-muted-foreground">
                    {wikipedia.extract}
                  </p>
                )}

                <p className="text-sm text-muted-foreground">
                  Källa:{" "}
                  <a
                    href={wikipedia.content_urls.desktop.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Wikipedia – {wikipedia.title}
                  </a>
                </p>

                <a
                  href={wikipedia.content_urls.desktop.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Läs hela artikeln
                </a>
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}

export default CountryDetails;
