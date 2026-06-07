"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Pagination as PaginationType } from "@/types/lead";

const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-end", totalPages] as const;
  }

  if (currentPage >= totalPages - 3) {
    return [1, "ellipsis-start", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "ellipsis-start", currentPage - 1, currentPage, currentPage + 1, "ellipsis-end", totalPages] as const;
};

export const Pagination = ({
  pagination,
  onPageChange
}: {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}) => {
  const pages = getVisiblePages(pagination.page, pagination.pages);

  return (
    <div className="flex flex-col gap-3 border-t px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing page {pagination.page} of {pagination.pages} ({pagination.total} leads)
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {pages.map((page) =>
            typeof page === "number" ? (
              <Button
                key={page}
                variant={page === pagination.page ? "default" : "outline"}
                size="icon"
                className={cn("h-8 w-8 text-xs", page === pagination.page && "pointer-events-none")}
                onClick={() => onPageChange(page)}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </Button>
            ) : (
              <span key={page} className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground">
                ...
              </span>
            )
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.pages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
