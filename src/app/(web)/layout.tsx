import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { Noto_Sans, Poppins } from "next/font/google";

import AnuratiRegular from "next/font/local";

const logoFont = AnuratiRegular({
  src: "./fonts/Anurati-Regular.otf",
  variable: "--font-anurati",
});

const NotoSansFont = Noto_Sans({
  weight: ["400", "300", "600", "700"],
  subsets: ["latin"],
});

const PoppinsFont = Poppins({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`max-w-screen-xl min-h-screen mx-auto flex flex-col ${logoFont.variable} ${NotoSansFont.className} ${PoppinsFont.variable}`}
    >
      <Header />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
