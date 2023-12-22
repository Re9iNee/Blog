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
    <div
      className={`max-w-screen-xl min-h-screen mx-auto flex flex-col ${logoFont.variable}`}
    >
      <Header />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
