// "use client";
// import { AllJobSheetAction, VerifyJobSheet } from "@/actions/admin/adminform";
// import { JOBsheetProps, PropsAuth } from "@/constants";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import React from "react";
// import toast from "react-hot-toast";
// import Loader from "./loader";
// import moment from "moment";
 
// const AllJobSheet = ({ role , emp }: { role: "admin" | "emp" ,emp?:PropsAuth }) => {
//   const router = useRouter();
//   const { isLoading, isError, data, error } = useQuery({
//     queryKey: ["fetchjob"],
//     queryFn: async () => {
//       const data = await AllJobSheetAction();
//       return data;
//     },
//     staleTime: 2000,
//   });

//   const verifyFunction = async(id: string , verified:string , callClosed:string) => {
//     console.log(id , callClosed , verified);
//     const res = await VerifyJobSheet(id , callClosed , verified);
   
//     if (res?.status === 200){
//       if(verified === 'true'){
//         toast.success("JobSheet Verified");
//       }
//       if(callClosed === 'true'){
//         toast.success("JobSheet Closed");
//       }

//       router.refresh();
//     };
//     if(res?.status === 404){
//       toast.error("Error");
//     }
  
//   };

//   console.log(emp?.email , emp?.city)
//   if (isLoading)
//     return (<Loader/>);

//   return (
//     <div className=" w-full min-h-screen px-10 bg-re d-500">
//       <h1 className=" text-center text-2xl font-bold mb-10">All Job Sheets</h1>

//       <div className="border-2 w-[2200px] inputbg border-[#80808056] p-3 rounded-lg overflow-x-scroll bg-gre en-300 ">
//         <div className=" grid grid-cols-12 gap-5 mb-5 border-[#80808056] border-b-2 pb-3">
//           <p>id</p>
//           {role === "admin" && <p>Made By</p>}
//           <p>circle</p>
//           <p>Division</p>
//           <p>product</p>
//           <p>serial</p>
//           <p>modelno</p>
//           <p>created date</p>
//           <p>Visted date</p>
//           <p>Call Closed</p>
//           <p>Amount</p>
//           <p>Verified</p>
//           <p>PDF</p>
//         </div>

//         {role === "emp" &&data &&data?.filter(
//               (job: JOBsheetProps) =>
//                 job.madeBy === emp?.email 
//               &&   job.circle === emp.city
//             )
//             .map((item: JOBsheetProps) => (
//               <div key={item.id} className="grid grid-cols-12 gap-5 pb-3">
//                 <p>{item?.id}</p>
//                 <p>{item?.circle}</p>
//                 <p>{item?.division}</p>
//                 <p>{item?.product}</p>
//                 <p>{item?.serial}</p>
//                 <p>{item?.modelno}</p>
//                 <p>{moment(item?.createdAt).format("Do MMM YY")}</p>
//                 <p>{moment(item?.visitDate).format("Do MMM YY")}</p>
//                 <p>{item?.callClosed == 'true' ? <span className=" text-red-500">Closed</span> :<span className=" text-green-500"> Not Closed</span>}</p>
//                 <p>{item?.totalAmount}</p>              
//                 <p>{item?.verifiedBy === 'false' ? <span className=" text-red-500">Not verifyed</span> :<span className=" text-green-500">verifyed</span>}</p>

//                 <Link href={`/emp/jobsheet/${item.id}`} className='buttongreen text-center w-28 py-2'>View</Link>
//               </div>
//             ))}



//         {role === "admin" &&data &&data.map((item: JOBsheetProps) => (
//               <div key={item.id} className="grid grid-cols-12 gap-5 pb-3">
//                 <p>{item.id}</p>
//                 {role === "admin" && <p>{item.madeBy}</p>}
//                 <p>{item.circle}</p>
//                 <p>{item.division}</p>
//                 <p>{item.product}</p>
//                 <p>{item.serial}</p>
//                 <p>{item.modelno}</p>
//                 <p>{moment(item?.createdAt).format("Do MMM YY")}</p>
//                 <p>{moment(item?.visitDate).format("Do MMM YY")}</p>

//                 {item.callClosed === "false" ? (
//                   <button
//                     onClick={() => verifyFunction(item.id , item.verifiedBy , 'true')}
//                     className="buttonred text-center w-28 py-2"
//                   >
//                     Not Closed
//                   </button>
//                 ) : (
//                   <p className=" cursor-not-allowed buttongreen text-center w-28 py-2 ">closed</p>
//                 )}

//                 <p>{item.totalAmount}</p>
//                 {item.verifiedBy === "false" ? (
//                   <button
//                     onClick={() => verifyFunction(item.id , 'true' , item.callClosed)}
//                     className="buttonred text-center w-28 py-2"
//                   >
//                     Not Verify
//                   </button>
//                 ) : (
//                   <p className=" cursor-not-allowed buttongreen text-center w-28 py-2 ">verified</p>
//                 )}
//                 <Link href={`/admin/jobsheet/${item.id}`} className='buttonbg text-center w-28 py-2'>View</Link>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// };

// export default AllJobSheet;


"use client";
import { AllJobSheetAction, VerifyJobSheet } from "@/actions/admin/adminform";
import { JOBsheetProps, PropsAuth } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "./loader";
import moment from "moment";

const AllJobSheet = ({ role, emp }: { role: "admin" | "emp"; emp?: PropsAuth }) => {
  const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: ["fetchjob"],
    queryFn: async () => await AllJobSheetAction(),
    staleTime: 2000,
  });

  const [filteredData, setFilteredData] = useState<JOBsheetProps[]>([]);
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    if (data) {
      let sortedData = [...data];

      if (sortOrder === "new") {
        sortedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else {
        sortedData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }

      if (startDate && endDate) {
        sortedData = sortedData.filter(
          (item) =>
            new Date(item.createdAt) >= new Date(startDate) &&
            new Date(item.createdAt) <= new Date(endDate)
        );
      }

      setFilteredData(sortedData);
    }
  }, [data, sortOrder, startDate, endDate]);

  const verifyFunction = async (id: string, verified: string, callClosed: string) => {
    const res = await VerifyJobSheet(id, callClosed, verified);
    if (res?.status === 200) {
      toast.success(verified === "true" ? "JobSheet Verified" : "JobSheet Closed");
      router.refresh();
    } else {
      toast.error("Error");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full min-h-screen px-10">
      <h1 className="text-center text-2xl font-bold mb-10">All Job Sheets</h1>

      {/* Sorting & Date Range Filters */}
      <div className="flex w-[70%] items-center justify-between mb-5">
        <button
          onClick={() => setSortOrder(sortOrder === "new" ? "old" : "new")}
          className="px-4 py-2 buttonbg text-white rounded-lg"
        >
          Sort: {sortOrder === "new" ? "Newest First" : "Oldest First"}
        </button>

        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border inputbg bg-[#ffffff7e] p-2 rounded-lg"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border inputbg bg-[#ffffff7e]  p-2 rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border-2 w-[2200px] inputbg border-[#80808056] p-3 rounded-lg overflow-x-scroll">
        <div className="grid grid-cols-12 gap-5 mb-5 border-b-2 pb-3">
          <p>ID</p>
          {role === "admin" && <p>Made By</p>}
          <p>Circle</p>
          <p>Division</p>
          <p>Product</p>
          <p>Serial</p>
          <p>Model No.</p>
          <p>Created Date</p>
          <p>Visited Date</p>
          <p>Call Closed</p>
          <p>Amount</p>
          <p>Verified</p>
          <p>PDF</p>
        </div>

        {role === "emp" &&
          filteredData
            .filter((job) => job.madeBy === emp?.email && job.circle === emp.city)
            .map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-5 pb-3">
                <p>{item.id}</p>
                <p>{item.circle}</p>
                <p>{item.division}</p>
                <p>{item.product}</p>
                <p>{item.serial}</p>
                <p>{item.modelno}</p>
                <p>{moment(item.createdAt).format("Do MMM YY")}</p>
                <p>{moment(item.visitDate).format("Do MMM YY")}</p>
                <p className={item.callClosed === "true" ? "text-red-500" : "text-green-500"}>
                  {item.callClosed === "true" ? "Closed" : "Not Closed"}
                </p>
                <p>{item.totalAmount}</p>
                <p className={item.verifiedBy === "false" ? "text-red-500" : "text-green-500"}>
                  {item.verifiedBy === "false" ? "Not Verified" : "Verified"}
                </p>
                <Link href={`/emp/jobsheet/${item.id}`} className="buttongreen text-center w-28 py-2">
                  View
                </Link>
              </div>
            ))}

        {/* Admin Role Data */}
        {role === "admin" &&
          filteredData.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-5 pb-3">
              <p>{item.id}</p>
              <p>{item.madeBy}</p>
              <p>{item.circle}</p>
              <p>{item.division}</p>
              <p>{item.product}</p>
              <p>{item.serial}</p>
              <p>{item.modelno}</p>
              <p>{moment(item.createdAt).format("Do MMM YY")}</p>
              <p>{moment(item.visitDate).format("Do MMM YY")}</p>

              {/* Call Closed Button */}
              {item.callClosed === "false" ? (
                <button
                  onClick={() => verifyFunction(item.id, item.verifiedBy, "true")}
                  className="buttonred text-center w-28 py-2"
                >
                  Not Closed
                </button>
              ) : (
                <p className="cursor-not-allowed buttongreen text-center w-28 py-2">Closed</p>
              )}

              <p>{item.totalAmount}</p>

              {/* Verification Button */}
              {item.verifiedBy === "false" ? (
                <button
                  onClick={() => verifyFunction(item.id, "true", item.callClosed)}
                  className="buttonred text-center w-28 py-2"
                >
                  Not Verified
                </button>
              ) : (
                <p className="cursor-not-allowed buttongreen text-center w-28 py-2">Verified</p>
              )}

              <Link href={`/admin/jobsheet/${item.id}`} className="buttonbg text-center w-28 py-2">
                View
              </Link>
            </div>
          ))}

          {filteredData.length == 0 && <p className="text-center text-xl font-semibold">No Data Found</p>}
      </div>
    </div>
  );
};

export default AllJobSheet;
 