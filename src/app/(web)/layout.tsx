import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { cn } from "@/lib/utils";

import AnuratiRegular from "next/font/local";

const logoFont = AnuratiRegular({
  src: "./fonts/Anurati-Regular.otf",
  variable: "--font-anurati",
});

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`max-w-screen-xl mx-auto ${logoFont.variable}`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
