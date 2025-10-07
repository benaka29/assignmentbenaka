import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination"
import { getPaginationRange } from "@/lib/utils"
import { Button } from "./ui/button";

export function CustomPagination({ table }) {

  let totalPages = table.getPageCount().toLocaleString()
  let currentPage = table.getState().pagination.pageIndex + 1;
  let pageNumbers = getPaginationRange(totalPages, currentPage);

  return (
    <Pagination >
      <PaginationContent>
        <PaginationItem>
          <Button className={`rounded-full border border-[#D2DFEB] text-sm-12 `} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} >Previous</Button>
        </PaginationItem>
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`page-${page}`}>
              <PaginationEllipsis className='rounded-full border border-[#D2DFEB] text-sm-12 w-[34px] h-[34px] flex items-center justify-center p-0' />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${page}`}>
              <Button className={`rounded-full border border-[#D2DFEB] text-sm-12 w-[34px] h-[34px] flex items-center justify-center p-0 ${page === currentPage ? "bg-[#432DD7] text-white" : ""}`} onClick={() => table.setPageIndex(page - 1)}  >{page}</Button>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <Button className={`rounded-full border border-[#D2DFEB] text-sm-12`} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}> Next</Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
