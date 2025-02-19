import { currentUser } from '@/actions/admin/role'
import Loader from '@/components/loader'
import UserJobSheetForm from '@/components/UserJobSheetForm'
import React from 'react'

const EmpUserJobSheetpage = async() => {
  const city = await currentUser()
  if(!city){
    return <Loader/>
  }
  return ( 
    <UserJobSheetForm role='emp' city={city.city}/>
  )
}

export default EmpUserJobSheetpage