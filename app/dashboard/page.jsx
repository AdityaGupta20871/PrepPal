import React from 'react'
import List from '@/components/List'
import Interview from '@/components/Interview'
const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">dashboard</h2>
      <h2 className="text-gray-500">Create and Start Your AI Mockup Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
      <Interview />
      </div>
      <div>
        <List />
      </div>

    </div>
  )
}

export default Dashboard
