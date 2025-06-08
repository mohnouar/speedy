"use client"

import { Menu, X } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='flex justify-between items-center relative px-5 sm:px-20 py-4'>
        <Link href="/" className='flex items-center gap-2'>
            <Image 
                src={"/logo.png"}
                alt="Speedy Logo"
                width={100}
                height={100}
                className='size-9 sm:size-13'
            />
            <h1 className='hadear text-2xl sm:text-4xl'>Speedy</h1>
        </Link>

        <ul className='flex items-center gap-10 text-lg sm:text-xl max-sm:hidden list-none'>
            <li className='nav-link'><Link href="/settings">Settings</Link></li>
            <li className='nav-link'><Link href="/about">About</Link></li>
        </ul>
        {/* Mobile Menu Icon */}
      <div className="sm:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-4 mt-2 bg-[#2A2C30] rounded-lg shadow-lg py-2 px-4 w-40 flex flex-col gap-2 text-sm">
          <Link
            href="/about"
            className="nav-link transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/settings"
            className="nav-link transition"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
        </div>
      )}
    </nav>
  )
}

export default NavBar