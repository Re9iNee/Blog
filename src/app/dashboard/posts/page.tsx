import { DataTable } from "@/components/dashboard/table/data-table";

import { getAllPosts } from "@/service/posts.service";
import { columns } from "./data-table/columns";
import { PostModel } from "@/types/post";

async function DashboardPostPage() {
  const posts: PostModel[] = await getAllPosts();

  return (
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
          <p className='text-muted-foreground'>
            Here&apos;s a list of all posts.
          </p>
        </div>
      </div>

      <DataTable data={posts} columns={columns} />
    </div>
  );
}

export default DashboardPostPage;
