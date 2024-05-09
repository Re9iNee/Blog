import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { notoSans, poppins } from "@/lib/fonts";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";

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
      className={`max-w-screen-xl min-h-screen mx-auto flex flex-col ${notoSans.className} ${poppins.variable}`}
    >
      <GoogleTagManager gtmId='GTM-PNRN4Z2P' />
      <Header />
      <div className='flex-grow relative'>{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
