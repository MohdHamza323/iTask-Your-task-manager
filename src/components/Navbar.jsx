import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-green-700 text-white py-1' >
        <div className="logo">
            <span className='font-bold text-xl mx-8'>i-Task</span>
        </div>
        <ul className='flex gap-7 mx-8'>
            <li className='cursor-pointer hover:font-bold translate-x-3'>Home</li>
            <li className='cursor-pointer hover:font-bold translate-x-3'>YourTasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
