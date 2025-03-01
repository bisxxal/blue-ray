
import { currentUser } from '@/actions/admin/role'
import UserComplain from '@/components/UserComplain'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async() => {
  const session = await getServerSession(authOptions);
    const user = await currentUser(session?.user?.email!);
  return (
   <UserComplain role='emp' user={user} />
  )
}

export default page