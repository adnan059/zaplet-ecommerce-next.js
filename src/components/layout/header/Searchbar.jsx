"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Searchbar = () => {
  const router = useRouter();
  const handleSearch = (formData) => {
    const query = formData.get("query");
    console.log(query);
    router.push(`/search?q=${query}`);
  };
  return (
    <div className="search">
      <form action={handleSearch} className="searchForm">
        <input
          className="searchInput"
          type="text"
          placeholder="Search Products..."
          name="query"
          id="query"
        />
        <button type="submit">
          <Search />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
