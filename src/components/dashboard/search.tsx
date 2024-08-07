import React from "react";
import { Input } from "../ui/input";

function Search() {
  return (
    <Input
      type="search"
      placeholder="Search..."
      className="cursor-not-allowed md:w-[100px] lg:w-[300px]"
    />
  );
}

export default Search;
