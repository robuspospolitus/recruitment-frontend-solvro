import { Button } from "@/components/ui/button"
import { Badge } from "../ui/badge"
import { useQuery } from "@tanstack/react-query"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
    drink: any
}

export function SheetBtn({drink}:Props) {
    const { data, isPending, error } = useQuery({
        queryKey: [`${drink.name}-${drink.id}`],
        queryFn: () => fetch(`https://cocktails.solvro.pl/api/v1/cocktails/${drink.id}`).then(r => r.json()),
    })
    if (isPending) return <span>Loading...</span>
    if (error) return <span>Fetching data failed.</span>
    
    return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="submit" className="w-full my-2">
            View full recipe 
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
            <SheetTitle>{drink.name ?? "Drink"} recipe</SheetTitle>
            <SheetDescription></SheetDescription>
            <div className="flex w-full flex-wrap justify-center gap-2 ">
                <Badge>{drink.category}</Badge>
                <Badge variant="secondary">{drink.glass}</Badge>
                <Badge variant="destructive">{drink.alcoholic ? "alcohol" : "non-alcohol"}</Badge>
            </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-auto">
          <Ingredients data={data.data}/>
          <div className="grid gap-3">
            {drink.instructions}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    ) 
}

function Ingredients(data:any) {
    return (
        <Table>
        <TableCaption>Table of all ingredients</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.data.ingredients.map((ingredient:any) => (
            <TableRow key={ingredient.id}>
                <TableCell><HoverName data={ingredient}/></TableCell>
                <TableCell className="text-right">{ingredient.measure ?? ""}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        <TableFooter>
            <TableRow>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell className="text-right">{data.data.ingredients.length} ingredients</TableCell>
            </TableRow>
        </TableFooter>
        </Table>
    );
}

function HoverName(data:any) {
    return (
        <Dialog>
        <form  className="max-h-screen">
            <DialogTrigger asChild>
            <Button variant="link">{data.data.name}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl">
                <DialogHeader className="" style={{maxHeight: "70vh"}}>
                    <DialogTitle>{data.data.name}</DialogTitle>
                    <DialogDescription className="overflow-auto">
                        {data.data.description ?? "There is no description"}
                    </DialogDescription>
                </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
            </DialogFooter>
            </DialogContent>
        </form>
        </Dialog>
    )
}
