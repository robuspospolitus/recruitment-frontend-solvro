'use client';
import { useQuery } from '@tanstack/react-query'

export default function CocktailsList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['cocktails'],
    queryFn: () => fetch('https://cocktails.solvro.pl/api/v1/cocktails/').then(r => r.json()),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>Fetching data failed.</span>

  return (
    <ul>
      {data.data.map((post:any) => (
        <li key={post.id}>{post.name}</li>
      ))}
    </ul>
  )
}