import EditPostForm from "@/components/dashboard/posts/edit-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchCategoriesName } from "@/service/category.service";
import { getPostById } from "@/service/posts.service";
import { fetchAuthors } from "@/service/user.service";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Post",
};

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [post, authors, categories] = await Promise.all([
    getPostById(+id),
    fetchAuthors(),
    fetchCategoriesName(),
  ]);

  if (!post) notFound();

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
              <Link href={"/dashboard/posts"}>Posts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit &quot;{post.title}&quot;</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EditPostForm
        postId={post.id}
        authors={authors}
        initialValues={post}
        categories={categories}
      />
    </div>
  );
}
