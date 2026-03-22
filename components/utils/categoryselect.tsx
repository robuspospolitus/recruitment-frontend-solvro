'use client';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from "react";

type Props = {
    value: string|null,
    setValue: Dispatch<SetStateAction<string|null>>,
}

export function CategorySelect({value, setValue}:Props) {
    const { data, isPending, error } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('https://cocktails.solvro.pl/api/v1/cocktails/categories/').then(r => r.json()),
    })
    if (isPending) return <span>Loading...</span>
    if (error) return <span>Fetching data failed.</span>
    console.log(value)

    return (
        <Combobox items={data.data} onValueChange={setValue}>
            <ComboboxInput value={value || "All"} onChange={(e) => setValue(e.target.value)} placeholder="Select a framework" />
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    <ComboboxItem value="All"> All </ComboboxItem>
                    {data.data.map((item:any) => (
                        <ComboboxItem key={item} value={item}>
                        {item}
                        </ComboboxItem>
                    ))}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}