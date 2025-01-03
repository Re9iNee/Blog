import CreateCategoryForm from "@/components/dashboard/categories/create-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPostsTitleAndImage } from "@/service/posts.service";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Category",
};

export default async function CreateCategoryPage() {
  const posts = await getPostsTitleAndImage();

  return (
    <div className="space-y-8 p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/dashboard/categories"}>Categories</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create a new Category</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CreateCategoryForm posts={posts} />
    </div>
  );
}
