'use client';
import { useQuery } from '@tanstack/react-query'
import { Toggle } from '../ui/toggle';
import { Separator } from '../ui/separator';
import { HeartIcon } from "lucide-react"
import { SheetBtn } from './sheet_btn';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { PageNav } from './page_nav';

type Props = {
  category?: string | null,
  glass?: string | null,
  search?: string,
  setResults: Dispatch<SetStateAction<number>>
}
type Drink = {
  alcoholic: boolean,
  category: string,
  createdAt: string,
  glass: string,
  id: number,
  imageUrl: string,
  instructions: string,
  name: string,
  updatedAt: string
}

export default function CocktailsList({search="",glass="All",category="All", setResults}:Props) {
  const [page, setPage] = useState(1);
  const perPage = 15;
  const { toggleFavorite, isFavorite } = useFavorites();

  const { data, isPending, error } = useQuery({
    queryKey: ['cocktails-all'],
    queryFn: fetchAllCocktails,
  })

  let drinks = data ?? [];
  if(category != "All") drinks = drinks.filter((drink:Drink) => drink.category == category)
  if(glass != "All") drinks = drinks.filter((drink:Drink) => drink.glass == glass)
  if(search) drinks = drinks.filter((drink:Drink) => {return drink.name.toLowerCase().includes(search.toLowerCase())});

  useEffect(() => {
      if (drinks) {
        setResults(drinks.length)
      }
    }, [drinks, setResults])
  
  const totalPages = Math.ceil(drinks.length / perPage);
  const paginatedDrinks = drinks.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (isPending) return <span>Loading...</span>
  if (error) return <span>Fetching data failed.</span>
  
  return (
    <div className='w-full shadow-lg rounded-2xl p-4 mt-2'>
      <PageNav currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
      <div className='grid justify-items-center gap-6 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 '>
        {paginatedDrinks.map((drink:Drink) => (
          <Card key={drink.id} className="w-full max-w-sm min-w-xs gap-2">
            <CardHeader>
              <CardTitle>{drink.name}</CardTitle>
              <CardDescription>
                {drink.createdAt.split("T")[0]}
              </CardDescription>
              <CardAction>
                <Toggle
                  aria-label="Toggle bookmark"
                  size="sm"
                  variant="outline"
                  pressed={isFavorite(drink.id)}   // <-- sprawdzanie stanu
                  onClick={() => toggleFavorite(drink.id)} // <-- toggle favorite
                >
                  <HeartIcon className="group-data-[state=on]/toggle:fill-foreground" />
                </Toggle>
              </CardAction>
            </CardHeader>
            <Separator/>
            <CardContent>
              <div className="flex flex-col gap-1">
                <p className='text-gray-500'>{drink.category}, {drink.glass}, {drink.alcoholic ? "alcohol" : "non-alcohol"}</p>
                <div className="w-full max-w-sm">
                  <AspectRatio ratio={16 / 14} className="rounded-lg bg-muted">
                    <Image
                      src={drink.imageUrl}
                      alt="Photo"
                      fill
                      loading='eager'
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full rounded-lg object-cover "
                    />
                  </AspectRatio>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <SheetBtn id={drink.id} />
            </CardFooter>
          </Card>
        ))}
        
      </div>
      {drinks.length == 0 && 
        <h3 className='text-center w-full'> No cocktails found. Try adjusting the filters </h3>}
          
    </div>
  )
}

function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(favId => favId !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: number) => favorites.includes(id);
  return { favorites, toggleFavorite, isFavorite };
}

const fetchAllCocktails = async () => {
  let all: Drink[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const res = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails/?page=${page}`);
    const json = await res.json();

    all = [...all, ...json.data];
    lastPage = json.meta.lastPage;
    page++;
  } while (page <= lastPage);

  return all;
};