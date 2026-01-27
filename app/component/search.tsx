"use client";

import { Search } from "lucide-react";

interface HeaderSearchProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function HeaderSearch({ query, setQuery }: HeaderSearchProps) {
  const handleSearch = () => {
    // Nothing extra needed: filtering happens on the page via props
  };

  return (
    <div className="flex bg-white rounded-[15px] w-[100%] border-b-2 border-purple-500">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-[100%] p-2 outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-purple-500 p-2 rounded-tr-[15px] rounded-br-[15px]"
      >
        <Search />
      </button>
    </div>
  );
}
