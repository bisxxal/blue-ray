// "use client";
// import { reveneueAction } from "@/actions/admin/revenue";
// import Loader from "@/components/loader";
// import { revenueTypesProps } from "@/constants";
// import { useQuery } from "@tanstack/react-query";
// import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";

// const Revenue = () => {
//   const { isLoading, isError, data, error } = useQuery({
//     queryKey: ["fetchRevenue"],
//     queryFn: async () => {
//       const fetchedData = await reveneueAction();
//       return fetchedData;
//     },
//     staleTime: 60000,
//   });

//   if (isLoading) return <Loader />;
//   if (isError) return <p>Error fetching revenue data: {error.message}</p>;

//   const revenueByProduct = data.map((item: revenueTypesProps) => ({
//     name: item.product,
//     value: item.totalAmount,
//   }));

//   const revenueByAction = data.reduce((acc: any, item: revenueTypesProps) => {
//     item.actionTaken.forEach((action) => {
//       if (acc[action]) {
//         acc[action] += item.totalAmount;
//       } else {
//         acc[action] = item.totalAmount;
//       }
//     });
//     return acc;
//   }, {});

//   const actionRevenueData = Object.keys(revenueByAction).map((action) => ({
//     name: action,
//     value: revenueByAction[action],
//   }));

//   const data01 = [
//     { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
//     { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//     { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
//     { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
//     { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
//     { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
//     { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
//   ];

//   return (
//     <div className="w-full min-h-screen ">
//       <h1 className="text-3xl text-center textbase mb-10 font-bold">Revenue</h1>

//       <div className=" w-full gap-6 flex-col flex items-center justify-center">
//         <div className=" inputbg rounded-2xl w-[90%] mx-auto ">
//           <h2 className="text-xl text-center font-semibold mt-6">
//             Revenue by Product
//           </h2>
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie
//                 data={revenueByProduct}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={0}
//                 outerRadius={110}
//                 fill="#82ca9d"
//                 label={(entry) => `${entry.name} - ₹${entry.value}`}  
//               />
             
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className=" sidebg rounded-2xl w-[90%]">
//           <h1 className="text-xl text-center font-semibold mt-6">
//             Revenue by Service
//           </h1>
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie
//                 data={actionRevenueData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={0}
//                 outerRadius={110}
//                 fill="#8884d8"
//                 label={(entry) => `${entry.name} - ₹${entry.value}`}
//               />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart
//           data={data01}
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <defs>
//             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//             </linearGradient>
//             <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip />
//           <Area
//             type="monotone"
//             dataKey="uv"
//             stroke="#8884d8"
//             fillOpacity={1}
//             fill="url(#colorUv)"
//           />
//           <Area
//             type="monotone"
//             dataKey="pv"
//             stroke="#82ca9d"
//             fillOpacity={1}
//             fill="url(#colorPv)"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Revenue;

"use client";
import { reveneueAction } from "@/actions/admin/revenue";
import Loader from "@/components/loader";
import { revenueTypesProps } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Revenue = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["fetchRevenue"],
    queryFn: async () => {
      const fetchedData = await reveneueAction();
      return fetchedData;
    },
    staleTime: 60000,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error fetching revenue data: {error.message}</p>;

  // **Filter Data Based on Date Range Selection**
  const filteredData = data.filter((item: revenueTypesProps) => {
    const itemDate = new Date(item.createdAt); // Ensure your API includes a `date` field
    return (
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate)
    );
  });

  const revenueByProduct = filteredData.map((item: revenueTypesProps) => ({
    name: item.product,
    value: item.totalAmount,
  }));

  const revenueByAction = filteredData.reduce((acc: any, item: revenueTypesProps) => {
    item.actionTaken.forEach((action) => {
      acc[action] = (acc[action] || 0) + item.totalAmount;
    });
    return acc;
  }, {});

  const actionRevenueData = Object.keys(revenueByAction).map((action) => ({
    name: action,
    value: revenueByAction[action],
  }));

  return (
    <div className="w-full min-h-screen ">
      <h1 className="text-3xl text-center mb-10 font-bold">Revenue</h1>

      {/* **Date Range Picker** */}
      <div className="flex justify-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border inputbg bg-transparent px-2 py-1 rounded-lg"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border inputbg bg-transparent px-2 py-1 rounded-lg"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

      <div className="w-full gap-6 flex-col flex items-center justify-center">
        {/* **Revenue by Product Pie Chart** */}
        <div className="inputbg rounded-2xl w-[90%] mx-auto">
          <h2 className="text-xl text-center font-semibold mt-6">
            Revenue by Product
          </h2>
          {revenueByProduct.length !== 0 ? <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={revenueByProduct}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={110}
                fill="#82ca9d"
                label={(entry) => `${entry.name} - ₹${entry.value}`}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer> :
          <p className=" text-center my-10">No data found</p>
          }
        </div>

        {/* **Revenue by Action Pie Chart** */}
        <div className="sidebg rounded-2xl w-[90%]">
          <h1 className="text-xl text-center font-semibold mt-6">
            Revenue by Service
          </h1>
          {revenueByProduct.length !== 0 ?<ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={actionRevenueData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={110}
                fill="#8884d8"
                label={(entry) => `${entry.name} - ₹${entry.value}`}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>:
          
          <p className=" text-center my-10">No data found</p>}
        </div>
      </div>
    </div>
  );
};

export default Revenue;
