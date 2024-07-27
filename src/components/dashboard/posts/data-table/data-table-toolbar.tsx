import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { FaPlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { DataTableFacetedFilter } from "../../../ui/table/data-table-faceted-filter";
import { DataTableViewOptions } from "../../../ui/table/data-table-view-options";
import { statuses } from "./data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFiltered = searchParams.has("query");

  const handleSearch = useDebouncedCallback((term: string) => {
    table.getColumn("title")?.setFilterValue(term);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Button size="sm" data-cy="create" asChild>
          <Link href={"/dashboard/posts/create"}>
            <FaPlus className="mr-2 h-4 w-4" />
            Create a post
          </Link>
        </Button>
        <Input
          placeholder="Filter posts..."
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(event) => handleSearch(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => handleReset()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
