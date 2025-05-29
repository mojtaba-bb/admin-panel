import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiGrid, FiList, FiPlus } from "react-icons/fi";

const files = [
  {
    name: "Nature",
    size: "3Mb",
    date: "2024-03-01",
    tag: "Nature",
    src: "/images/nature.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  {
    name: "Dog",
    size: "2Mb",
    date: "2024-03-02",
    tag: "Animal",
    src: "/images/dog.jpg",
  },
  // more files...
];

export default function MediaLibrary() {
  const [selected, setSelected] = useState(null);
  const [layout, setLayout] = useState("grid");

  return (
    <div className="flex h-screen w-full bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/4 border-r border-[var(--mediaColor)] p-4 space-y-4 bg-zinc-800/75">
        <h2 className="text-xl font-bold">Preview :</h2>
        {selected ? (
          <div>
            <img
              src={selected.src}
              className="w-full h-48 object-cover rounded-lg mb-4"
              alt={selected.name}
            />
            <div className="space-y-1 text-sm text-zinc-300">
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Tag:</strong> {selected.tag}</p>
              <p><strong>Size:</strong> {selected.size}</p>
              <p><strong>Date:</strong> {selected.date}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button>Edit</Button>
              <Button variant="outline">Download</Button>
            </div>
          </div>
        ) : (
          <p className="text-zinc-400">Select a file to preview</p>
        )}
      </aside>

      {/* Main Area */}
      <main className="flex-1  space-y-4 overflow-auto">
        {/* Header */}
      <nav className="h-1/12 w-full border-b border-[var(--mediaColor)] text-[var(--mediaColor)] flex items-center justify-between px-15">
        <span className='text-2xl font-bold'>Comments</span>
        <div className='flex items-center gap-3'>
        <Link to={'/content-manager'} className='w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-[var(--mediaColor)]/10 text-[var(--mediaColor)] border border-[var(--mediaColor)] rounded-lg font-bold'>Home</Link>
        <Link to={'/'} className=' w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-[var(--mediaColor)]/80 text-zinc-800 border bg-[var(--mediaColor)] rounded-lg font-bold'>Upload</Link>
        </div>
      </nav>

        {/* Filter & Layout Switch */}
        <div className="flex p-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-zinc-800 border border-[var(--mediaColor)] outline-none px-3 py-1 rounded w-64"
          />
          <div className="space-x-2">
            <button
              size="icon"
              variant={layout === "grid" ? "default" : "outline"}
              className={"cursor-pointer border border-zinc-600 rounded p-2 " + (layout === "grid" ? "bg-white/10" : "")}
              onClick={() => setLayout("grid")}
            >
              <FiGrid />
            </button>
            <button
              size="icon"
              className={"cursor-pointer border border-zinc-600 rounded p-2 " + (layout === "list" ? "bg-white/10" : "")}
              onClick={() => setLayout("list")}
            >
              <FiList />
            </button>
          </div>
        </div>

        {/* Files */}
        <div className={`p-4 ${layout === "grid" ? "grid grid-cols-4 gap-4" : "space-y-2"}`}>
          {files.map((file, i) => (
            <div
              key={i}
              onClick={() => setSelected(file)}
              className={`cursor-pointer rounded overflow-hidden bg-zinc-800 hover:ring-2 ring-[var(--mediaColor)] ${
                layout === "list" ? "flex items-center p-2" : ""
              }`}
            >
              <img
                src={file.src}
                className={layout === "grid" ? "w-full h-32 object-cover" : "w-20 h-20 object-cover rounded mr-4"}
                alt={file.name}
              />
              {layout === "list" && (
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-zinc-400">{file.tag} • {file.size}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
