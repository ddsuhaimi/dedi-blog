"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navs = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  // { label: "Project", path: "/project" },
  // { label: "About", path: "/about" },
];

function LaptopIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    // <header className="w-full bg-white">
    //   <nav className="blog-width blog-padding py-4">
    //     <div className="flex flex-row gap-x-4">
    //       {navs.map((item) => {
    //         const isActive = pathname === item.path;
    //         return (
    //           <Link
    //             key={item.path}
    //             href={item.path}
    //             className={cn(isActive && "font-semibold")}
    //           >
    //             {item.label}
    //           </Link>
    //         );
    //       })}
    //     </div>
    //   </nav>
    // </header>
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md shadow-md transition-shadow duration-300">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold" prefetch={false}>
          <LaptopIcon className="h-6 w-6 text-primary" />
          <span className="sr-only">Portfolio</span>
        </Link>
        <nav className="flex items-center gap-4">
          {/* <Link
            href="/about"
            className="text-sm font-medium hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            About
          </Link> */}
          <Link
            href="/blog"
            className="text-sm font-medium hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Articles
          </Link>
          <Link
            href="/project"
            className="text-sm font-medium hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Projects
          </Link>
          {/* <Link
            href="#"
            className="text-sm font-medium hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Work
          </Link> */}
          <Link
            href="/contact"
            className="text-sm font-medium hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
