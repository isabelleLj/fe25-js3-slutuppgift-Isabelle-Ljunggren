import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/ui/datatable/data-table";
import { columns } from "@/components/ui/datatable/columns";

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
  const {
    data: countries,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["Countries"],
    queryFn: fetchCountries,
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <DataTable data={countries} columns={columns} />
    </div>
  );
}

export default Countries;
