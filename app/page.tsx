
import Navbar from "@/components/navbar"; 
import { PropsAuth } from "@/constants";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { currentUser } from "@/actions/admin/role";

export default async function Home() {
  const session = await getServerSession(authOptions)  ; 
  let users; 
  if(session){
    // user = await currentUser();
   users = await currentUser(session?.user?.email!);
  }
  return (
    <div className=" w-full min-h-screen flex flex-col ">
   { users ? <Navbar  session={users} /> : <Navbar  />}
      <div className=" mt-[70px] min-h-screen flex justify-center items-center text-3xl font-bold w-full ">
    {users ? 
     <div>
      <Link className="flex capitalize hover:scale-125 transition-all  items-center gap-2 textbase underline" href={`/${users.role}`}>Go to {users.role} Dashboard <GoArrowUpRight /></Link>
    </div> :<h1> public page </h1>}
      </div>

    </div>
  );
}
