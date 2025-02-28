'use client'
import Link from 'next/link'
import { FaHome ,FaChartPie} from "react-icons/fa";
import { IoAccessibilitySharp } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa6";
import { LuDraftingCompass } from "react-icons/lu";
import { usePathname } from 'next/navigation';
import { BsCashCoin } from "react-icons/bs";
 
interface SidebarProps {
    role?: 'user'|'admin'|'emp'
}
const AdminSidebar = ({role}:SidebarProps) => {
    const pathname = usePathname()
  return (
    <div className='z-[100] !w-[200px] fixed left-0 top-[60px] h-[90vh] px-2 flex flex-col pt-5'>

      <div className=' border h-full border-[#ffffff3c] backdrop-blur-[20px] rounded-3xl pt-5 sidebarbg px-3'>
      {
            role === 'admin' && (
              <>
              <Link className={` ${pathname === '/admin' ? ' sidebg ' : '  text-[#bcbcbcde] border-[#bcbcbcde] '}   hover:scale-110 transition-all border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/admin'><FaHome /> Home</Link>
              <Link className={` ${pathname === '/admin/jobsheet' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]   '} hover:scale-110 transition-all  border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/admin/jobsheet'><FaWpforms />Jobsheet</Link>
              <Link className={` ${pathname === '/admin/revenue' ? ' sidebg  ' : 'text-[#bcbcbcde] border-[#bcbcbcde]    '}hover:scale-110 transition-all  border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/admin/revenue'><FaChartPie />revenue</Link>
              <Link className={` ${pathname === '/admin/access' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]   '}hover:scale-110 transition-all  border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/admin/access'><IoAccessibilitySharp />Access</Link>
              <Link className={` ${pathname === '/admin/complain' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]  '}hover:scale-110 transition-all  border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/admin/complain'><LuDraftingCompass />Complain</Link>
              <Link className={` ${pathname === '/admin/userform' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]  '} hover:scale-110 transition-all border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/admin/userform'><FaWpforms />User form</Link>
              <Link className={` ${pathname === '/admin/empincome' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]  '} hover:scale-110 transition-all border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/admin/empincome'><BsCashCoin />Emp Income</Link>
            </>
            )
          }

          {
            role === 'emp' && (
              <>
              <Link className={` ${pathname === '/emp' ? ' sidebg ' : '  text-[#bcbcbcde] border-[#bcbcbcde] '}  hover:scale-110 transition-all  border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/emp'><FaHome /> Home</Link>
              <Link className={` ${pathname === '/emp/jobsheet' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]   '} hover:scale-110 transition-all border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/emp/jobsheet'><FaWpforms />Jobsheet</Link>
              <Link className={` ${pathname === '/emp/complain' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]  '} hover:scale-110 transition-all border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/emp/complain'><LuDraftingCompass />Complain</Link>
              <Link className={` ${pathname === '/emp/income' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]  '} hover:scale-110 transition-all border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/emp/income'><BsCashCoin />Income</Link>
              <Link className={` ${pathname === '/emp/userform' ? ' sidebg ' : ' text-[#bcbcbcde] border-[#bcbcbcde]  '} hover:scale-110 transition-all border mt-3 p-2 flex items-center gap-2 text-lg rounded-2xl `} href='/emp/userform'><FaWpforms />User form</Link>
            </>
            )
          } 
      </div>
    </div>
  )
}

export default AdminSidebar