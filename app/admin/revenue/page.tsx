'use client'
import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const Revenue = () => {
  const data = [
    { "name": "Page A", "uv": 4000, "pv": 2400, "amt": 2400 },
    { "name": "Page B", "uv": 3000, "pv": 1398, "amt": 2210 },
    { "name": "Page C", "uv": 2000, "pv": 9800, "amt": 2290 },
    { "name": "Page D", "uv": 2780, "pv": 3908, "amt": 2000 },
    { "name": "Page E", "uv": 1890, "pv": 4800, "amt": 2181 },
    { "name": "Page F", "uv": 2390, "pv": 3800, "amt": 2500 },
    { "name": "Page G", "uv": 3490, "pv": 4300, "amt": 2100 }
  ];
  const data01 = [
    { "name": "Group A", "value": 400 },
    { "name": "Group B", "value": 300 },
    { "name": "Group C", "value": 300 },
    { "name": "Group D", "value": 200 },
    { "name": "Group E", "value": 278 },
    { "name": "Group F", "value": 189 }
  ];
  const data02 = [
    { "name": "Group A", "value": 2400 },
    { "name": "Group B", "value": 4567 },
    { "name": "Group C", "value": 1398 },
    { "name": "Group D", "value": 9800 },
    { "name": "Group E", "value": 3908 },
    { "name": "Group F", "value": 4800 }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className=" text-xl font-bold">Revenue</h1>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>

      {/* PieChart inside ResponsiveContainer */}
      
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          {/* <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" /> */}
          <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={0} outerRadius={80} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Revenue;
