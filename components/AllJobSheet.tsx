 
"use client";
import { AllJobSheetAction, deleteJobSheet, VerifyJobSheet } from "@/actions/admin/jobsheet";
import { JOBsheetProps, PropsAuth } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "./loader";
import moment from "moment";
import DatePicker from "react-datepicker";

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

  const deleteJObsheet = async (id: string) => {
    const res = await deleteJobSheet(id);
    if (res?.status === 200) {
      toast.success('JobSheet Deleted');
      router.refresh();
    } else {
      toast.error("Error while Deleting JobSheet");
    }
  }

  if (isLoading) return <Loader />;

  return (
    <div className="w-full min-h-screen px-10">
      <h1 className="text-center text-2xl font-bold mb-10">All Job Sheets</h1>

      <div className="flex w-[70%] items-center justify-between mb-5">
        <button
          onClick={() => setSortOrder(sortOrder === "new" ? "old" : "new")}
          className="px-4 py-2 buttonbg text-white rounded-lg"
        >
          Sort: {sortOrder === "new" ? "Newest First" : "Oldest First"}
        </button>

        <div className=" "> 
          <p className=" text-center mb-3 font-medium text-lg">select data range</p>
         <div className=" flex gap-4">
         <DatePicker
              selected={startDate ? new Date(startDate) : null}
              onChange={(date) => setStartDate(date ? date.toISOString().split('T')[0] : "")}
              className="border inputbg bg-transparent px-2 py-1 rounded-lg"
              dateFormat="yyyy-MM-dd"
              placeholderText="Start Date"
            />
           <DatePicker
              selected={endDate ? new Date(endDate) : null}
              onChange={(date) => setEndDate(date ? date.toISOString().split('T')[0] : "")}
              className="border inputbg bg-transparent px-2 py-1 rounded-lg"
              dateFormat="yyyy-MM-dd"
              placeholderText="End Date"
            />
         </div>
        </div>
      </div>

      {/* Table */}
      <div className="border-2 w-[2200px] inputbg border-[#80808056] p-3 rounded-lg overflow-x-scroll">
        <div className="grid grid-cols-12 gap-5 mb-5 border-b-2 border-[#80808056] pb-3">
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
          <p>Complain</p>
          <p>Delete</p>
        { role === 'admin' && <p>PDF</p>}
        </div>

        {role === "emp" &&
          filteredData
            .filter((job) => job.madeBy === emp?.email && job.circle === emp.city)
            .map((item) => (
              <div key={item.id} className="grid grid-cols-12 mb-5 gap-5 pb-3">
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
                <p className="font-semibold !text-green-500 ">{item.complains.filter((c:any)=>c.status === 'New').map((c:any)=>c.status)} {item.complains.filter((c:any)=>c.status === 'New').length}</p>
              
              <button></button>
              </div>
            ))}

        {/* Admin Role Data */}
        {role === "admin" &&
          filteredData.map((item) => (
            <div key={item.id} className="grid grid-cols-12 mb-5 gap-5 pb-3">
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

              <p>{item?.totalAmount}</p>

              {/* Verification Button */}
              {item?.verifiedBy === "false" ? (
                <button
                  onClick={() => verifyFunction(item.id, "true", item.callClosed)}
                  className="buttonred text-center w-28 py-2"
                >
                  Not Verified
                </button>
              ) : (
                <p className="cursor-not-allowed buttongreen text-center w-28 py-2">Verified</p>
              )}

              <p> <span className="  font-semibold !text-green-500 ">{item.complains.filter((c:any)=>c.status === 'New').map((c:any)=>c.status)}</span> {item.complains.filter((c:any)=>c.status === 'New').length}</p>

              <button onClick={()=>deleteJObsheet(item.id)} className="buttonred w-fit px-8 hover:scale-105 hover:transition-all">Delete</button>

              <Link href={`/admin/jobsheet/${item.id}`} className="buttonbg text-center w-28 py-2">
                View
              </Link>

              <Link href={`/admin/jobsheet/update/${item.id}}`} className="buttongreen w-fit px-8 hover:scale-105 hover:transition-all">Update </Link>
            </div>
          ))}

          {filteredData?.length == 0 && <p className="text-center text-xl font-semibold">No Data Found</p>}
      </div>
    </div>
  );
};

export default AllJobSheet;
 