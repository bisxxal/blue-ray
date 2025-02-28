
import { currentUser } from "@/actions/admin/adminform";
import Navbar from "@/components/navbar"; 
import { PropsAuth } from "@/constants";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions) as PropsAuth ; 
  let user; 
  if(session){
    user = await currentUser();
  }
  return (
    <div className=" w-full min-h-screen flex flex-col ">
   { user ? <Navbar  session={user} /> : <Navbar  />}
      <div className=" mt-[70px] min-h-screen flex justify-center items-center text-3xl font-bold w-full ">
    {user ? 
     <div>
      <Link className="flex capitalize hover:scale-125 transition-all  items-center gap-2 textbase underline" href={`/${user.role}`}>Go to {user.role} Dashboard <GoArrowUpRight /></Link>
    </div> :<h1> public page </h1>}
      </div>

    </div>
  );
}
