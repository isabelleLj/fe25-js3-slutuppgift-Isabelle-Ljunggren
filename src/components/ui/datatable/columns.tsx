import { createColumnHelper } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import type { DataTableFeatures } from "./data-table-features";
import { Button } from "../button";

const columnHelper = createColumnHelper<DataTableFeatures, Country>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Land
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),

  columnHelper.accessor("region", {
    header: "Region",
  }),

  columnHelper.accessor("capital", {
    header: "Huvudstad",
  }),
]);
