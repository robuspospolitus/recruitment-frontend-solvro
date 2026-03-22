'use client';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Dispatch, SetStateAction } from "react"

type Props = {
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    res?: number
}

export function SearchBar({value, setValue, res=0}:Props) {
    return (
        <InputGroup className="max-w-xs my-5">
            <InputGroupInput id="searchbar-id" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search..." />
            <InputGroupAddon align="inline-end">{res} results</InputGroupAddon>
        </InputGroup>
    )
}