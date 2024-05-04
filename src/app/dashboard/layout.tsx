import DashboardHeader from "@/components/dashboard/header";
import { Metadata } from "next";
import React from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Overview",
  },
  description: "Dashboard for managing the Mora Blog",
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
      <Providers>
        <DashboardHeader />
        {children}
      </Providers>
    </div>
  );
}

export default layout;
