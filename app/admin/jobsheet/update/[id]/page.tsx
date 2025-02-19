'use client'
import Jobsheet from '@/components/Jobsheet'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

const AdminUPdateJobSheetPage = () => {
    const pathname = usePathname()
    const id = pathname.split('/admin/jobsheet/update/').pop()?.toString()
    // console.log(id)

    
  return (
    <div>
        <h1>AdminUPdateJobSheetPage</h1>

        <Jobsheet id={id} />
    </div>
  )
}

export default AdminUPdateJobSheetPage