import * as React from "react";
import { useSearchParams } from "react-router";

import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { Button } from "../button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features, type DataTableFeatures } from "./data-table-features";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  resetKey?: string;
}
export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page") ?? "1");
  const pageIndex =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam - 1 : 0;

  const goToPage = (nextPageIndex: number) => {
    const params = new URLSearchParams(searchParams);

    if (nextPageIndex === 0) {
      params.delete("page");
    } else {
      params.set("page", String(nextPageIndex + 1));
    }

    setSearchParams(params);
  };

  console.log({
    urlPage: searchParams.get("page"),
    pageIndex,
  });

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full min-w-0">
      <div className="w-full min-w-0 overflow-hidden rounded-md border">
        <Table className="w-full table-fixed border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="min-w-0 whitespace-normal wrap-break-word px-1 py-2 text-xs sm:px-4 sm:text-sm lg:px-6"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="max-w-0 wrap-break-word px-2 py-2 text-xs sm:px-4 sm:text-sm lg:px-6"
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Inga länder matchar dina kriterier.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 p-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-center text-xs text-muted-foreground sm:text-left sm:text-sm">
          Sida {table.state.pagination.pageIndex + 1} av {table.getPageCount()}
        </p>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Button
            variant="default"
            size="sm"
            className="min-w-0 flex-1 sm:flex-none"
            onClick={() => goToPage(pageIndex - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            Föregående
          </Button>

          <Button
            variant="default"
            size="sm"
            className="min-w-0 flex-1 sm:flex-none"
            onClick={() => goToPage(pageIndex + 1)}
            disabled={!table.getCanNextPage()}
          >
            Nästa
          </Button>
        </div>
      </div>
    </div>
  );
}
