import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const balqis = localFont({
  src: [
    {
      path: "./font/Balqis/Balqis.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-balqis",
  display: "swap",
});

export const metadata = {
  title: "Anwita Chakraborty",
  description: "Anwita's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${balqis.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
