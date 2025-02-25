
'use client';
import { AllComplainForm, UpdatedComplainStatus } from '@/actions/user/complain';
import { ComplainProps, PropsAuth } from '@/constants';
import { QueryClient, useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import Loader from './loader';
import toast from 'react-hot-toast';
import moment from 'moment';
import SearchInput from './SearchById';
import { usePathname, useSearchParams } from 'next/navigation';


const UserComplain = ({ role, user }: { role: 'emp' | 'admin'; user?: PropsAuth }) => {

  const path = useSearchParams()
  console.log(path.get('search'))
  const search = path.get('search')
  const [searchTerm, setSearchTerm] = useState<string>(path.get('search') || '');

  const client = new QueryClient()
  const { isLoading, data } = useQuery({
    queryKey: ['fetchComplain' , client],
    queryFn: async () => {
      const data = await AllComplainForm();
      return data;
    },
    staleTime: 60000,
  });

  const [filteredData, setFilteredData] = useState<ComplainProps[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const handleSearch = (searchTerm: string) => {
    if (!data) return;

    if (searchTerm.trim() === '') {
      setFilteredData(data);  
      return;
    }

    const filtered = data.filter((item: ComplainProps) =>
      item.complainId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filtered.length > 0 ? filtered : []);
  };

  if (isLoading) return <Loader />;

  const onSubmitStatus = async (id: string, status: string) => {
    const res = await UpdatedComplainStatus(id, status);
    if (res.status === 200) {
      toast.success('Status updated successfully');
    } else {
      toast.error('Error in updating status');
    }
  };

  return (
    <div className="w-full h-screen flex gap-6 pt-10 items-center flex-col px-4">
      <h1 className="text-center text-2xl font-bold">User's Complaint</h1>

      <SearchInput placeholder="Search by Complain ID..." onSearch={handleSearch} urldata={search || ''}/>

      <div className="w-full flex flex-col gap-4">
        <div className="w-[2000px] overflow-x-auto border-2 border-[#ffffff3c] rounded-3xl pt-3">
          <div className=" border-b-2 border-[#ffffff3c] w-full mx-auto grid grid-cols-7 p-4">
            <h2>Email</h2>
            <h2>Name</h2>
            <h2>City</h2>
            <h2>Complain ID</h2>
            <h2>Description</h2>
            <h2>Created At</h2>
            <h2>Status</h2>
          </div>

          {role === 'admin' && (
            <div className=" inputbg">
              {filteredData.length > 0 ? (
                filteredData.map((item: ComplainProps) => (
                  <div key={item.id} className="w-full border-b hover:bg-[#466bfe64] rounded-xl transition-all border-[#ffffff3c] grid grid-cols-7 p-4 px-2 ">
                    <h2>{item.email}</h2>
                    <h2>{item.name}</h2>
                    <h2>{item.city}</h2>
                    <h2>{item.complainId}</h2>
                    <h2>{item.description}</h2>
                    <h2>{moment(item?.createdAt).format('Do MMM YY')}</h2>
                    <select
                      onChange={(e) => onSubmitStatus(item.id, e.target.value)}
                      name="status"
                      defaultValue={item.status}
                      className="rounded-xl bg-transparent w-40 border-b-2 border-[#ffffff3c] p-2"
                    >
                      {/* <option value="Pending">Pending</option> */}
                      <option value="New">New</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 p-4">No complaints found</p>
              )}
            </div>
          )}

          {role === 'emp' && user?.city &&(
            <div className="!border-none inputbg">
              {filteredData
                .filter((item: ComplainProps) => item?.city === user?.city)
                .map((item: ComplainProps) => (
                  <div key={item.id} className="w-full border-b border-[#ffffff3c] hover:bg-[#466bfe64] rounded-xl transition-all grid grid-cols-7 p-4 px-2 ">
                    <h2>{item.email}</h2>
                    <h2>{item.name}</h2>
                    <h2>{item.city}</h2>
                    <h2>{item.complainId}</h2>
                    <h2>{item.description}</h2>
                    <h2>{moment(item?.createdAt).format('Do MMM YY')}</h2>
                    <select
                      onChange={(e) => onSubmitStatus(item.id, e.target.value)}
                      name="status"
                      defaultValue={item.status}
                      className="rounded-xl outline-none bg-transparent w-40 border-b-2 border-[#ffffff3c] p-2"
                    >
                      {/* <option value="Pending">Pending</option> */}
                      <option value="New">New</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserComplain;
