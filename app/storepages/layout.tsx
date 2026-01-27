"use client";

import { useState } from "react";
import Header from "../component/Header";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* Header always gets the search state */}
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Render children normally */}
        {children}
      </body>
    </html>
  );
}
