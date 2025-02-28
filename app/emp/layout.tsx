
import { currentUser } from "@/actions/admin/adminform";
import AdminSidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar"; 
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
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
