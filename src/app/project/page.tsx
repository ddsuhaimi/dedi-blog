import { getDatabase } from "@/lib/notion";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/lib/utils";
import Typography from "@/components/Typography";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";

type Props = {};

async function getProjects() {
  if (!process.env.PROJECT_DATABASE_ID) {
    throw new Error("No article database id");
  }
  const posts = await getDatabase(process.env.PROJECT_DATABASE_ID);
  const publishedProjects = posts.filter(
    (project: any) => true // project.properties.Published.checkbox
  );
  return publishedProjects;
}

export const revalidate = 10;
export const metadata: Metadata = {
  title: "Blog - Dedi",
  description: "Projects developed by Dedi",
};
function Article({ published_date, title, summary, slug }) {
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

export default async function ProjectPage() {
  const projects2 = await getProjects();
  // console.log(JSON.stringify(projects2, null, 2));

  // console.log("🚀 ~ ProjectPage ~ posts:", projects2);
  // const title = projects2[0].properties.Name.title[0].plain_text;
  // const slug = projects2[0].properties.Slug.rich_text[0].plain_text;
  // const thumbnail = projects2[0].properties.Thumbnail.files[0].url;
  // const screenshots = projects2[0].properties.Screenshot.files[0].url;
  // console.log(projects2[0].properties.Name.title[0].plain_text);
  // console.log(projects2[0].properties.Slug.rich_text[0].plain_text);
  return (
    <section id="projects" className="container mx-auto max-w-5xl px-4 py-20">
      <div className="space-y-8">
        <div className="space-y-4 pt-6">
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            Check out some of my recent projects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects2.map((project) => {
            const title = project.properties.Name.title[0]?.plain_text;
            const slug =
              project.properties.Slug.rich_text[0]?.plain_text || "#";

            const thumbnail =
              project.properties.Thumbnail.files[0].external.url;
            const description =
              project.properties.Description.rich_text[0]?.plain_text;
            return (
              <Card
                key={title}
                className="overflow-hidden rounded-lg shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex flex-col h-full cursor-pointer">
                  <img
                    src={thumbnail}
                    // width={400}
                    // height={225}
                    alt="Project Image"
                    className="h-40 w-full object-center object-cover"
                  />
                  <div className="flex flex-col justify-between flex-grow">
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-bold">{title}</h3>
                      <p className="text-muted-foreground mb-auto">
                        {description}
                      </p>
                    </div>
                    <div className="p-4 flex justify-end">
                      <Link
                        href={`/project/${slug}`}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        prefetch={false}
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
  // return (
  //   <div className="blog-width blog-padding">
  //     <div className="flex flex-col gap-y-16">
  //       <div></div>
  //       <div className="flex flex-col gap-y-8">
  //         <Typography variant="h1">Blog</Typography>
  //         {posts.map((post: any) => {
  //           return (
  //             <article key={post.id} className="flex flex-col gap-y-1">
  //               <Typography
  //                 variant="p"
  //                 affects="small"
  //                 className="text-slate-500"
  //               >
  //                 {formatDate(
  //                   new Date(post.properties["Published Date"].date.start)
  //                 )}
  //               </Typography>
  //               <Typography
  //                 variant="h2"
  //                 affects="removePMargin"
  //                 className="text-slate-900 font-medium text-lg border-0 pb-0 link"
  //               >
  //                 <Link
  //                   href={`/blog/${post.properties.Slug.rich_text[0].plain_text}`}
  //                 >
  //                   {post.properties.Title.title[0].plain_text}
  //                 </Link>
  //               </Typography>
  //               <Typography
  //                 variant="p"
  //                 affects="removePMargin"
  //                 className="text-slate-700"
  //               >
  //                 Amet minim mollit non deserunt ullamco est sit aliqua dolor do
  //                 amet sint. Velit officia consequat duis enim velit mollit.
  //                 Exercitation veniam consequat sunt nostrud amet
  //               </Typography>
  //             </article>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
}
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
