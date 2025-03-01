
import { currentUser } from '@/actions/admin/role'
import Loader from '@/components/elements/loader'
import UserJobSheetForm from '@/components/UserJobSheetForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const EmpUserJobSheetpage = async() => {
  const session = await getServerSession(authOptions);
  const city = await currentUser(session?.user?.email!)
  if(!city){
    return <Loader/>
  }
  return ( 
    <UserJobSheetForm role='emp' city={city.city}/>
  )
}

export default EmpUserJobSheetpage