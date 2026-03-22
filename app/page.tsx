'use client';
import CocktailsList from "@/components/utils/cocktailslist";
import { SearchBar } from "@/components/utils/searchbar";
import { useState } from "react";
import { Select } from "@/components/utils/select";

// accordion na dole strony ig
export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const [category, setCategory] = useState<string|null>("All");
  const [glass, setGlass] = useState<string|null>("All");
  const [results, setResults] = useState(0);

  return (
    <main>
      <div className="w-full shadow bg-accent mb-2 rounded-2xl">
        <div className="flex max-w-2xl gap-2 mx-auto px-6">
          <SearchBar value={searchVal} setValue={setSearchVal} res={results}/>
          <Select value={category} setValue={setCategory} type="categories"/>
          <Select value={glass} setValue={setGlass} type="glasses"/>
        </div>
      </div>
      <CocktailsList category={category} search={searchVal} glass={glass} setResults={setResults}/>
    </main>
  );
}
