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
import { fetchAuthors } from "@/service/user.service";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CreatePostPage() {
  const authors = await fetchAuthors();
  const session = await getServerSession(authOptions);
  const authorId = session?.user.id;

  if (!authorId) notFound();

  return (
    <div className='p-8 space-y-8'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/dashboard'>Home</BreadcrumbLink>
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

      <CreatePostForm authors={authors} authorId={authorId} />
    </div>
  );
}
