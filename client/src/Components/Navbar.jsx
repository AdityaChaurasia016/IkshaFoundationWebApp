import React from 'react'
import Logo from '../assets/IkshaFoundationLogo.avif'
const Navbar = () => {
  return (
    <div className='w-[100%] h-[auto] flex flex-col items-center justify-center'>
        <div className='Logo flex justify-center'>
        <img src={Logo} alt="Image" />
        </div>
        <hr style={{ border: 'none', height: '0.2px', backgroundColor: 'black' }} className='w-[70%] mb-4' />

        <div className='Links'>
            <ul className='flex space-x-5 text-sm'>
                <li>Home</li>
                <li>About Us</li>
                <li>Projects</li>
                <li>Events</li>
                <li>Donate</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar