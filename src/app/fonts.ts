import localFont from "next/font/local";

export const customFont = localFont({
  src: [{ path: "../app/fonts/Yourmate.ttf", weight: "400", style: "normal" }],
  variable: "--font-custom",
  display: "swap",
});
