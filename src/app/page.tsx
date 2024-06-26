import Image from "next/image";
import Link from "next/link";
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
import AvatarImage from "@/components/AvatarImage";

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

function FeatureProject({
  published_date,
  title,
  summary,
  slug,
  github_link,
  demo_link,
}: {
  published_date?: Date;
  title: string;
  summary: string;
  slug: string;
  github_link?: string;
  demo_link?: string;
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <Typography variant="p" affects="small" className="text-slate-500">
        {published_date && formatDate(published_date)}
      </Typography>
      <div className="flex items-start flex-col md:flex-row md:justify-between md:items-center">
        <Typography
          variant="p"
          affects="removePMargin"
          className="text-slate-900 font-medium"
        >
          <Link href={"/blog/" + slug}>{title}</Link>
        </Typography>
        <div className="flex justify-end text-sm gap-2">
          {demo_link && (
            <Button size={"icon"} variant={"outline"}>
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Button>
          )}
          {github_link && (
            <Button size={"icon"} variant={"outline"}>
              <Github className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
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
          <div className="mb-4">
            <AvatarImage />
          </div>
          <Typography variant="h1" className="text-xl font-semibold">
            Hey, I&apos;m Dedi. I build stuff on web.
          </Typography>

          <Typography variant="p">
            I&apos;m a full-stack web developer based in Aceh, Indonesia.
          </Typography>

          <Typography variant="p">
            My main focus is developing web apps using the JavaScript ecosystem.
            I began my career as a Frontend Engineer working with React, then
            transitioned to Backend Engineering with Node.js, and now I work as
            a Fullstack Engineer. Additionally, I enjoy exploring other
            technologies, such as Go!
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
        {/* <section className="flex flex-col space-y-6"> */}
        {/*   <Typography variant="h4">Featured articles</Typography> */}
        {/*   <FeatureArticle */}
        {/*     published_date={new Date()} */}
        {/*     title={ */}
        {/*       "How I Managed to Stay Stress-free despite Having 5 Fulltime Jobs" */}
        {/*     } */}
        {/*     summary={ */}
        {/*       "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet" */}
        {/*     } */}
        {/*     slug={"2023-review-what-i-could-do-better"} */}
        {/*   /> */}
        {/*   <FeatureArticle */}
        {/*     published_date={new Date()} */}
        {/*     title={ */}
        {/*       "Unlocking the Potential of MongoDB: Best Practices for Scalable Database Solutions" */}
        {/*     } */}
        {/*     summary={ */}
        {/*       "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet" */}
        {/*     } */}
        {/*     slug={"2023-review-what-i-could-do-better"} */}
        {/*   /> */}
        {/*   <FeatureArticle */}
        {/*     published_date={new Date()} */}
        {/*     title={ */}
        {/*       "Next.js Deep Dive: Building High-Performance React Applications" */}
        {/*     } */}
        {/*     summary={ */}
        {/*       "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet" */}
        {/*     } */}
        {/*     slug={"2023-review-what-i-could-do-better"} */}
        {/*   /> */}
        {/*   <Link href={"/blog"} className="link"> */}
        {/*     View all articles */}
        {/*   </Link> */}
        {/* </section> */}
        {/* <section> */}
        {/*   <div className="flex flex-col gap-y-6"> */}
        {/*     <Typography variant="h4">Featured projects</Typography> */}
        {/*     <FeatureProject */}
        {/*       title={"Chrommandr - Command Palette for Browser"} */}
        {/*       summary={ */}
        {/*         "A browser extension for showing command palette. It includes two commands: navigating to user's tabs and executing quick actions to browser (i.e. open settings page)" */}
        {/*       } */}
        {/*       slug={"2023-review-what-i-could-do-better"} */}
        {/*       github_link="https://github.com/ddsuhaimi/chrommandr" */}
        {/*     /> */}
        {/*     <FeatureProject */}
        {/*       title={"JagoASN - Online Exam Practice Platform"} */}
        {/*       summary={ */}
        {/*         "An online test and practice platform focusing on Indonesian's civil servant exams. It includes customizable tests, analytics, rankings and many more (with payment included too!). Technologies: Typescript, Next JS, Node JS, Postgres, " */}
        {/*       } */}
        {/*       slug={"2023-review-what-i-could-do-better"} */}
        {/*       demo_link="https://jagoasn.com" */}
        {/*     /> */}
        {/*     <FeatureProject */}
        {/*       title={"Go Screenshot API"} */}
        {/*       summary={ */}
        {/*         "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet" */}
        {/*       } */}
        {/*       slug={"2023-review-what-i-could-do-better"} */}
        {/*     /> */}
        {/*     <Link href={"/blog"} className="link"> */}
        {/*       View all projects */}
        {/*     </Link> */}
        {/*   </div> */}
        {/* </section> */}
        <div>
          <Typography variant="h4">Contact (or hire) me</Typography>
          <Typography variant={"p"}>
            I am available through these platforms:
          </Typography>
          <ul className="list-disc list-inside">
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
              <Link href={"https://.com/ddsuhaimi_"} className="link">
                x (formerly twitter)
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
