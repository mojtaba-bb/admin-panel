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

function CommentTable() {
  const data = React.useMemo(() => [
    {
      id: 1,
      user: "Ali Rezai",
      userEmail: "ali.rezai@example.com",
      commentTitle: "نظر اول",
      status: "Pending",
      createdAt: "2025-04-11 12:45",
    },
    {
      id: 2,
      user: "Sara Ahmadi",
      userEmail: "s.ahmadi@example.com",
      commentTitle: "خیلی خوب بود!",
      status: "Approved",
      createdAt: "2025-04-10 09:20",
    },
    {
      id: 3,
      user: "Mohammad Karimi",
      userEmail: "karimi.m@example.com",
      commentTitle: "نیاز به ویرایش",
      status: "Rejected",
      createdAt: "2025-04-09 17:00",
    },
  ], []);

  const columns = React.useMemo(() => [
    {
      header: "N",
      accessorKey: "rowNumber",
      cell: (info) => {const n = info.row.index + 1;
        return (
          <span className="font-bold text-center flex justify-center items-center cursor-default">
            {n}
          </span>
        );
      }
    },
    {
      header: "User",
      accessorKey: "user",
    },
    {
      header: "Email",
      accessorKey: "userEmail",
    },
    {
      header: "Title",
      accessorKey: "commentTitle",
      cell: ({ getValue }) => {
        const title = getValue();
        return (
          <span className="font-bold  text-center flex justify-center items-center cursor-default">
            {title}
          </span>
        );
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        const icons = {
            Pending: "⏳",
            Approved: "✅",
            Rejected: "❌",
        }
        return (
          <span className={`text-xs px-3 py-1 rounded-full font-semibold flex justify-center gap-1 cursor-default  text-shadow-lg items-center text-white `}>
            <span>{icons[status]||""}</span><span>{status}</span>
          </span>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ getValue }) => {
        const date = new Date(getValue());
        return (
          <span className="text-xs text-zinc-400 text-center flex justify-center items-center  cursor-default">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </span>
        );
      },
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
      <nav className="h-1/12 w-full border-b border-[var(--commentsColor)] text-[var(--commentsColor)] flex items-center justify-between px-15">
        <span className='text-2xl font-bold'>Comments</span>
        <Link to={'/content-manager'} className='w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-[var(--commentsColor)]/10 text-[var(--commentsColor)] border border-[var(--commentsColor)] rounded-lg font-bold'>Home</Link>
      </nav>

      <div className="p-5">
        <input
          type="text"
          placeholder="Search comments..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="px-4 py-2 my-4 rounded-full border border-[var(--commentsColor)] bg-zinc-900 text-[var(--commentsColor)] placeholder-[var(--commentsColor)] w-1/3"
        />

        <table className="min-w-full table-auto text-right border border-[var(--commentsColor)]/60">
          <thead className="bg-zinc-800 text-[var(--commentsColor)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-center border-l border-[var(--commentsColor)]/60 cursor-pointer select-none"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc"
                      ? " ↑"
                      : header.column.getIsSorted() === "desc"
                      ? " ↓"
                      : ""}
                  </th>
                ))}
                <th className="px-4 py-2 text-center border-l border-[var(--commentsColor)]/60">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody className="text-white/80">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-[var(--commentsColor)]/60 hover:bg-zinc-900 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-l border-[var(--commentsColor)]/60 text-left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-4 py-2 border-l border-[var(--commentsColor)]/60 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Link to={`/comments/${row.original.id}`} className="bg-green-500 hover:bg-green-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <FiEdit />
                    </Link>
                    <Link to={`/comments/${row.original.id}/view`} className="bg-blue-500 hover:bg-blue-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <FaEye />
                    </Link>
                    <Link to={`/comments/${row.original.id}/remove`} className="bg-rose-500 hover:bg-rose-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <IoRemove />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center text-[var(--commentsColor)] pt-4">
          <div>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border border-[var(--commentsColor)] rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border border-[var(--commentsColor)] rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentTable;
