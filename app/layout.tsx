import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Personal Note App",
  description: "Created by M Rahman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="scroll-smooth tracking-tight bg-gradient-to-l from-green-100 via-green-150 to-gray-200">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
