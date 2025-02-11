import { currentUser } from "@/actions/admin/role"; 
import Navbar from "@/components/navbar"; 
import { PropsAuth } from "@/constants";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
  
export default async function Home() {
  const session = await getServerSession(authOptions) as PropsAuth ; 
  let user; 
  if(session){
    user = await currentUser()
  }  
  return (
    <div className=" w-full min-h-screen flex flex-col ">
   { user ? <Navbar  session={user} /> : <Navbar  />}
      <div className=" min-h-screen flex justify-center items-center text-3xl font-bold w-full ">
       public page  
      </div>
    </div>
  );
}
