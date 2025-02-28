"use client";
import { reveneueAction } from "@/actions/admin/revenue";
import Loader from "@/components/elements/loader";
import { revenueTypesProps } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmpIncomePage from "@/app/emp/income/page";
import Refresh from "@/components/elements/refresh";

const Revenue = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string>('');
  const [showEmpIncome, setShowEmpIncome] = useState<boolean>(false);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["fetchRevenue"],
    queryFn: async () => {
      const fetchedData = await reveneueAction();
      return fetchedData;
    },
    staleTime: 100000,
  });

  if (isLoading) return <Loader />;
  if (isError) return  <Refresh data='Error while fetching data' />;;

  const filteredData = data.filter((item: revenueTypesProps) => {
    const itemDate = new Date(item.createdAt);
    return (
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate)
    );
  });

  console.log(filteredData);

  const groupedByProduct = filteredData.reduce((acc: any, item: revenueTypesProps) => {
    const { product, totalAmount } = item;
    if (acc[product]) {
      acc[product] += totalAmount; // Sum the totalAmount for the same product
    } else {
      acc[product] = totalAmount; // Add the first occurrence of the product
    }
    return acc;
  }, {});

  const revenueByProduct = Object.keys(groupedByProduct).map((product) => ({
    name: product,
    value: groupedByProduct[product],
  }));

  const revenueByAction = filteredData.reduce((acc: any, item: revenueTypesProps) => {
    item.actionTaken.forEach((action) => {
      acc[action] = (acc[action] || 0) + item.totalAmount;
    });
    return acc;
  }, {});

  const actionRevenueData = Object.keys(revenueByAction)?.map((action) => ({
    name: action,
    value: revenueByAction[action],
  }));
  




  const allMonths = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
    const aggregatedData = filteredData?.reduce(
      (acc: any, item: revenueTypesProps) => {
        const date = new Date(item.createdAt);
        const month = date.toLocaleString("default", { month: "short" });
  
        if (!acc[month]) {
          acc[month] = { totalAmount: 0, TotalJobsheet: 0 };
        }
        acc[month].totalAmount += item?.totalAmount;
  
        // Aggregate total jobsheets made
        acc[month].TotalJobsheet += 1;
  
        return acc;
      },
      {}
    );
  
    const chartData = allMonths?.map((month) => ({
      month: month,
      totalAmount: aggregatedData[month]?.totalAmount || 0,
      TotalJobsheet: aggregatedData[month]?.TotalJobsheet || 0,
    }));

    console.log("chaet",chartData)

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-7">
      <h1 className="text-3xl text-center mb-10 font-bold">Revenue</h1>

      <div className="flex justify-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border inputbg bg-transparent px-2 py-1 rounded-lg"
            dateFormat="yyyy-MM-dd"
              placeholderText="Start Date"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border inputbg bg-transparent px-2 py-1 rounded-lg"
            dateFormat="yyyy-MM-dd"
              placeholderText="End Date"
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
                // label={(entry) => `${entry.name} - ₹${entry.value}`}
                label={(entry) => `${entry.name}`}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer> :
          <p className=" text-center my-10">No data found</p>
          }
        </div>

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
                // label={(entry) => `${entry.name} - ₹${entry.value}`}
                label={(entry) => `${entry.name}`}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>:
          
          <p className=" text-center my-10">No data found</p>}
        </div>
      </div>
 
    <ResponsiveContainer width="100%" height={300}>
            <BarChart width={730} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="TotalJobsheet" fill="#8884d8" />
              <Bar dataKey="totalAmount" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
             

<button onClick={()=>setShowEmpIncome(!showEmpIncome)} className={` ${showEmpIncome? 'buttonred' :" buttongreen "} mx-auto  text-lg font-bold p-5 `}> {showEmpIncome ? 'Hide':'Show'} Employee Income </button>

{   showEmpIncome  && <div className=" w-full ">

      <h1 className=" text-4xl font-bold textbase mt-10 text-center"> Users revenue </h1>

      <div className="flex flex-col text-lg justify-center items-center my-10 gap-4 mb-6">
        <p>Selected employee</p>
      <select className=" px-6" onChange={(e)=>setSelectedEmail(e.target.value)} >
        <option value="bbgudul@gmail.com">bbgudul@gmail.com</option>
        <option value="bishalkandi859494@gmail.com">bishalkandi859494@gmail.com</option>
        <option value="bisxgugu7012@gmail.com">bisxgugu7012@gmail.com</option>
      </select>
      </div>

      <EmpIncomePage selectedEmail={selectedEmail} />
      </div> 
    }

    </div>
  );
};

export default Revenue;
