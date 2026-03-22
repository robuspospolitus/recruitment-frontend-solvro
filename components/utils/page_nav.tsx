import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}
type PageNavProps = {
  meta: Meta;
  onPageChange: (page: number) => void;
}
export function PageNav({ meta, onPageChange }: PageNavProps) {
  const { currentPage, lastPage, nextPageUrl, previousPageUrl } = meta;

  const pageNumbers: (number | "ellipsis")[] = [];

  if (lastPage <= 5) {
    for (let i = 1; i <= lastPage; i++) pageNumbers.push(i);
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, "ellipsis", lastPage);
    } else if (currentPage >= lastPage - 2) {
      pageNumbers.push(1, "ellipsis", lastPage - 2, lastPage - 1, lastPage);
    } else {
      pageNumbers.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", lastPage);
    }
  }

  return (
    <Pagination className="m-0">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={previousPageUrl || "#"}
            onClick={(e) => {
              e.preventDefault();
              if (previousPageUrl) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pageNumbers.map((p, idx) =>
          p === "ellipsis" ? (
            <PaginationItem key={idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p as number);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={nextPageUrl || "#"}
            onClick={(e) => {
              e.preventDefault();
              if (nextPageUrl) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}