
import { currentUser } from '@/actions/admin/role'
import UserComplain from '@/components/UserComplain'
import React from 'react'

const page = async() => {
  const user = await currentUser()
  return (
   <UserComplain role='emp' user={user} />
  )
}

export default page