import { createColumnHelper } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import type { DataTableFeatures } from "./data-table-features";
import { Button } from "../button";

const columnHelper = createColumnHelper<DataTableFeatures, Country>();

export const columns = columnHelper.columns([
  columnHelper.accessor((row) => row.flags.svg, {
    id: "flag",
    header: "Flagga",
    cell: (info) => (
      <img
        src={info.getValue()}
        alt={`Flaggan för ${info.row.original.name}`}
        className="h-4 w-6 rounded-sm object-cover sm:h-6 sm:w-8"
        loading="lazy"
      />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="h-auto whitespace-normal px-1 py-1 text-xs sm:px-3 sm:text-sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Land
        <ArrowUpDown className="ml-1 h-3 w-3 shrink-0 sm:ml-2 sm:h-4 sm:w-4" />
      </Button>
    ),
    cell: (info) => (
      <span className="block whitespace-normal wrap-break-word">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("region", {
    header: "Region",
    cell: (info) => (
      <span className="block whitespace-normal wrap-break-word">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("capital", {
    header: "Huvudstad",
    cell: (info) => (
      <span className="block whitespace-normal wrap-break-word">
        {info.getValue()}
      </span>
    ),
  }),
]);
