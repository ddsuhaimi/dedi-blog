'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion"


const navs = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: "Project", path: "/project" },
    { label: "About", path: "/about" },
]

export default function Navbar() {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(false)
    return (
        <header className='sticky top-0 left-0 w-full bg-white  transition-shadow sm:shadow-sm'>

            <nav className='blog-width flex py-2'>
                <ul className='flex space-x-3'>
                    {navs.map(item => {
                        const isActive = pathname === item.path
                        return (
                            <li key={item.path}>
                                <Link href={item.path} className={cn(isActive && 'text-orange-500')}>{item.label}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}
