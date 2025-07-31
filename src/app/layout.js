import { Poppins, Nunito } from "next/font/google";
import "../assets/styles/globals.css";
import Header from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import ThemeProvider from "@/components/shared/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--nunito",
});

export const metadata = {
  title: "Zaplet | Buy Latest Gadgets Online",
  description:
    "Shop the latest smartphones, laptops, and accessories at unbeatable prices. Fast delivery and quality guaranteed.",
  keywords: [
    "gadgets",
    "electronics",
    "smartphones",
    "power bank",
    "headset",
    "tech store",
    "online electronics shop",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nunito.variable} antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body>
        <ThemeProvider
          props={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
          }}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
