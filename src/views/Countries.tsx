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

async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(
    "https://countries.dev/countries?fields=name,alpha3Code,region,capital,flags,population,area",
  );

  if (!response.ok) {
    throw new Error("Gick inte att hämta länderna");
  }

  return response.json();
}

function Countries() {
  const [search, setSearch] = useState("");

  const {
    data: countries,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["Countries"],
    queryFn: fetchCountries,
  });

  const filteredCountries = (countries ?? []).filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

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
        <InputGroup>
          <InputGroupAddon>
            <Search aria-hidden="true" />
          </InputGroupAddon>

          <InputGroupInput
            type="search"
            placeholder="Sök efter ett land..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Sök efter land"
            className="text-white placeholder:text-white"
          />
        </InputGroup>
      </div>

      <DataTable data={filteredCountries} columns={columns} />
    </section>
  );
}

export default Countries;
