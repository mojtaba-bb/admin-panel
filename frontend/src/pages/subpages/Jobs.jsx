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

function Jobs() {
  const data = React.useMemo(() => [
    {
      id: 1,
      title: "Frontend Developer",
      Status: "Open",
      details: "Looking for a React developer with 3+ years experience.",
      date: "2025-04-15",
    },
    {
      id: 2,
      title: "Backend Developer",
      Status: "Closed",
      details: "Experience in Node.js and PostgreSQL required.",
      date: "2025-03-18",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      Status: "Interviewing",
      details: "Strong portfolio and Figma skills needed.",
      date: "2025-04-05",
    },
  ], []);

  const columns = React.useMemo(() => [
    {
      header: "N",
      accessorKey: "rowNumber",
      cell: (info) => info.row.index + 1,
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
          Open: "bg-green-500",
          Closed: "bg-red-500",
          Interviewing: "bg-yellow-500",
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
      <nav className="h-1/12 w-full border-b border-[var(--jobsColor)] text-[var(--jobsColor)] flex items-center justify-between px-15">
        <span className='text-2xl font-bold'>Jobs</span>
        <div className='flex items-center gap-3'>
          <Link to={'/content-manager'} className='w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-[var(--jobsColor)]/10 text-[var(--jobsColor)] border border-[var(--jobsColor)] rounded-lg font-bold'>Home</Link>
          <Link to={'/'} className='w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-[var(--jobsColor)]/80 text-zinc-800 border bg-[var(--jobsColor)] rounded-lg font-bold'>Add New</Link>
        </div>
      </nav>

      <div className="p-5">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="px-4 py-2 my-4 rounded-full border border-[var(--jobsColor)] bg-zinc-900 text-[var(--jobsColor)] placeholder-[var(--jobsColor)] w-1/4"
        />

        <table className="min-w-full table-auto text-right border border-[var(--jobsColor)]/60">
          <thead className="bg-zinc-800 text-[var(--jobsColor)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-center border-l border-[var(--jobsColor)]/60 cursor-pointer select-none"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc"
                      ? " ↑"
                      : header.column.getIsSorted() === "desc"
                      ? " ↓"
                      : ""}
                  </th>
                ))}
                <th className="px-4 py-2 text-center border-l border-[var(--jobsColor)]/60">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody className="text-white/80">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-[var(--jobsColor)]/60 hover:bg-zinc-900 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-l border-[var(--jobsColor)]/60 text-left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-4 py-2 border-l border-[var(--jobsColor)]/60 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Link to={`/Jobs/${row.original.id}/edit`} className="bg-green-500 hover:bg-green-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <FiEdit />
                    </Link>
                    <Link to={`/Jobs/${row.original.id}/view`} className="bg-blue-500 hover:bg-blue-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <FaEye />
                    </Link>
                    <Link to={`/Jobs/${row.original.id}/remove`} className="bg-rose-500 hover:bg-rose-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <IoRemove />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center text-[var(--jobsColor)] pt-4">
          <div>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border border-[var(--jobsColor)] rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border border-[var(--jobsColor)] rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
