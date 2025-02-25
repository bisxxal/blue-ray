"use client";
import { reveneueActionForEmp } from "@/actions/admin/revenue";
import Loader from "@/components/loader";
import { revenueTypesProps } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";

const EmpIncomePage = ({ selectedEmail }: { selectedEmail?: string }) => {
  const { data: session, status } = useSession();
  const email = selectedEmail ? selectedEmail: (session?.user?.email as string);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["fetchRevenue", selectedYear, email],
    queryFn: async () => {
      const fetchedData = await reveneueActionForEmp(
        selectedYear,
        email as string
      );
      return fetchedData;
    },
    enabled: !!email,
    staleTime: 60000,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error fetching revenue data: {error.message}</p>;

  const filteredData = data.filter((item: revenueTypesProps) => {
    const createdAt = new Date(item.createdAt);
    return (
      (!startDate || createdAt >= startDate) &&
      (!endDate || createdAt <= endDate)
    );
  });

  const allMonths = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  // Aggregate the data for revenue and job counts
  const aggregatedData = filteredData.reduce(
    (acc: any, item: revenueTypesProps) => {
      const date = new Date(item.createdAt);
      const month = date.toLocaleString("default", { month: "short" });

      // Aggregate revenue
      if (!acc[month]) {
        acc[month] = { totalAmount: 0, TotalJobsheet: 0 };
      }
      acc[month].totalAmount += item.totalAmount;

      // Aggregate total jobsheets made
      acc[month].TotalJobsheet += 1;

      return acc;
    },
    {}
  );

  const chartData = allMonths.map((month) => ({
    month: month,
    totalAmount: aggregatedData[month]?.totalAmount || 0,
    TotalJobsheet: aggregatedData[month]?.TotalJobsheet || 0,
  }));

  return (
    <div className=" w-full min-h-screen">
      <h1 className="text-3xl text-center mb-10 font-bold">Revenue</h1>

      <div className="flex justify-center gap-4 mb-6">
        <div>
          <label className="block text-lg mb-5 font-semibold">
            Select Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border inputbg bg-transparent px-6 py-2 text-lg rounded-lg"
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={730} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TotalJobsheet" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmpIncomePage;
