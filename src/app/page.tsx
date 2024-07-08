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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactForm from "@/components/ContactForm";
import { getDatabase } from "@/lib/notion";
import profilePic from "../../public/avatartion.png";

function FeatureArticle({ title, summary, slug, thumbnail = "" }) {
  return (
    <Card className="group overflow-hidden rounded-lg shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-md flex flex-col justify-between">
      <CardContent className="space-y-4 pt-6">
        <Image
          src={thumbnail}
          width={400}
          height={225}
          alt="Article Image"
          className="h-40 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 rounded-sm"
        />
        <div className="space-y-2">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-muted-foreground">{summary}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <Link
          href={"/blog/" + slug}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/50"
          prefetch={false}
        >
          <ArrowRightIcon className="h-4 w-4" />
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}

function FeatureProject({
  published_date,
  title,
  summary,
  thumbnail,
  slug,
  github_link,
  demo_link,
}: {
  published_date?: Date;
  title: string;
  summary: string;
  thumbnail: string;
  slug: string;
  github_link?: string;
  demo_link?: string;
}) {
  return (
    <Card className="group overflow-hidden rounded-lg shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-md flex flex-col justify-between">
      <CardContent className="space-y-4 pt-6">
        <Image
          src={thumbnail}
          width={400}
          height={225}
          alt="Project Image"
          className="h-40 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="space-y-2">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-muted-foreground">{summary}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <Link
          href={slug}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/50"
          prefetch={false}
        >
          <ArrowRightIcon className="h-4 w-4" />
          View Project
        </Link>
      </CardFooter>
    </Card>
  );
}

export const metadata: Metadata = {
  title: "Dedi - Full Stack Developer",
  description: "Personal website of Dedi",
};

function ArrowRightIcon(props) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

async function getProjects() {
  if (!process.env.PROJECT_DATABASE_ID) {
    throw new Error("No article database id");
  }
  const posts = await getDatabase(process.env.PROJECT_DATABASE_ID);
  const publishedProjects = posts.filter(
    (project: any) => project.properties.Featured.checkbox
  );
  return publishedProjects;
}

export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <section id="about" className="container mx-auto max-w-5xl px-4 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">
              Hey, I&apos;m Dedi. I build stuff on web.
            </h1>
            <p className="text-muted-foreground">
              I&apos;m a full-stack web developer based in Aceh, Indonesia.
            </p>
            <p className="text-muted-foreground">
              I&apos;m a passionate developer with a strong background in
              building modern web applications. I love exploring new
              technologies and constantly learning to improve my craft.
            </p>
            <p className="text-muted-foreground">
              Feel free to check out my blog or social media
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/50"
              prefetch={false}
            >
              <ArrowRightIcon className="h-4 w-4" />
              Read my blog
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={profilePic}
              width={300}
              height={150}
              alt="Profile"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105  transform -scale-x-100 hidden md:block"
            />
          </div>
        </div>
      </section>
      {/* <section id="articles" className="container mx-auto max-w-5xl px-4 py-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Featured Articles</h2>
            <p className="text-muted-foreground">
              Check out some of my latest blog posts.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureArticle
              title="Mastering React Hooks: A Comprehensive Guide"
              summary={
                "Dive deep into the world of React Hooks and learn how to leverage them to build powerful and efficient applications."
              }
              slug="#"
            />
            <FeatureArticle
              title="Optimizing Web Performance: Strategies and Best Practices"
              summary={
                "Learn how to optimize your web applications for lightning-fast performance and provide an exceptional user experience."
              }
              slug="#"
            />
            <FeatureArticle
              title="Exploring the Power of TypeScript: A Beginner's Guide"
              summary={
                "Discover the benefits of TypeScript and learn how to integrate it into your web development workflow."
              }
              slug="#"
            />
          </div>
          <div>
            <Link href={"/blog"} className="link">
              View all articles
            </Link>
          </div>
        </div>
      </section> */}
      <section id="projects" className="container mx-auto max-w-5xl px-4 py-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="text-muted-foreground">
              Check out some of my recent projects.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const title = project.properties.Name.title[0].plain_text;
              const slug = project.properties.Slug.rich_text[0].plain_text;
              const description =
                project.properties.Description.rich_text[0].plain_text;
              const thumbnail =
                project.properties.Thumbnail.files[0].external.url;
              return (
                <FeatureProject
                  key={project.title}
                  title={title}
                  summary={description}
                  slug={"/project/" + slug}
                  thumbnail={thumbnail}
                />
              );
            })}
          </div>
          <div>
            <Link href={"/project"} className="link">
              View all projects
            </Link>
          </div>
        </div>
      </section>
      {/* <section id="work" className="container mx-auto max-w-5xl px-4 py-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Work Experience</h2>
            <p className="text-muted-foreground">
              Check out my professional experience.
            </p>
          </div>
          <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 after:left-0 grid gap-10">
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
              <div className="font-medium">Full Stack Developer</div>
              <div className="text-muted-foreground">
                MHC Asia Group | 2021 - Present
              </div>
              <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                <li>
                  Developed and maintained responsive web applications using
                  React, Redux, and Tailwind CSS.
                </li>
                <li>
                  Collaborated with cross-functional teams to implement new
                  features and optimize existing solutions.
                </li>
              </ul>
            </div>
            <div className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
              <div className="font-medium">Software Engineer</div>
              <div className="text-muted-foreground">
                Formulatrix | 2020 - 2021
              </div>
              <ul className="list-disc space-y-2 pl-4 text-muted-foreground">
                <li>
                  Developed and maintained responsive web applications using
                  React, Redux, and Tailwind CSS.
                </li>
                <li>
                  Collaborated with cross-functional teams to implement new
                  features and optimize existing solutions.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}
      <section id="contact" className="container mx-auto max-w-5xl px-4 py-20">
        <ContactForm />
      </section>
    </>
  );
  // return (
  //   <section className="blog-width blog-padding">
  //     <div className="flex flex-col gap-y-16">
  //       <div></div>
  //       <div>
  //         <div className="mb-4">
  //           <AvatarImage />
  //         </div>
  //         <Typography variant="h1" className="text-xl font-semibold">
  //           Hey, I&apos;m Dedi. I build stuff on web.
  //         </Typography>

  //         <Typography variant="p">
  //           I&apos;m a full-stack web developer based in Aceh, Indonesia.
  //         </Typography>

  //         <Typography variant="p">
  //           My main focus is developing web apps using the JavaScript ecosystem.
  //           I began my career as a Frontend Engineer working with React, then
  //           transitioned to Backend Engineering with Node.js, and now I work as
  //           a Fullstack Engineer. Additionally, I enjoy exploring other
  //           technologies, such as Go!
  //         </Typography>

  //         <Typography variant="p">
  //           Aside from work, I plan to write things I found interesting and
  //           things I explored. Feel free to check out my{" "}
  //           <Link href={"/blog"} className="link">
  //             blog
  //           </Link>
  //           .
  //         </Typography>
  //       </div>
  //       {/* <section className="flex flex-col space-y-6"> */}
  //       {/*   <Typography variant="h4">Featured articles</Typography> */}
  //       {/*   <FeatureArticle */}
  //       {/*     published_date={new Date()} */}
  //       {/*     title={ */}
  //       {/*       "How I Managed to Stay Stress-free despite Having 5 Fulltime Jobs" */}
  //       {/*     } */}
  //       {/*     summary={ */}
  //       {/*       "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet" */}
  //       {/*     } */}
  //       {/*     slug={"2023-review-what-i-could-do-better"} */}
  //       {/*   /> */}
  //       {/*   <FeatureArticle */}
  //       {/*     published_date={new Date()} */}
  //       {/*     title={ */}
  //       {/*       "Unlocking the Potential of MongoDB: Best Practices for Scalable Database Solutions" */}
  //       {/*     } */}
  //       {/*     summary={ */}
  //       {/*       "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet" */}
  //       {/*     } */}
  //       {/*     slug={"2023-review-what-i-could-do-better"} */}
  //       {/*   /> */}
  //       {/*   <FeatureArticle */}
  //       {/*     published_date={new Date()} */}
  //       {/*     title={ */}
  //       {/*       "Next.js Deep Dive: Building High-Performance React Applications" */}
  //       {/*     } */}
  //       {/*     summary={ */}
  //       {/*       "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet" */}
  //       {/*     } */}
  //       {/*     slug={"2023-review-what-i-could-do-better"} */}
  //       {/*   /> */}
  //       {/*   <Link href={"/blog"} className="link"> */}
  //       {/*     View all articles */}
  //       {/*   </Link> */}
  //       {/* </section> */}
  //       {/* <section> */}
  //       {/*   <div className="flex flex-col gap-y-6"> */}
  //       {/*     <Typography variant="h4">Featured projects</Typography> */}
  //       {/*     <FeatureProject */}
  //       {/*       title={"Chrommandr - Command Palette for Browser"} */}
  //       {/*       summary={ */}
  //       {/*         "A browser extension for showing command palette. It includes two commands: navigating to user's tabs and executing quick actions to browser (i.e. open settings page)" */}
  //       {/*       } */}
  //       {/*       slug={"2023-review-what-i-could-do-better"} */}
  //       {/*       github_link="https://github.com/ddsuhaimi/chrommandr" */}
  //       {/*     /> */}
  //       {/*     <FeatureProject */}
  //       {/*       title={"JagoASN - Online Exam Practice Platform"} */}
  //       {/*       summary={ */}
  //       {/*         "An online test and practice platform focusing on Indonesian's civil servant exams. It includes customizable tests, analytics, rankings and many more (with payment included too!). Technologies: Typescript, Next JS, Node JS, Postgres, " */}
  //       {/*       } */}
  //       {/*       slug={"2023-review-what-i-could-do-better"} */}
  //       {/*       demo_link="https://jagoasn.com" */}
  //       {/*     /> */}
  //       {/*     <FeatureProject */}
  //       {/*       title={"Go Screenshot API"} */}
  //       {/*       summary={ */}
  //       {/*         "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet" */}
  //       {/*       } */}
  //       {/*       slug={"2023-review-what-i-could-do-better"} */}
  //       {/*     /> */}
  //       {/*     <Link href={"/blog"} className="link"> */}
  //       {/*       View all projects */}
  //       {/*     </Link> */}
  //       {/*   </div> */}
  //       {/* </section> */}
  //       <div>
  //         <Typography variant="h4">Contact (or hire) me</Typography>
  //         <Typography variant={"p"}>
  //           I am available through these platforms:
  //         </Typography>
  //         <ul className="list-disc list-inside">
  //           <li>
  //             <Link
  //               href={"https://linkedin.com/in/dedi-suhaimi"}
  //               className="link"
  //             >
  //               linkedin
  //             </Link>
  //           </li>
  //           <li>
  //             <Link href={"https://github.com/ddsuhaimi"} className="link">
  //               github
  //             </Link>
  //           </li>
  //           <li>
  //             <Link href={"https://.com/ddsuhaimi_"} className="link">
  //               x (formerly twitter)
  //             </Link>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </section>
  // );
}
