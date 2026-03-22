'use client';
import CocktailsList from "@/components/utils/cocktailslist";
import { SearchBar } from "@/components/utils/searchbar";
import { useState } from "react";
import { CategorySelect } from "@/components/utils/categoryselect";
// Wyświetlanie listy koktajli
// Zaznaczanie koktajlu jako ulubiony
// Wyszukiwanie i filtrowanie koktajli - użyj wybranych pól, które zwraca API i uważasz je za przydatne dla użytkownika
// Zobaczenie szczegółów koktajlu, a zwłaszcza jego składników
// Postaraj się, aby aplikacja była ładna i przyjazna dla użytkownika 😉 
// Możesz dodać dowolne funkcje, których uznasz za stosowne.

// card na cocktails
// accordion
// alert po dodaniu do polubionych
// button duh
// button group
// data table dla składników
// oooo albo drawer
// empty dla zeru wyników
// input dla search bar
// input group aby móć w inpucie rzeczy robić
// item
// table
// toggle do dodawania do ulubionych
// tooltip cool do hoveru
export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const [category, setCategory] = useState<string|null>("All");
  return (
    <main>
      <SearchBar value={searchVal} setValue={setSearchVal} />
      <CategorySelect value={category} setValue={setCategory}/>
      <CocktailsList category={category} search={searchVal}/>
    </main>
  );
}
