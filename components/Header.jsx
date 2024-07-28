"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'


const Header = () => {
  const path=usePathname()
  useEffect(()=>{
      console.log(path);
  })
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={'/PrepPal.png'} alt='logo' width={60} height={60}  style={{ width: "auto", height: "auto" }}   />
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>

        </ul>
        <UserButton/>
    </div>
  )
}

export default Header