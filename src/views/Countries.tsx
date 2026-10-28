import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/ui/datatable/data-table";
import { columns } from "@/components/ui/datatable/columns";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/inputBar/input-group";
import { Button } from "@base-ui/react/button";
import useCountries from "@/hooks/useCountries";

const regions = [
  "All",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
] as const;

function Countries() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("query") ?? "";
  const selectedRegion = searchParams.get("region") ?? "All";

  const { data: countries, isPending, isError, error } = useCountries();

  const filteredCountries = (countries ?? []).filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center gap-2 p-8">
        <Spinner />
        <span>Hämtar länderna...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
        <p className="font-semibold text-red-400">Kunde inte hämta länderna</p>

        <p className="mt-2 text-sm text-red-300" role="alert">
          {error instanceof Error
            ? error.message
            : "Ett oväntat fel inträffade."}
        </p>
      </div>
    );
  }
  return (
    <section className="w-full min-w-0 space-y-4">
      <div className="w-full max-w-sm">
        <InputGroup>
          <InputGroupAddon>
            <Search aria-hidden="true" />
          </InputGroupAddon>

          <InputGroupInput
            id="country-search"
            type="search"
            placeholder="Sök efter ett land..."
            value={search}
            onChange={(event) => {
              const params = new URLSearchParams(searchParams);
              const value = event.target.value;

              if (value) {
                params.set("query", value);
              } else {
                params.delete("query");
              }
              params.delete("page");
              setSearchParams(params);
            }}
            aria-label="Sök efter land"
            className="text-white placeholder:text-white"
          />
        </InputGroup>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Filtrera efter region">
        {regions.map((region) => {
          const isSelected = selectedRegion === region;

          return (
            <Button
              key={region}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                if (region === "All") {
                  params.delete("region");
                } else {
                  params.set("region", region);
                }
                params.delete("page");
                setSearchParams(params);
              }}
              className={
                isSelected
                  ? "border-sky-400 bg-sky-500 text-white hover:bg-sky-600"
                  : "border-white/20 text-slate-200 hover:bg-white/10 hover:text-white"
              }
            >
              {region}
            </Button>
          );
        })}
      </div>

      {filteredCountries.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-300" role="status">
          {" "}
          Inga länder matchar dina kriterier
        </p>
      ) : (
        <DataTable data={filteredCountries} columns={columns} />
      )}
    </section>
  );
}

export default Countries;
