import React from "react";
import { Link } from "react-router-dom";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { MdPermMedia } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
function ContentManager() {
  return (
    <div className="w-full h-screen ">
      <nav className="h-1/12 text-2xl font-bold border-b border-yellow-200 text-yellow-200 flex items-center  px-15">
        Content Manager
      </nav>
      <div className=" h-11/12 w-auto flex justify-center items-center">
        <div className=" w-max h-max grid grid-cols-2 md:grid-cols-3 gap-4 p-4 place-items-cente justify-items-center justify-center items-center">
          <div className=" w-78 h-72 bg-zinc-700 text-[var(--postsColor)] rounded-3xl border-black border flex flex-col justify-center items-center p-5 gap-2">
            <div className="w-24 h-24 border-4 border-[var(--postsColor)] rounded-full p-5">
              <IoDocumentAttachSharp className="w-full h-full " />
            </div>
            <h1 className=" text-2xl font-bold">Posts</h1>
            <span className="text-xs opacity-60">
              Manage your published posts and drafts
            </span>
            <div className="flex w-full justify-center gap-3">
              <Link
                to={"/content-manager/posts"}
                className="text-sm h-10 flex items-center justify-center  text-center border font-bold px-4 py-2 rounded-lg w-5/12  mt-2 hover:bg-[var(--postsColor)]/10 "
              >
                List
              </Link>
              <Link
                to={"/content-manager/posts/add-post"}
                className="text-zinc-700 text-sm bg-[var(--postsColor)] text-center border font-bold px-4 py-2 rounded-lg w-5/12 h-10 flex items-center justify-center mt-2 hover:bg-[var(--postsColor)]/80 "
              >
                Add new
              </Link>
            </div>
          </div>

          <div className=" w-78 h-72 bg-zinc-700 text-[var(--SeoColor)] rounded-3xl border-black border flex flex-col justify-center items-center p-5 px-1 gap-2">
            <div className="w-24 h-24 border-4 border-[var(--SeoColor)] rounded-full p-5">
              <IoStatsChart className="w-full h-full " />
            </div>
            <h1 className=" text-2xl font-bold">SEO Management</h1>
            <span className="text-xs opacity-60">
              Optimize your pages for better SEO performance
            </span>
            <div className="flex w-full justify-center gap-3">
              <Link
                to={"/content-manager/SEO"}
                className="text-xs text-center border font-bold px-4 py-2 rounded-lg w-5/12 h-10 flex items-center justify-center mt-2 hover:bg-[var(--SeoColor)]/10 "
              >
                Optimize Now
              </Link>
              <Link
                to={"/"}
                className="text-zinc-700 text-xs bg-[var(--SeoColor)] text-center border font-bold px-4 py-2 rounded-lg w-5/12 h-10 flex items-center justify-center mt-2 hover:bg-[var(--SeoColor)]/80 "
              >
                SEO Score : 85%
              </Link>
            </div>
          </div>

          {
            //Media Manager
          }

          <div className=" w-78 h-72 bg-zinc-700 text-[var(--mediaColor)] rounded-3xl border-black border flex flex-col justify-center items-center p-5 gap-2">
            <div className="w-24 h-24 border-4 border-[var(--mediaColor)] rounded-full p-5">
              <MdPermMedia className="w-full h-full " />
            </div>
            <h1 className=" text-2xl font-bold">Media Manager</h1>
            <span className="text-xs opacity-60">
              Manage images, videos, and media files
            </span>
            <div className="flex w-full justify-center gap-3">
              <Link
                to={"/content-manager/media"}
                className="text-sm h-10 flex items-center justify-center  text-center border font-bold px-4 py-2 rounded-lg w-5/12  mt-2 hover:bg-[var(--mediaColor)]/10 "
              >
                Library
              </Link>
              <Link
                to={"/"}
                className="text-zinc-700 text-sm bg-[var(--mediaColor)] text-center border font-bold px-4 py-2 rounded-lg w-5/12 h-10 flex items-center justify-center mt-2 hover:bg-[var(--mediaColor)]/80 "
              >
                Upload
              </Link>
            </div>
          </div>
          {
            // Live Chat
          }

          <div className=" w-78 h-72 bg-zinc-700 text-[var(--chatColor)] rounded-3xl border-black border flex flex-col justify-center items-center p-5 px-1 gap-2">
            <div className="w-24 h-24 border-4 border-[var(--chatColor)] rounded-full p-5">
              <RiCalendarScheduleFill className="w-full h-full " />
            </div>
            <h1 className=" text-2xl font-bold">Live Chat (Scheduled)</h1>
            <span className="text-xs opacity-60">
              Communicate with users at a specific scheduled time
            </span>
            <div className="flex w-full justify-center gap-3">
              <Link
                to={"/content-manager/metting"}
                className="text-xs h-10 flex items-center justify-center  text-center border font-bold px-4 py-2 rounded-lg w-5/12  mt-2 hover:bg-[var(--chatColor)]/10 "
              >
                Schedule Chat
              </Link>
              <Link
                to={"/content-manager/metting"}
                className="text-zinc-700 text-xs bg-[var(--chatColor)] text-center border font-bold px-4 py-2 rounded-lg w-5/12 h-10 flex items-center justify-center mt-2 hover:bg-[var(--chatColor)]/80 "
              >
                Session List
              </Link>
            </div>
          </div>
          {
            // comments
          }

          <div className=" w-78 h-72 bg-zinc-700 text-[var(--commentsColor)] rounded-3xl border-black border flex flex-col justify-center items-center p-5 gap-2">
            <div className="w-24 h-24 border-4 border-[var(--commentsColor)] rounded-full p-5">
              <FaCommentDots className="w-full h-full " />
            </div>
            <h1 className=" text-2xl font-bold">Comments</h1>
            <span className="text-xs opacity-60">Manage user comments</span>
            <div className="flex w-full justify-center gap-3">
              <Link
                to={"/content-manager/comments"}
                className="text-sm h-10 flex items-center justify-center  text-center border font-bold px-4 py-2 rounded-lg w-5/12  mt-2 hover:bg-[var(--commentsColor)]/10 "
              >
                List
              </Link>
              <span className="text-zinc-700 text-sm cursor-default bg-[var(--commentsColor)] text-center border font-bold px-4 py-2 rounded-lg w-5/12 h-10 flex items-center justify-center mt-2  ">
                5 Comment
              </span>
            </div>
          </div>
          {
            // Jobs
          }
          <div className=" w-78 h-72 bg-zinc-700 text-[var(--jobsColor)] rounded-3xl border-black border flex flex-col justify-center items-center p-5 gap-2">
            <div className="w-24 h-24 border-4 border-[var(--jobsColor)] rounded-full p-5">
              <BsBriefcaseFill className="w-full h-full " />
            </div>
            <h1 className=" text-2xl font-bold">Jobs</h1>
            <span className="text-xs opacity-60">
              Manage job offers and proposals received
            </span>
            <div className="flex w-full justify-center gap-3">
              <Link
                to={"/content-manager/jobs"}
                className="text-sm h-10 flex items-center justify-center  text-center border font-bold px-4 py-2 rounded-lg w-5/12  mt-2 hover:bg-[var(--jobsColor)]/10 "
              >
                Tracking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentManager;
