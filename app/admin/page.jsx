"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router = useRouter();
  router.push('/admin/dashboard')
  return (
    <div></div>
  )
}

export default Page