import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages, siblingCount);

  return (
    <div className="flex items-center justify-between gap-4 py-6">
      <p className="text-xs text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-2 w-2" />
        </Button>

        {pages.map((page, i) =>
          page === "..." ? (
            <span
              key={i}
              className="px-1 text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              size="icon"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </Button>
          )
        )}

        {/* Next */}
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="h-2 w-2" />
        </Button>
      </div>
    </div>
  );
}

/* ---------------------------------- */

function getPageNumbers(
  current: number,
  total: number,
  siblingCount: number
): (number | "...")[] {
  const range: (number | "...")[] = [];

  const left = Math.max(1, current - siblingCount);
  const right = Math.min(total, current + siblingCount);

  if (left > 1) {
    range.push(1);
    if (left > 2) range.push("...");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total) {
    if (right < total - 1) range.push("...");
    range.push(total);
  }

  return range;
}
