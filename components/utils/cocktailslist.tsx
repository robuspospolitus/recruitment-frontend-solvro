'use client';
import { useQuery } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import { Separator } from '../ui/separator';
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
export default function CocktailsList({search="",glass="All",category="All", setResults}:Props) {
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useQuery({
    queryKey: ['cocktails', page],
    queryFn: () => fetch(`https://cocktails.solvro.pl/api/v1/cocktails/?page=${page}`).then(r => r.json()),
  })
  let drinks = data?.data ?? [];
  if(category != "All") drinks = drinks.filter((drink:any) => drink.category == category)
  if(glass != "All") drinks = drinks.filter((drink:any) => drink.glass == glass)
  if(search) drinks = drinks.filter((drink:any) => {return drink.name.toLowerCase().includes(search.toLowerCase())});

  useEffect(() => {
      if (drinks) {
        setResults(drinks.length)
      }
    }, [drinks, setResults])

  if (isPending) return <span>Loading...</span>
  if (error) return <span>Fetching data failed.</span>
  
  console.log(data);
  console.log(page);
  return (
    <>
    <PageNav meta={data.meta} onPageChange={setPage}/>
    <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
      {drinks.map((drink:any) => (
        <Card key={drink.id} className="w-full max-w-sm min-w-xs gap-2">
          <CardHeader>
            <CardTitle>{drink.name}</CardTitle>
            <CardDescription>
              {drink.createdAt.split("T")[0]}
            </CardDescription>
            <CardAction>
              <Button variant="link">Fav</Button>
            </CardAction>
          </CardHeader>
          <Separator/>
          <CardContent>
            <div className="flex flex-col gap-1">
              <p className='text-gray-500'>{drink.glass}, {drink.alcoholic ? "alcohol" : "non-alcohol"}</p>
              <div className="w-full max-w-sm">
                <AspectRatio ratio={16 / 14} className="rounded-lg bg-muted">
                  <Image
                    src={drink.imageUrl}
                    alt="Photo"
                    fill
                    loading='eager'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full rounded-lg object-cover dark:brightness-20"
                    />
                </AspectRatio>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <SheetBtn drink={drink} />
          </CardFooter>
        </Card>
      ))}
    </div>
    </>
  )
}