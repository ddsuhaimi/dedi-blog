import { getDatabase } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default async function Home() {
  return (
    <main>
      <section className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-red-300 via-orange-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Hello, I&apos;m Dedi!
            <span className="sm:block"> I build stuff on web. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            I do fullstack development with Javascript, but I learn others too.
            Welcome to my site! 👋
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-orange-600 bg-orange-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-orange-500 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/blog"
            >
              See My Blog
            </Link>
            <a
              className="block w-full rounded border border-orange-600 px-12 py-3 text-sm font-medium text-orange-500 hover:text-white hover:bg-orange-600 focus:outline-none focus:ring active:bg-orange-500 sm:w-auto"
              href="/about"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
