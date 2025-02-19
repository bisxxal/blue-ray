"use client";
import UserComplain from '@/components/UserComplain'
import React from 'react'

const Complain = () => {
  const role = 'admin'
  return (
    <UserComplain role={role}/>
  )
}

export default Complain