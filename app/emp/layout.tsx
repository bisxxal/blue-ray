
import { currentUser } from "@/actions/admin/role";
import AdminSidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar"; 
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const session = await getServerSession(authOptions);
   const user = await currentUser(session?.user?.email!);
  // if (!user || user?.role === "admin" || user?.role === "user") {
  //   redirect("/");
  // } 
  if (!user ) {
    redirect("/");
  } 
  return (
    <div className=" w-full min-h-screen ">
      <Navbar session={user} />
      <div className=" mt-[70px] flex min-h-screen w-full  ">
        <AdminSidebar role="emp"/>

        <div className="w-full ml-[200px]">
        {children}
        </div>
      </div>
    </div>
  );
}
