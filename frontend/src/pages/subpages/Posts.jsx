import React from 'react';
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import { FiEdit } from 'react-icons/fi';
import { FaEye } from "react-icons/fa";
import { IoRemove } from "react-icons/io5";

function Posts() {
  const data = React.useMemo(() => [
    {
      id: 1,
      title: "How to Improve SEO",
      Status: "Published",
      details: "Lorem ipsum dolor sit amet...",
      date: "2025-04-10",
    },
    {
      id: 2,
      title: "10 Tips for Better UX Design",
      Status: "Draft",
      details: "Sed ut perspiciatis unde omnis...",
      date: "2025-03-22",
    },
    {
      id: 3,
      title: "Why Performance Matters in Web Apps",
      Status: "Scheduled",
      details: "At vero eos et accusamus...",
      date: "2025-05-01",
    },
  ], []);

  const columns = React.useMemo(() => [
    {
      header: "N",
      accessorKey: "rowNumber",
      cell: (info) => {
        const n = info.row.index + 1
      return (
          <span className="font-bold text-center flex justify-center items-center cursor-default">
            {n}
          </span>
        );
      }
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Status",
      accessorKey: "Status",
      cell: ({ getValue }) => {
        const status = getValue();
        const statusMap = {
          Published: "bg-green-500",
          Draft: "bg-yellow-500",
          Scheduled: "bg-blue-500",
        };
        return (
          <span className={`text-xs text-zinc-800 px-3 py-1 flex justify-center cursor-default rounded-full font-semibold ${statusMap[status] || "bg-gray-400"}`}>
            {status}
          </span>
        );
      },
    },
    {
      header: "Details",
      accessorKey: "details",
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ getValue }) => {
        const date = new Date(getValue());
        return (
          <span className="text-xs text-zinc-400 text-center flex justify-center items-center  cursor-default">
            {date.toLocaleDateString()}
          </span>
        );
      }
    },
  ], []);

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
    <div className='bg-zinc-800 w-full h-screen flex flex-col'>
      <nav className="h-1/12 w-full border-b border-[var(--postsColor)] text-[var(--postsColor)] flex items-center justify-between px-15">
        <span className='text-2xl font-bold'>Posts</span>
        <div className='flex items-center gap-3'>
          <Link to={'/content-manager'} className='w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-rose-500/10 text-rose-500 border border-rose-500 rounded-lg font-bold'>Home</Link>
          <Link to={'/content-manager/posts/add-post'} className='w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-[var(--postsColor)]/80 text-zinc-800 border bg-[var(--postsColor)] rounded-lg font-bold'>Add New</Link>
        </div>
      </nav>

      <div className="p-5">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="px-4 py-2 my-4 rounded-full border border-[var(--postsColor)] bg-zinc-900 text-[var(--postsColor)] placeholder-[var(--postsColor)] w-1/4"
        />

        <table className="min-w-full table-auto text-right border border-[var(--postsColor)]/60">
          <thead className="bg-zinc-800 text-[var(--postsColor)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-center border-l border-[var(--postsColor)]/60 cursor-pointer select-none"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc"
                      ? " ↑"
                      : header.column.getIsSorted() === "desc"
                      ? " ↓"
                      : ""}
                  </th>
                ))}
                <th className="px-4 py-2 text-center border-l border-[var(--postsColor)]/60">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody className="text-white/80">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-[var(--postsColor)]/60 hover:bg-zinc-900 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-l border-[var(--postsColor)]/60 text-left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-4 py-2 border-l border-[var(--postsColor)]/60 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Link to={`/Posts/${row.original.id}/edit`} className="bg-green-500 hover:bg-green-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <FiEdit />
                    </Link>
                    <Link to={`/Posts/${row.original.id}/view`} className="bg-blue-500 hover:bg-blue-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <FaEye />
                    </Link>
                    <Link to={`/Posts/${row.original.id}/remove`} className="bg-rose-500 hover:bg-rose-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <IoRemove />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center text-[var(--postsColor)] pt-4">
          <div>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border border-[var(--postsColor)] rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border border-[var(--postsColor)] rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
