import { Metadata } from "next";
import { Suspense } from "react";
import CategoryTableWrapper from "./category-table-wrapper";

export const metadata: Metadata = {
  title: "Categories List",
};

async function DashboardCategoryPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
    per_page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.per_page) || 10;

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all categories.
          </p>
        </div>
      </div>

      <Suspense
        fallback={<div>Loading ...</div>}
        key={query + currentPage + perPage}
      >
        <CategoryTableWrapper
          query={query}
          perPage={perPage}
          page={currentPage}
        />
      </Suspense>
    </div>
  );
}

export default DashboardCategoryPage;
