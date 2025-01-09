import Providers from "@/components/Providers";
import "./globals.css";
import { Inter, Exo } from "next/font/google";
import { useDispatch } from "react-redux";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Optional: Define a CSS variable
});

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo", // Optional: Define a CSS variable
});
export const metadata = {
  title: "Dental Nursing Guide",
  description:
    "A comprehensive guide for dental nurses covering essential skills, patient care, and industry standards to help you excel in your role.",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${exo.variable} font-inter bg-white overflow-x-hidden`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
