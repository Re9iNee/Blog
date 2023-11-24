import { DataTable } from "@/components/dashboard/table/data-table";

import posts from "@/mocks/posts.json";
import { columns } from "./columns";
import { getAllPosts } from "@/service/posts.service";

async function DashboardPostPage() {
  const posts = await getAllPosts();

  return <DataTable data={posts as any} columns={columns} />;
}

export default DashboardPostPage;
