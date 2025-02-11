import { currentUser } from "@/actions/admin/role";
import AdminSidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";
import { PropsAuth } from "@/constants";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const user = await currentUser();
    if (!user) {
      redirect("/");
    }
  return (
    <div className=" w-full min-h-screen ">
      <Navbar session={user} />
      <div className=" flex min-h-screen w-full  ">
        <AdminSidebar role="admin"/>
        {children}
      </div>
    </div>
  );
}
