'use client'
import Link from 'next/link'
import { FaHome ,FaChartPie} from "react-icons/fa";
import { IoAccessibilitySharp } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa6";
import { LuDraftingCompass } from "react-icons/lu";
import { usePathname } from 'next/navigation';

interface SidebarProps {
    role?: 'user'|'admin'|'emp'
}
const AdminSidebar = ({role}:SidebarProps) => {
    const pathname = usePathname()
  return (
    <div className=' !w-[200px] px-2 flex flex-col border-r-2 border-[#ffffff3c]'>

     {
      role === 'admin' && (
        <>
        <Link className={` ${pathname === '/admin' ? ' sidebg ' : '  text-[#bcbcbcde] border-[#bcbcbcde] '}border    mt-3 p-2 flex items-center gap-2 text-lg rounded-lg `} href='/admin'><FaHome /> Home</Link>
        <Link className={` ${pathname === '/admin/jobsheet' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]   '}border mt-3 p-2 flex items-center gap-2 text-lg rounded-lg `} href='/admin/jobsheet'><FaWpforms />Jobsheet</Link>
        <Link className={` ${pathname === '/admin/revenue' ? ' sidebg  ' : 'text-[#bcbcbcde] border-[#bcbcbcde]    '}border mt-3 p-2 flex items-center gap-2 text-lg rounded-lg `} href='/admin/revenue'><FaChartPie />revenue</Link>
        <Link className={` ${pathname === '/admin/access' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]   '}border mt-3 p-2 flex items-center gap-2 text-lg rounded-lg `} href='/admin/access'><IoAccessibilitySharp />Access</Link>
        <Link className={` ${pathname === '/admin/complain' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]  '}border mt-3 p-2 flex items-center gap-2 text-lg rounded-lg `} href='/admin/complain'><LuDraftingCompass />Complain</Link>
      </>
      )
     }

     {
      role === 'emp' && (
        <>
        <Link className={` ${pathname === '/emp' ? ' sidebg ' : '  text-[#bcbcbcde] border-[#bcbcbcde] '}border    mt-3 p-2 flex items-center gap-2 text-lg rounded-lg `} href='/emp'><FaHome /> Home</Link>
        <Link className={` ${pathname === '/emp/form' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]   '}border mt-3 p-2 flex items-center gap-2 text-lg rounded-lg `} href='/emp/form'><FaWpforms />Forms</Link>
        <Link className={` ${pathname === '/emp/complain' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]  '}border mt-3 p-2 flex items-center gap-2 text-lg rounded-lg `} href='/emp/complain'><LuDraftingCompass />Complain</Link>
      </>
      )
     } 
    </div>
  )
}

export default AdminSidebar