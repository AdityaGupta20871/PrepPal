import Header from '@/components/Header'
import React from 'react'

const Dashboardlayout = ({children}) => {
  return (
    <div>
    <Header />
    <div className="mx-5 md:mx-20 lg:,mx:36">{children}</div>
    </div>
  )
}

export default Dashboardlayout;