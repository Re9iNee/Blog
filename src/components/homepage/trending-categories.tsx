import { fetchCategoriesName } from "@/service/category.service";
import Chip from "../ui/chips";

type Props = {
  selectedCategory?: string;
};
export default async function TrendingCategoriesWrapper({
  selectedCategory,
}: Props) {
  const categories = await (await fetchCategoriesName()).slice(0, 4);

  return (
    <section aria-label="trending topics" className="space-y-3">
      <div className="flex gap-2 p-1">
        {categories.map((cat) => (
          <Chip key={cat.id} isActive={cat.name === selectedCategory}>
            {cat.name}
          </Chip>
        ))}
      </div>
    </section>
  );
}
