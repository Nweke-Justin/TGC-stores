"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function HeaderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.push(`/storepages/home?${params.toString()}`);
  };

  return (
    <div className="flex bg-white rounded-[15px] w-full border-b-2 border-purple-500">
      <input
        type="text"
        placeholder="Search products..."
        defaultValue={query}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full p-2 outline-none"
      />
      <button className="bg-purple-500 p-2 rounded-tr-[15px] rounded-br-[15px]">
        <Search />
      </button>
    </div>
  );
}
