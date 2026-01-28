"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.trim()) {
      router.push(`/storepages/home?q=${encodeURIComponent(value)}`);
    } else {
      router.push(`/storepages/home`);
    }
  };

  return (
    <div className="flex bg-white rounded-[15px] w-full border-b-2 border-purple-500">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 outline-none"
      />
      <button className="bg-purple-500 p-2 rounded-tr-[15px] rounded-br-[15px]">
        <Search />
      </button>
    </div>
  );
}
