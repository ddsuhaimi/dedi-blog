import { getDatabase } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Globe,
  Github,
  SquareArrowOutUpRight,
} from "lucide-react";
import Typography from "@/components/Typography";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

function FeatureArticle({ published_date, title, summary, slug }) {
  return (
    <div className="flex flex-col gap-y-1">
      <Typography variant="p" affects="small" className="text-slate-500">
        {formatDate(published_date)}
      </Typography>
      <Typography
        variant="p"
        affects="removePMargin"
        className="text-slate-900 font-medium"
      >
        <Link href={"/blog/" + slug}>{title}</Link>
      </Typography>
      <Typography
        variant="p"
        affects="removePMargin"
        className="text-slate-700"
      >
        {summary}
      </Typography>
    </div>
  );
}

function FeatureProject({ published_date, title, summary, slug }) {
  return (
    <div className="flex flex-col gap-y-1">
      <Typography variant="p" affects="small" className="text-slate-500">
        {published_date && formatDate(published_date)}
      </Typography>
      <Typography
        variant="p"
        affects="removePMargin"
        className="text-slate-900 font-medium"
      >
        <Link href={"/blog/" + slug}>{title}</Link>
      </Typography>
      <Typography
        variant="p"
        affects="removePMargin"
        className="text-slate-700"
      >
        {summary}
      </Typography>
      <div className="flex justify-end text-sm gap-2">
        <Button size={"icon"} variant={"ghost"}>
          <SquareArrowOutUpRight className="h-4 w-4" />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <Github className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Dedi - Full Stack Developer",
  description: "Personal website of Dedi",
};

export default async function Home() {
  return (
    <section className="blog-width blog-padding">
      <div className="flex flex-col gap-y-16">
        <div></div>
        <div>
          <img src="https://placehold.co/160x160?text=" className="pb-4" />
          <Typography variant="h1" className="text-xl font-semibold">
            Hey, I&apos;m Dedi. I build stuff on web.
          </Typography>

          <Typography variant="p">
            I&apos;m a full-stack web developer based in Aceh, Indonesia.
          </Typography>

          <Typography variant="p">
            My main focus is developing web app using Javascript ecosystem.
            While I kickstarted my career as Frontend Engineer using React, I
            transitioned to Backend Engineer using Node js and now do it all as
            Fullstack Engineer. However, I do explore other technologies, like
            Go!
          </Typography>

          <Typography variant="p">
            Aside from work, I plan to write things I found interesting and
            things I explored. Feel free to check out my{" "}
            <Link href={"/blog"} className="link">
              blog
            </Link>
            .
          </Typography>
        </div>
        <div className="flex flex-col space-y-6">
          <Typography variant="h4">Featured articles</Typography>
          <FeatureArticle
            published_date={new Date()}
            title={
              "How I Managed to Stay Stress-free despite Having 5 Fulltime Jobs"
            }
            summary={
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet"
            }
            slug={"2023-review-what-i-could-do-better"}
          />
          <FeatureArticle
            published_date={new Date()}
            title={
              "Unlocking the Potential of MongoDB: Best Practices for Scalable Database Solutions"
            }
            summary={
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet"
            }
            slug={"2023-review-what-i-could-do-better"}
          />
          <FeatureArticle
            published_date={new Date()}
            title={
              "Next.js Deep Dive: Building High-Performance React Applications"
            }
            summary={
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet"
            }
            slug={"2023-review-what-i-could-do-better"}
          />
          <Link href={"/blog"} className="link">
            View all articles
          </Link>
        </div>
        <div>
          <div className="flex flex-col gap-y-6">
            <Typography variant="h4">Featured projects</Typography>
            <FeatureProject
              published_date={new Date()}
              title={"Chrommandr"}
              summary={
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet"
              }
              slug={"2023-review-what-i-could-do-better"}
            />
            <FeatureProject
              published_date={new Date()}
              title={"JagoASN"}
              summary={
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet"
              }
              slug={"2023-review-what-i-could-do-better"}
            />
            <FeatureProject
              published_date={new Date()}
              title={"Go Screenshot API"}
              summary={
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet"
              }
              slug={"2023-review-what-i-could-do-better"}
            />
            <Link href={"/blog"} className="link">
              View all projects
            </Link>
          </div>
        </div>
        <div>
          <Typography variant="h4">Contact (or hire) me</Typography>
          <Typography variant={"p"}>
            I am available through these platforms:
          </Typography>
          <ul className="list-disc list-inside">
            <li>
              email:{" "}
              <Link href={"mailto:dedisuhaimiacc@gmail.com"} className="link">
                dedisuhaimiacc@gmail.com
              </Link>
            </li>
            <li>
              <Link
                href={"https://linkedin.com/in/dedi-suhaimi"}
                className="link"
              >
                linkedin
              </Link>
            </li>
            <li>
              <Link href={"https://github.com/ddsuhaimi"} className="link">
                github
              </Link>
            </li>
            <li>
              <Link href={"https://.com/kapangajiann"} className="link">
                x (formerly twitter)
              </Link>
            </li>
          </ul>
        </div>

        {/* <h1 className="text-3xl font-bold">Hello, I&apos;m Dedi! </h1> */}
        {/* <span className="text-slate-500"> I build stuff on web. </span> */}
      </div>
      {/* <div class="flex space-x-4">
        <div>01</div>
        <div>02</div>
        <div>03</div>
      </div> */}
      {/* <div className="prose">
        <p>I'm a full-stack web developer based in Aceh, Indonesia.</p>
        <p>
          My main focus is developing web app using Javascript ecosystem. While
          I kickstarted my career as Frontend Engineer using React, I
          transitioned to Backend Engineer using Node js and now do it all as
          Fullstack Engineer. However, I do explore other technologies, like Go!
        </p>
        <p>
          Aside from work, I plan to write things I found interesting and things
          I explored. Feel free to check out my <Link href={"/blog"}>blog</Link>
          .
        </p>
        Find me on:
        <ul>
          <li>
            <a href="mailto:dedisuhaimiacc@gmail.com">
              dedisuhaimiacc@gmail.com
            </a>
          </li>
          <li>
            <a href="https://github.com/ddsuhaimi">Github</a>
          </li>
          <li>
            <a href="https://x.com/kapangajiann">X (formerly Twitter)</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/dedi-suhaimi">Linkedin</a>
          </li>
        </ul>
      </div> */}
    </section>
  );
}
