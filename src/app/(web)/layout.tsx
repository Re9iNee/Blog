import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
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

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`max-w-screen-xl min-h-screen mx-auto flex flex-col ${NotoSansFont.className} ${PoppinsFont.variable}`}
    >
      <Header />
      <div className='flex-grow relative'>{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
