import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CustomPagination } from "./custom-pagination"
import { useState } from "react"


const columns = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ getValue, row }) => {
      const rank = row.getValue("rank");
      return (<div className={`center w-[28px] h-[28px] ${rank == 1 ? "first-rank-gradient text-white" : rank == 2 ? "second-rank-gradient text-white" : rank == 3 ? "third-rank-gradient text-white" : "bg-[#F5F9FE]"}  rounded-full border border-strokeNormal mx-auto`}><p className="text-xs-12 font-medium">{getValue()}</p></div>)
    },
  },
  {
    accessorKey: "name",
    header: "Student Name",
    cell: ({ row }) => {
      const name = row.getValue("name");
      const rank = row.getValue("rank");
      const avatar = row.original.profilePicture
      const userRank = row.original.userRank
      return (
        <div className="flex items-center gap-4 max-md:min-w-[200px]">
          <img src={avatar} alt={String(name || '')} className="w-6 h-6 rounded-full object-cover border border-[#EAF3FA]" />
          <div className="text-left">
            <div className="text-sm-14 font-bold">{rank === userRank ? (name + " " + "(You)") : name}</div>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "overall",
    header: "Overall Score",
    cell: ({ row }) => {
      const overall = row.getValue("overall");
      return (
        <div className="w-[87px] py-1 bg-[#F5F9FE] rounded-full mx-auto"><span className="text-base-16 font-bold">{overall}</span> <span className="max-md:hidden">/</span> <span className="text-xs-12 font-medium max-md:hidden">300</span></div>
      )
    }
  },
  {
    accessorKey: "physics",
    header: "Phy",
  },
  {
    accessorKey: "chemistry",
    header: "Chem",
  },
  {
    accessorKey: "mathematics",
    header: "Maths",
  },
  {
    accessorKey: "accuracy",
    header: "Accuracy",
    cell: ({ getValue }) => <div className="text-base-16 font-medium max-md:min-w-[70px]">{getValue() + "%"}</div>,
  },
]

const LeaderBoardTable = ({ data = [], refId, onPageScroll }) => {
  const personalScore = data.length === 1
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <>
      <div className={personalScore ? "overflow-hidden rounded-tl-[24px] rounded-tr-[24px]" : "overflow-hidden rounded-md border border-strokeLight"}>
        <Table ref={refId} onScroll={onPageScroll}>
          <TableHeader className={`${personalScore ? "hidden" : ""}`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-strokeLight bg-[#F5F9FE]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={`py-[22px] px-[16px] text-sm-14 font-medium ${header.id !== "name" ? "text-center" : ""}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows && table.getRowModel().rows.length > 0 ? (<>{
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={personalScore ? "border-strokeLight bg-[#0058C61A] rounded-tl-[24px] rounded-tr-[24px] custom-blur" : "border-strokeLight"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={` py-[18px] px-[16px] text-base-16 font-medium ${cell.column.id !== "name" ? "text-center" : ""}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
              )}
              <TableRow className={personalScore ? "hidden" : ""}>
                <TableCell colSpan={columns.length} className="py-[18px] text-center">
                  <CustomPagination table={table} />
                </TableCell>
              </TableRow>
            </>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default LeaderBoardTable