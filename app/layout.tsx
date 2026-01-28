import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Total-Grace Comm",
  description: "Get reliable gadgets at affordable prices here",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}

