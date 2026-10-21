import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/ui/datatable/data-table";
import { columns } from "@/components/ui/datatable/columns";
import { useState } from "react";
import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/inputBar/input-group";
import { Button } from "@base-ui/react/button";

async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(
    "https://countries.dev/countries?fields=name,alpha3Code,region,capital,flags,population,area",
  );

  if (!response.ok) {
    throw new Error("Gick inte att hämta länderna");
  }

  return response.json();
}

const regions = [
  "All",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
] as const;

function Countries() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const {
    data: countries,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["Countries"],
    queryFn: fetchCountries,
  });

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
    return <p>Något gick fel.</p>;
  }

  return (
    <section className="w-full min-w-0 space-y-4">
      <div className="w-full max-w-sm">
        <label
          htmlFor="country-search"
          className="text-sm font-medium text-white"
        >
          Sök efter land
        </label>

        <InputGroup>
          <InputGroupAddon>
            <Search aria-hidden="true" />
          </InputGroupAddon>

          <InputGroupInput
            id="country-search"
            type="search"
            placeholder="Sök efter ett land..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
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
              onClick={() => setSelectedRegion(region)}
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
