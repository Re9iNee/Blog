import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";
import { Noto_Sans, Poppins } from "next/font/google";

const NotoSansFont = Noto_Sans({
  weight: ["400", "300", "600", "700"],
  subsets: ["latin"],
});

const PoppinsFont = Poppins({
  weight: ["700"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Mora Blog",
    default: "Homepage | Mora Blog",
  },
  description: "The official blog of Mora",
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`max-w-screen-xl min-h-screen mx-auto flex flex-col ${NotoSansFont.className} ${PoppinsFont.variable}`}
    >
      <GoogleTagManager gtmId='GTM-PNRN4Z2P' />
      <Header />
      <div className='flex-grow relative'>{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
