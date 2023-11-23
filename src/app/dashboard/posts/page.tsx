import { DataTable } from "@/components/dashboard/table/data-table";

import posts from "@/mocks/posts.json";
import { columns } from "./columns";

async function DashboardPostPage() {
  return <DataTable data={posts} columns={columns} />;
}

export default DashboardPostPage;
