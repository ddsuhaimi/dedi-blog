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

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="w-full bg-white">
      <nav className="blog-width blog-padding py-4">
        <div className="flex flex-row gap-x-4">
          {navs.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(isActive && "font-semibold")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
