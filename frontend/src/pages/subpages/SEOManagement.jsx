import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import { useState } from "react";

import { MdOutlineArrowOutward } from "react-icons/md";
Chart.register(ArcElement, Tooltip, Legend);

function SEOManagement() {
  const [SEOScore, setSEOScore] = useState(82);
  const data = {
    labels: ["Social media", "Organic search"], // نام هر بخش
    datasets: [
      {
        data: [SEOScore, 100 - SEOScore], // مقدار هر بخش
        backgroundColor: ["#7DFFCF", "#00000000"], // رنگ‌های پیشنهادی
        hoverBackgroundColor: ["#7DFFCF", "#00000000"],
        borderWidth: 0, // حذف بوردر
        borderRadius: 15, // گرد کردن لبه‌ها
        spacing: 2, // فاصله بین بخش‌ها
      },
    ],
  };
  const pagesData ={
    site:[
        {
            speed: 'fast',
        }
    ],
    datasets:
        
        [    {
            pagesCount: 12,
            pagesOptimize: 5,

        }

        ],
    warnings : [
        {
            title : "Title Tag",
            description : "The title tag is missing or too short.",
            link : "/page/1"
        },
        {
            title : "Meta Description",
            description : "The meta description is missing or too short.",
            link : "/page/2"
        },
        {
            title : "Image Alt Tags",
            description : "Some images are missing alt tags.",
            link : "/page/3"
        },
    ]
    
  }
  const [OptimizedPagePercentage, setOptimizedPagePercentage] = useState((pagesData.datasets[0].pagesOptimize/pagesData.datasets[0].pagesCount)*100);
  
  const options = {
    cutout: "80%", // نازک‌تر کردن عرض بردار
    plugins: {
      legend: {
        display: false,
      },
      tooltip: { enabled: false },
    },
  };
  return (
    <div className="bg-zinc-800 w-full h-screen flex flex-col">
      <nav className="h-1/12 w-full border-b border-[var(--SeoColor)] text-[var(--SeoColor)] flex items-center justify-between px-15">
        <span className="text-2xl font-bold">SEO Management</span>
        <div className="flex items-center gap-3">
          <Link
            to={"/content-manager"}
            className="w-32 py-2 flex justify-center items-center cursor-pointer hover:bg-[var(--SeoColor)]/10 text-[var(--SeoColor)] border border-[var(--SeoColor)] rounded-lg font-bold"
          >
            Home
          </Link>
        </div>
      </nav>
      <div className="w-full h-11/12 flex justify-center items-center gap-10">
        {
          // SEO Score
        }
        <div className="aspect-square w-3xs border-4 border-[var(--SeoColor)]  shadow-2xl bg-zinc-900 bg-none relative rounded-full p-5">
          <Doughnut data={data} options={options} />
          <div className="w-full h-full absolute rounded-full  top-1/2 left-1/2 -translate-1/2 bg-conic from-zinc-900 to-zinc-900/30 to-50%" />
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10 flex flex-col items-center justify-center">
            <span className="text-xs  cursor-default text-[var(--SeoColor)]/70  opacity-60 ">
              SEO Score
            </span>

            <span className="text-2xl font-bold cursor-default text-[var(--SeoColor)] opacity-60 ">
              {SEOScore} %
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-[var(--SeoColor)]">SEO Overview :</h1>
            <div className="grid grid-cols-3 gap-3">
                    <div className=" flex flex-col justify-between  p-3 border h-24 rounded-xl bg-zinc-900/50 border-[var(--SeoColor)]/50">
                        <h1 className="text-lg font-bold text-zinc-50">Optimize Pages :</h1>
                        <div className="bg-zinc-900 w-2xs h-[15px] rounded-full ">
                            <div style={{width : `${OptimizedPagePercentage}%`}} className="bg-linear-to-l from-cyan-500 to-blue-500  h-[15px] rounded-full"></div>
                        </div>
                    </div>
                    <div className=" flex flex-row text-lg font-bold justify-between cursor-pointer items-center p-3 pr-10 border h-24 rounded-xl bg-zinc-900/50 border-[var(--SeoColor)]/50">
                        <h1 className=" text-zinc-50">Optimize Pages :</h1>
                        <span className="text-[var(--SeoColor)]">{pagesData.warnings.length}</span>
                    </div>
                    <div className=" flex flex-row text-lg font-bold justify-between cursor-pointer items-center p-3 pr-10 border h-24 rounded-xl bg-zinc-900/50 border-[var(--SeoColor)]/50">
                        <h1 className=" text-zinc-50">Optimize Pages :</h1>
                        <span className="text-[var(--SeoColor)]">{pagesData.site[0].speed}</span>
                    </div>
            </div>
            <h1 className="text-2xl font-bold text-[var(--SeoColor)] mt-10">
            SEO Warnings :
            </h1>
            <div className="grid grid-cols-3 gap-3">
            <div className=" flex flex-row justify-between cursor-pointer  items-center p-3 border h-24 text-yellow-300 rounded-xl bg-zinc-900/50 border-[var(--SeoColor)]/50">
                    <div className="flex flex-col justify-between h-full">
                            <h1 className="text-lg font-bold ">Missing Meta Description :</h1>
                            <h3>
                                5 Pages
                            </h3>
                        </div>
                        <div className="w-10 h-10 text-yellow-300 p-2 rounded-full border border-yellow-300 flex justify-center items-center">
                            <MdOutlineArrowOutward className="block w-full h-full" />
                        </div>
                    </div>
                    <div className=" flex flex-row justify-between cursor-pointer  items-center p-3 border h-24 text-yellow-300 rounded-xl bg-zinc-900/50 border-[var(--SeoColor)]/50">
                        <div className="flex flex-col justify-between h-full">
                            <h1 className="text-lg font-bold ">Low Keyword Density :</h1>
                            <h3>
                                5 Pages
                            </h3>
                        </div>
                        <div className="w-10 h-10 text-yellow-300 p-2 rounded-full border border-yellow-300 flex justify-center items-center">
                            <MdOutlineArrowOutward className="block w-full h-full" />
                        </div>
                    </div>
                    <div className=" flex flex-row justify-between cursor-pointer  items-center p-3 border h-24 text-yellow-300 rounded-xl bg-zinc-900/50 border-[var(--SeoColor)]/50">
                        <div className="flex flex-col justify-between h-full">
                            <h1 className="text-lg font-bold ">Broken Links :</h1>
                            <h3>
                                2 Pages
                            </h3>
                        </div>
                        <div className="w-10 h-10 text-yellow-300 p-2 rounded-full border border-yellow-300 flex justify-center items-center">
                            <MdOutlineArrowOutward className="block w-full h-full" />
                        </div>
                    </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SEOManagement;
