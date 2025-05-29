import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { MdArrowOutward } from "react-icons/md";
import { BsEnvelopeFill } from "react-icons/bs";
import { IoCloudUpload } from "react-icons/io5";
import { FaFolder } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Tooltip as Tt } from "recharts";
Chart.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [Points, setPoints] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = {
        name: `${Points.length}`, // برای هر نقطه یه نام از تعداد قبلی می‌سازیم
        value: Math.floor(Math.random() * 100), // مقدار تصادفی بین 0 تا 100
      };

      setPoints((prevPoints) => {
        const updatedPoints = [...prevPoints, newPoint];
        if (updatedPoints.length > 10) {
          updatedPoints.shift(); // حذف اولین نقطه
        }
        return updatedPoints;
      });
    }, 10000);
    // پاک کردن تایمر وقتی کامپوننت از صفحه خارج میشه
    return () => clearInterval(interval);
  }, [Points]);

  const data = {
    labels: ["Social media", "Organic search"], // نام هر بخش
    datasets: [
      {
        data: [60, 100], // مقدار هر بخش
        backgroundColor: ["#FF851B", "#001F3F"], // رنگ‌های پیشنهادی
        hoverBackgroundColor: ["#FF851B", "#001F3F"],
        borderWidth: 0, // حذف بوردر
        borderRadius: 15, // گرد کردن لبه‌ها
        spacing: 2, // فاصله بین بخش‌ها
      },
    ],
  };

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
    <div className="w-full h-screen ">
      <nav className="h-1/12 text-2xl font-bold border-b border-yellow-200 text-yellow-200 flex items-center  px-15">
        Dashboard
      </nav>

      <div className=" h-11/12 w-auto flex justify-center items-center">
        <div className=" w-max h-max grid grid-cols-2 md:grid-cols-3 gap-4 p-4 place-items-cente justify-items-center justify-center items-center">
          {
            // ترافیک وبسایت
          }
          <div className=" w-72 h-72 rounded-3xl flex flex-col justify-around items-center bg-yellow-200 shadow shadow-black">
            <h1 className="text-sm font-bold w-10/12 text-zinc-800">
              Website Traffic
            </h1>
            <div className="w-36 h-36 flex items-center justify-center relative">
              <Doughnut data={data} options={options} />
              <div className="absolute  font-bold text-zinc-800">
                Total: {data.datasets[0].data.reduce((a, b) => a + b, 0)}
              </div>
            </div>
            <div className="w-10/12">
              <span className="flex items-center mx-1 gap-2">
                <div className="w-3 h-3 rounded-[2px] aspect-square bg-[#FF851B]" />{" "}
                <span className="text-xs">{data.labels[0]}</span>
              </span>
              <div className="w-full h-[1px] my-1  bg-black/15" />
              <span className="flex items-center mx-1 gap-2">
                <div className="w-3 h-3 rounded-[2px] aspect-square bg-[#001F3F]" />{" "}
                <span className="text-xs">{data.labels[1]}</span>
              </span>
            </div>
          </div>

          <div className=" w-72 h-72  rounded-3xl  bg-zinc-900 flex flex-col justify-center gap-3  items-center shadow shadow-black">
              <div className="relative w-fit">
                <FaFolder className="w-28 h-max aspect-square text-yellow-600 " />
                <div className="w-[110px] h-22 bg-yellow-400 rounded-xl shadow shadow-zinc-900 absolute top-0 translate-y-[18px] right-0"/>
                <IoGrid className=" w-11 h-11 absolute -bottom-0 -right-1 rounded bg-zinc-900 p-1 text-yellow-200"/>
              </div>
              <h1 className="text-yellow-200 text-center text-2xl font-bold cursor-default">
                Content Manager
              </h1>
              <Link to={'/'} className="text-zinc-900  font-bold bg-yellow-200 px-3 py-2 rounded text-center hover:bg-yellow-200/90 transition-all duration-200 ease-in-out">
                Pages Contetnt
              </Link>
          </div>

          {
            // تغییرات چند روز اخیر
          }
          <div className=" w-72 h-72 rounded-3xl p-4 bg-zinc-300 flex flex-col justify-around items-center shadow shadow-black">
            <div className="flex items-center justify-between w-full ">
              <h1 className="text-xl font-bold text-zinc-800">Daily Traffic</h1>
              <Link
                to={"/"}
                className={` flex aspect-square w-10  bg-zinc-700 text-lime-50 justify-center items-center rounded-full `}
              >
                <MdArrowOutward className="block w-8/12 h-8/12" />
              </Link>
            </div>
            <div className="h-28 w-full  grid grid-cols-3 gap-3">
              <div className="bg-zinc-300 border border-zinc-400 rounded-xl flex justify-center flex-col items-center ">
                <h1 className="text-zinc-600 text-2xl ">Mon</h1>
                <h3 className="text-zinc-800 text-xl ">3</h3>
              </div>

              <div className="bg-yellow-200 rounded-xl flex justify-center flex-col items-center ">
                <h1 className="text-zinc-600 text-2xl ">Tue</h1>
                <h3 className="text-zinc-800 text-xl ">5</h3>
              </div>
              <div className="bg-zinc-300 border border-zinc-400 rounded-xl flex justify-center flex-col items-center ">
                <h1 className="text-zinc-600 text-xl ">Wed</h1>
                <h3 className="text-zinc-800 text-lg font-bold ">4</h3>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-semibold text-cyan-800">+10 %</span>
              <span className="block h-10 w-[1px] bg-zinc-800 mx-3" />
              <span className="text-zinc-800">From Last Modification</span>
            </div>
          </div>

          {
            // آخرین پیام
          }
          <div className=" w-72 h-72 rounded-3xl  bg-zinc-900 p-4 flex flex-col justify-between shadow shadow-black">
            <div className=" flex items-center gap-3">
              <div className="relative text-yellow-200 w-fit">
                <BsEnvelopeFill className=" w-8 h-max " />
                <div className="w-2 aspect-square bg-red-400 rounded-full absolute top-[4px] right-[0px] outline-2  outline-zinc-900" />
              </div>
              <h1 className="text-yellow-200">Latest Message</h1>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <h3 className="text-yellow-200 text-sm font-bold">
                  Name : <span className="text-yellow-50 font-medium">Ali</span>
                </h3>
              </p>
              <p>
                <h3 className="text-yellow-200 text-sm font-bold">
                  Message :{" "}
                  <span className="text-yellow-50 font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis iusto suscipit cupiditate architecto
                    necessitatibus ...
                  </span>
                </h3>
              </p>
              <div className="flex items-center justify-around w-full mt-3">
                <Link
                  to={"/"}
                  className="bg-yellow-200 text-zinc-800 rounded text-center px-3 py-2 text-sm font-bold flex items-center justify-center gap-2 w-5/12 hover:bg-yellow-200/90 transition-all duration-200 ease-in-out"
                >
                  <span>Read more</span>
                </Link>
                <Link
                  to={"/"}
                  className="border-yellow-200 border text-yellow-200 rounded text-center px-3 py-2 text-sm font-bold flex items-center justify-center gap-2 w-5/12 hover:bg-yellow-200/15 transition-all duration-200 ease-in-out"
                >
                  <span>Download</span>
                </Link>
              </div>
            </div>
            <div></div>
          </div>

          {
            // آپلود رزومه
          }
          <div className=" w-72 h-72 rounded-3xl bg-white flex flex-col justify-center gap-3  items-center shadow shadow-black">
            <IoCloudUpload className="h-24 w-24 block text-gray-400" />
            <h1 className="text-xl font-bold text-gray-400 cursor-default">
              Upload Resume
            </h1>

            <Link
              to={"/"}
              className=" border border-zinc-800/30 text-zinc-800/80 rounded text-center px-3 py-2 text-sm font-bold flex items-center justify-center gap-2 w-5/12 hover:bg-zinc-800/10 transition-all duration-200 ease-in-out"
            >
              <span>Upload</span>
            </Link>
            <Link className="text-cyan-500 text-sm font-bold flex items-center justify-center gap-2 w-5/12 hover:text-cyan-800 hover:underline transition-all duration-200 ease-in-out">
              resume.pdf
            </Link>
          </div>

          {
            // ترافیک زنده
          }
          <div className=" w-72 h-72 rounded-3xl  bg-zinc-900 flex flex-col gap-3 shadow shadow-black">
            <div className="flex items-center  gap-3 w-full p-4 text-yellow-200">
              <FaUsers className="w-8 h-8 " />
              <h1 className="text-lg cursor-default">Real-Time Traffic</h1>
            </div>

            <div className="relative w-full  flex justify-center items-center">
              <ResponsiveContainer
                width={"90%"}
                height={150}
                className="relative "
              >
                <LineChart data={Points}>
                  <CartesianGrid
                    stroke="#333"
                    strokeDasharray="2 2"
                  
                  />{" "}
                  {/* شبکه چهارخونه‌ای */}
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tt
                    contentStyle={{
                      backgroundColor: "#1f1f1f",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#ffd700" }}
                  />
                  <Line
                    type="linear"
                    dataKey="value"
                    stroke="#fff085"
                    strokeWidth={2}
                    dot={false}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="absolute w-[90%] bg-gradient-to-r from-zinc-900  to-indigo-600/0 h-full top-0 pointer-events-none "> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
