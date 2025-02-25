 
"use client";
import { AllJobSheetAction, deleteJobSheet, VerifyJobSheet } from "@/actions/admin/jobsheet";
import { JOBsheetProps, PropsAuth } from "@/constants";
import { useQuery, useQueryClient ,keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "./loader";
import moment from "moment";
import DatePicker from "react-datepicker";

const AllJobSheet = ({ role, emp }: { role: "admin" | "emp"; emp?: PropsAuth }) => {
  const client = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);  //  adjust the page size
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { isLoading, data, isError } = useQuery({
    queryKey: ["fetchjob", currentPage, pageSize, ],
    queryFn: async () => await AllJobSheetAction(currentPage, pageSize),
    placeholderData: keepPreviousData

  });

  const [filteredData, setFilteredData] = useState<JOBsheetProps[]>([]);
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  useEffect(() => {
    if (data) {
      let sortedData = [...data.data];

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
      await client.invalidateQueries({ queryKey: ['fetchjob'] });
    } else {
      toast.error("Error");
    }
  };

  const deleteJObsheet = async (id: string) => {
    const res = await deleteJobSheet(id);
    if (res?.status === 200) {
      toast.success('JobSheet Deleted');
      await client.invalidateQueries({ queryKey: ['fetchjob'] });
    } else {
      toast.error("Error while Deleting JobSheet");
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Error fetching data</p>;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle next page
  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Handle previous page
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));  
  };
  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  return (
    <div className="w-full min-h-screen px-10">
      <h1 className="text-center text-2xl font-bold mb-10">All Job Sheets</h1>

      <div className="flex w-[70%] items-center justify-between mb-5">
        <button
          onClick={() => setSortOrder(sortOrder === "new" ? "old" : "new")}
          className="px-4 py-3 buttonbg text-white rounded-lg"
        >
          Sort: {sortOrder === "new" ? "Newest First" : "Oldest First"}
        </button>

<div>

<label htmlFor="">Select limit</label>
        <select className=" px-5 ml-2" defaultValue={pageSize} onChange={(e)=>setPageSize(Number(e?.target?.value))} >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
</div>

        <div className=" "> 
          <p className=" text-center mb-3 font-medium text-lg">Select date range</p>
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
      <div className="border-2 w-[3200px] inputbg border-[#80808056] p-3 rounded-lg">
        <div className={` ${role === 'admin' ? " grid-cols-[repeat(15,_minmax(200px,_1fr))]  " : "grid-cols-[repeat(13,_minmax(220px,_1fr))]  " } grid grid-cols-[repeat(15,_minmax(0,_1fr))] gap-5 mb-5 border-b-2 border-[#80808056] pb-3 `}>
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

          { role === 'admin' && <p>Delete</p>}

        { role === 'admin' && <p>PDF</p>}
        </div>

        {role === "emp" &&
          filteredData
            .filter((job) => job.madeBy === emp?.email && job.circle === emp.city)
            .map((item) => (
              <div key={item.id} className="grid grid-cols-[repeat(13,_minmax(200px,_1fr))] mb-5 hover:bg-[#466bfe64] rounded-xl transition-all py-4 gap-5 pb-3">
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
                <Link href={`/emp/complain?search=${item.id}`} className="font-semibold !text-green-500 ">{item.complains.filter((c:any)=>c.status === 'New').map((c:any)=>c.status)} {item.complains.filter((c:any)=>c.status === 'New').length}</Link>
              </div>
            ))}

        {/* Admin Role Data */}
        {role === "admin" &&
          filteredData.map((item) => (
            <div key={item.id} className="grid grid-cols-[repeat(15,_minmax(200px,_1fr))] mb-5 hover:bg-[#466bfe91] rounded-3xl transition-all py-4  gap-5 ">
              <p>{item.id}</p>
              <p>{item.madeBy}</p>
              <p>{item.circle}</p>
              <p>{item.division}</p>
              <p>{item.product}</p>
              <p>{item.serial}</p>
              <p>{item.modelno}</p>
              <p>{moment(item.createdAt).format("Do MMM YY")}</p>
              <p>{moment(item.visitDate).format("Do MMM YY")}</p>

              {item.callClosed === "false" ? (
                <button
                  onClick={() => verifyFunction(item.id, item.verifiedBy, "true")}
                  className="buttongreen text-center w-28 py-2"
                >
                  Not Closed
                </button>
              ) : (
                <p className="cursor-not-allowed buttonred text-center w-28 py-2">Closed</p>
              )}

              <p>{item?.totalAmount}</p>

              {/* Verification Button */}
              {item?.verifiedBy === "false" ? (
                <button onClick={() => verifyFunction(item.id, "true", item.callClosed)} className="buttonred text-center w-28 py-2"
                >Not Verified</button>
              ) : (
                <p className="cursor-not-allowed buttongreen text-center w-28 py-2">Verified</p>
              )}

              <Link href={`/admin/complain?search=${item.id}`} > <span className="  font-semibold !text-green-500 underline "> New  {item.complains.filter((c:any)=>c.status === 'New').length}</span> 
              
               { item.complains.filter((c:any)=>c.status === 'Closed').length !== 0 && <span className=" text-red-500">Closed {item.complains.filter((c:any)=>c.status === 'Closed').length}</span>}
                </Link>

              <button onClick={()=>deleteJObsheet(item.id)} className="buttonred w-fit px-8 hover:scale-105 hover:transition-all">Delete</button>

              <Link href={`/admin/jobsheet/${item.id}`} className="buttonbg text-center w-28 py-2">View</Link>
            </div>
          ))}

          {filteredData?.length == 0 && <p className="text-center text-xl font-semibold">No Data Found</p>}
        
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-5 gap-3">
          <button  onClick={handlePrevPage}  disabled={currentPage === 1}  className="bg-blue-500 disabled:bg-zinc-500 disabled:cursor-not-allowed px-6 py-2 rounded-xl" >
            Prev
          </button>
          <p className="font-medium"> <span className=" font-bold text-blue-600">{currentPage}</span> {`/ ${totalPages}`}</p>
          <button  onClick={handleNextPage}  disabled={currentPage >= totalPages}  className="bg-blue-500 disabled:bg-zinc-500 disabled:cursor-not-allowed px-6 py-2 rounded-2xl" >
            Next
          </button>
        </div>
    </div>
  );
};

export default AllJobSheet;


