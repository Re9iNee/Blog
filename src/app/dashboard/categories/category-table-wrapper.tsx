import CategoryTable from "@/components/dashboard/categories/category-table";
import { columns } from "@/components/dashboard/categories/data-table/columns";

import {
  fetchCategories,
  fetchCategoriesCount,
} from "@/service/category.service";

type Props = {
  page: number;
  query?: string;
  perPage: number;
};
export default async function CategoryTableWrapper({
  page,
  query,
  perPage,
}: Props) {
  const [categoryCount, categories] = await Promise.all([
    fetchCategoriesCount(query),
    fetchCategories({
      page,
      query,
      perPage,
    }),
  ]);

  return (
    <CategoryTable
      page={page}
      query={query}
      perPage={perPage}
      columns={columns}
      categories={categories}
      rowCount={categoryCount}
    />
  );
}
