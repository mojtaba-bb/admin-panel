import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { CiRedo } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";

function History() {
  const data = React.useMemo(
    () => [
      {
        id: 1,
        title: "How to Improve SEO",
        details: "لورم ایپسوم متن ساختگی برای توضیحات",
        date: "2025-04-10",
      },
      {
        id: 2,
        title: "Edit Post",
        details: "ویرایش پست انجام شده برای سئو",
        date: "2025-04-09",
      },
      {
        id: 3,
        title: "New Post",
        details: "یک پست جدید برای تجربه کاربری",
        date: "2025-04-08",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        header: "#",
        accessorKey: "rowNumber",
        cell: (info) => info.row.index + 1,
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Details",
        accessorKey: "details",
      },
      {
        header: "Date",
        accessorKey: "date",
      },
    ],
    []
  );

  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full h-screen  space-y-6 bg-zinc-900 text-yellow-200">
      <nav className="h-1/12 text-2xl font-bold border-b border-yellow-200 text-yellow-200 flex items-center  px-15">
        <span>History</span>
      </nav>

      <div className="flex flex-col w-full px-4 py-2 space-y-4 overflow-hidden">
      <input
        type="text"
        placeholder="Search..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="px-4 py-2 ml-6 rounded border border-yellow-200 bg-zinc-800 placeholder-yellow-400 w-1/2"
      />

      <table className="min-w-full table-auto border border-yellow-200/40 text-right ">
        <thead className="bg-zinc-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-4 py-2 border-l border-yellow-200/40 text-center cursor-pointer"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc"
                    ? " ↑"
                    : header.column.getIsSorted() === "desc"
                    ? " ↓"
                    : ""}
                </th>
              ))}
              <th className="px-4 py-2 border-l border-yellow-200/40 text-center">Action</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-yellow-200/40 hover:bg-zinc-800 transition"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 border-l border-yellow-200/30">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="px-4 py-3 text-center border-l border-yellow-200/30">
                <div className="flex justify-center gap-2">
                  <Link
                    to={`/history/${row.original.id}`}
                    title="View"
                    className="bg-green-500 text-zinc-900 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <GoArrowUpRight />
                  </Link>
                  <Link
                    to={`/history/${row.original.id}/edit`}
                    title="Redo"
                    className="bg-yellow-500 text-zinc-900 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <CiRedo />
                  </Link>
                  <Link
                    to={`/history/${row.original.id}/remove`}
                    title="Delete"
                    className="bg-red-500 text-zinc-900 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <BsPlusLg className="rotate-45" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center pt-4 text-yellow-200">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border border-yellow-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border border-yellow-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
        </div>
    </div>
  );
}

export default History;
