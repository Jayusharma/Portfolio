
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GooeyNav from "../../components/GooeyNav";
import ClientLenisProvider from "../../components/bits/ClientLenis";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio",
  description: "Jayditya shamra",
  icons: {
    icon: "/logo.png", // or .png, .svg depending on your file
  },
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <ClientLenisProvider>
        <div className="h-screen w-screen">
          <GooeyNav />
          {children}
          <section className="w-full  text-white py-8">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-sm text-gray-400">&copy; 2025 Jayditya sharma. All rights reserved.</p>
            </div>
          </section>
          </div>
         
          </ClientLenisProvider>
      </body>
    </html>
  );
}
