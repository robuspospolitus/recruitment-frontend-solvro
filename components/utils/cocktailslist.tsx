'use client';
import { useQuery } from '@tanstack/react-query'

type Props = {
  category?: string |null,
  search?: string
}
export default function CocktailsList({search="",category="All"}:Props) {
  const { data, isPending, error } = useQuery({
    queryKey: ['cocktails'],
    queryFn: () => fetch('https://cocktails.solvro.pl/api/v1/cocktails/').then(r => r.json()),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>Fetching data failed.</span>
  
  let drinks = data.data;
  if(category != "All"){
    drinks = data.data.filter((drink:any) => drink.category == category)
  }
  if(search) {
    drinks = drinks.filter((drink:any) => {return drink.name.toLowerCase().includes(search.toLowerCase())});
  }
  
  console.log(category);
  console.log(drinks);
  return (
    <ul>
      {drinks.map((post:any) => (
        <li key={post.id}>{post.name}</li>
      ))}
    </ul>
  )
}