import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CreatePostForm from "@/components/dashboard/posts/create-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchCategoriesName } from "@/service/category.service";
import { fetchAuthors } from "@/service/user.service";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Post",
};

export default async function CreatePostPage() {
  const [authors, categories, session] = await Promise.all([
    fetchAuthors(),
    fetchCategoriesName(),
    getServerSession(authOptions),
  ]);

  const authorId = session?.user.id;

  if (!authorId) notFound();

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
            <BreadcrumbPage>Create a new Post</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CreatePostForm
        authors={authors}
        authorId={authorId}
        categories={categories}
      />
    </div>
  );
}
