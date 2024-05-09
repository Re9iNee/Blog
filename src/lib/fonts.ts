import { Outfit, Noto_Sans, Poppins } from "next/font/google";
// used weight: light
export const outfit = Outfit({ subsets: ["latin"], weight: "300" });
// used weight: light 300 - regular 400 - semiBold 600 - bold 700
export const notoSans = Noto_Sans({
  weight: ["300", "400", "700", "600"],
  subsets: ["latin"],
});
// used weights regular, bold
export const poppins = Poppins({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});
