import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { notoSans, poppins } from "@/lib/fonts";
import { SITE_URL } from "@/lib/utils/constants";
import { getHomepageOGImageLink } from "@/lib/utils/imageUtils";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Mora Blog",
    default: "Homepage | Mora Blog",
  },
  alternates: {
    canonical: `${SITE_URL}`,
  },
  description: "The official blog of Mora",
  openGraph: {
    siteName: "Mora Blog",
    type: "website",
    url: "https://www.mora-ed.com",
    description: "The official blog of Mora",
    images: [getHomepageOGImageLink()],
  },
  twitter: {
    card: "summary_large_image",
    description: "The official blog of Mora",
    images: [getHomepageOGImageLink()],
  },
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`mx-auto flex min-h-screen max-w-screen-xl flex-col ${notoSans.className} ${poppins.variable}`}
    >
      <Header />
      <div className="relative min-h-screen flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
