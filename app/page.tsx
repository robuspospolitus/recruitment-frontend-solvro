'use client';
import CocktailsList from "@/components/utils/cocktailslist";
import { SearchBar } from "@/components/utils/searchbar";
import { useState } from "react";
import { Select } from "@/components/utils/select";
import { Info } from "@/components/utils/info";
import { Separator } from "@/components/ui/separator";
import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const [category, setCategory] = useState<string|null>("All");
  const [glass, setGlass] = useState<string|null>("All");
  const [results, setResults] = useState(0);
  const {theme, setTheme} = useTheme();

  return (
    <main>
      <Button className="absolute top-10 left-10 w-20 h-14" onClick={()=> theme === 'light' ? setTheme('dark'): setTheme('light')}>
        {theme == 'light' ? 
          <MoonStar className="size-6"/> :
          <Sun className="size-6"/> }
      </Button>
      <div className="w-full shadow bg-accent mb-2 rounded-2xl">
        <div className="flex max-w-2xl gap-2 mx-auto px-6">
          <SearchBar value={searchVal} setValue={setSearchVal} res={results}/>
          <Select value={category} setValue={setCategory} type="categories"/>
          <Select value={glass} setValue={setGlass} type="glasses"/>
        </div>
      </div>
      <CocktailsList category={category} search={searchVal} glass={glass} setResults={setResults}/>
      <Info/>
      <Separator/>
      <h3 className="m-4">Made with ♡ by Nadia Gill</h3>
    </main>
  );
}
