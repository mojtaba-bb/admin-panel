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

function Meeting() {
  const data = React.useMemo(() => [
    {
      id: 1,
      user: "Ali Rezai",
      UserEmail: "ali.rezai@example.com",
      Status: "Scheduled",
      details: "Scheduled to go live next week.",
      ScheduledTime: "2025-04-12 14:30",
      Duration: "2 hours",
    },
    {
      id: 2,
      user: "Sara Ahmadi",
      UserEmail: "s.ahmadi@example.com",
      Status: "Published",
      details: "Already published with image carousel.",
      ScheduledTime: "2025-04-10 09:00",
      Duration: "1.5 hours",
    },
    {
      id: 3,
      user: "Mohammad Karimi",
      UserEmail: "karimi.m@example.com",
      Status: "Draft",
      details: "Needs review and approval.",
      ScheduledTime: "2025-04-15 16:00",
      Duration: "3 hours",
    },
  ], []);

  const columns = React.useMemo(() => [
    {
      header: "N",
      accessorKey: "rowNumber",
      cell: (info) => info.row.index + 1,
    },
    {
      header: "User",
      accessorKey: "user",
    },
    {
      header: "User Email",
      accessorKey: "UserEmail",
    },
    {
      header: "Status",
      accessorKey: "Status",
      cell: ({ getValue }) => {
        const status = getValue();
        const colorMap = {
          Scheduled: "bg-blue-500",
          Published: "bg-green-500",
          Draft: "bg-yellow-500",
        };
        return (
          <span className={`text-xs text-zinc-800 px-3 py-1 flex justify-center cursor-default rounded-full font-semibold ${colorMap[status] || "bg-gray-400"}`}>
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
      header: "Scheduled Time",
      accessorKey: "ScheduledTime",
    },
    {
      header: "Duration",
      accessorKey: "Duration",
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
      <nav className="h-1/12 w-full border-b border-[var(--chatColor)] text-[var(--chatColor)] flex items-center justify-between px-15">
        <span className='text-2xl font-bold'>Meeting</span>
        <div className='flex items-center gap-3'>
          <Link to={'/content-manager'} className='w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-[var(--chatColor)]/10 text-[var(--chatColor)] border border-[var(--chatColor)] rounded-lg font-bold'>Home</Link>
          <Link to={'/'} className='w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-[var(--chatColor)]/80 text-zinc-800 border bg-[var(--chatColor)] rounded-lg font-bold'>Add New</Link>
        </div>
      </nav>

      <div className="p-5">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="px-4 py-2 my-4 rounded-full border border-[var(--chatColor)] bg-zinc-900 text-[var(--chatColor)] placeholder-[var(--chatColor)] w-1/4"
        />

        <table className="min-w-full table-auto text-right border border-[var(--chatColor)]/60">
          <thead className="bg-zinc-800 text-[var(--chatColor)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-center border-l border-[var(--chatColor)]/60 cursor-pointer select-none"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc"
                      ? " ↑"
                      : header.column.getIsSorted() === "desc"
                      ? " ↓"
                      : ""}
                  </th>
                ))}
                <th className="px-4 py-2 text-center border-l border-[var(--chatColor)]/60">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody className="text-white/80">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-[var(--chatColor)]/60 hover:bg-zinc-900 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-l border-[var(--chatColor)]/60 text-left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-4 py-2 border-l border-[var(--chatColor)]/60 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Link to={`/Meeting/${row.original.id}`} className="bg-green-500 hover:bg-green-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <FiEdit />
                    </Link>
                    <Link to={`/Meeting/${row.original.id}/view`} className="bg-blue-500 hover:bg-blue-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <FaEye />
                    </Link>
                    <Link to={`/Meeting/${row.original.id}/remove`} className="bg-rose-500 hover:bg-rose-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <IoRemove />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center text-[var(--chatColor)] pt-4">
          <div>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border border-[var(--chatColor)] rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border border-[var(--chatColor)] rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
