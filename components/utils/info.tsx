import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
export function Info() {
  return (
    <Accordion type="single" collapsible className="max-w-lg mt-6">
      <AccordionItem value="api">
        <AccordionTrigger>Where are those drinks from?</AccordionTrigger>
        <AccordionContent>
            This project was made for recruitment purposes for a student science association Solvro. Here's the API: <a href="https://cocktails.solvro.pl/" target="_blank">https://cocktails.solvro.pl/</a>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="notes">
        <AccordionTrigger>Additional notes</AccordionTrigger>
        <AccordionContent>
            The application uses TanStack Query for efficient data fetching, caching, and synchronization.
            Favorites are stored locally (e.g. in LocalStorage) to persist user preferences.
            UI components are built with accessibility and consistency in mind using shadcn/ui.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}