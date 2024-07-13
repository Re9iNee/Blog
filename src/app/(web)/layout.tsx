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
  openGraph: {
    siteName: "Mora Blog",
    type: "website",
    url: "https://www.mora-ed.com",
    description: "The official blog of Mora",
    images: [
      "https://d1ntfq67otjmwh.cloudfront.net/mora-blog-files/1720898328299-homepage@2x.jpg",
    ],
  },
  twitter: {
    card: "summary_large_image",
    description: "The official blog of Mora",
    images: [
      "https://d1ntfq67otjmwh.cloudfront.net/mora-blog-files/1720898328299-homepage@2x.jpg",
    ],
  },
};

function layout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.GTMID;

  if (!gtmId) {
    throw new Error("GTMID code is not defined");
  }

  return (
    <div
      className={`max-w-screen-xl min-h-screen mx-auto flex flex-col ${notoSans.className} ${poppins.variable}`}
    >
      <GoogleTagManager gtmId={gtmId} />
      <Header />
      <div className='flex-grow relative'>{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
