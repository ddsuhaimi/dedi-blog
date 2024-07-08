import { getDatabase } from "@/lib/notion";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/lib/utils";
import Typography from "@/components/Typography";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";

type Props = {};

async function getPosts() {
  if (!process.env.ARTICLE_DATABASE_ID) {
    throw new Error("No article database id");
  }
  const posts = await getDatabase(process.env.ARTICLE_DATABASE_ID);
  const publishedPosts = posts.filter(
    (post: any) => post.properties.Published.checkbox
  );
  return publishedPosts;
}

export const revalidate = 10;
export const metadata: Metadata = {
  title: "Blog - Dedi",
  description: "Technical articles written by Dedi",
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

const posts2 = [
  {
    title: "Mastering React Hooks: A Comprehensive Guide",
    description:
      "Dive deep into the world of React Hooks and learn how to leverage them to build powerful and efficient applications.",
    date: "May 15, 2023",
    href: "/blogmastering-react-hooks",
  },
  {
    title: "Optimizing Web Performance: Strategies and Best Practices",
    description:
      "Learn how to optimize your web applications for lightning-fast performance and provide an exceptional user experience.",
    date: "April 28, 2023",
    href: "/blogoptimizing-web-performance",
  },
  {
    title: "Exploring the Power of TypeScript: A Beginner&apos;s Guide",
    description:
      "Discover the benefits of TypeScript and learn how to integrate it into your web development workflow.",
    date: "March 10, 2023",
    href: "/blogexploring-typescript",
  },
  {
    title: "Building a Serverless API with AWS Lambda",
    description:
      "Learn how to create a serverless API using AWS Lambda and API Gateway.",
    date: "February 20, 2023",
    href: "/blogserverless-api-with-aws-lambda",
  },
  {
    title: "Deploying a React App to Vercel",
    description:
      "A step-by-step guide on how to deploy a React application to Vercel.",
    date: "January 5, 2023",
    href: "/blogdeploying-react-to-vercel",
  },
  {
    title: "Integrating Stripe Payments into a React App",
    description:
      "A comprehensive guide on how to integrate Stripe payments into a React application.",
    date: "December 15, 2022",
    href: "/blogstripe-payments-in-react",
  },
];

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <section id="articles" className="container mx-auto max-w-5xl px-4 py-20">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold pt-6">Articles</h2>
          <p className="text-muted-foreground">
            Check out my latest blog posts.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-center border border-dashed rounded-lg p-12">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">No Articles Yet</h3>
              <p className="text-muted-foreground">
                I haven&apos;t published any articles yet, but check back soon!
              </p>
            </div>
          </div>
          {/* <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Card
                key={post.properties.Title.title[0].plain_text}
                className="overflow-hidden rounded-lg shadow-sm relative"
              >
                <div className="flex flex-col md:flex-row items-start md:gap-4">
                  <img
                    src={`https://picsum.photos/id/${Math.floor(
                      Math.random() * 10
                    )}/225/400`}
                    width={400}
                    height={225}
                    alt="Article Image"
                    className="h-40 w-full md:w-40 flex-shrink-0 object-cover object-center"
                  />
                  <div className="flex-1 space-y-2 p-2 md:p-0">
                    <div></div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(
                        new Date(post.properties["Published Date"].date.start)
                      )}
                    </div>
                    <h3 className="text-lg font-bold">
                      {post.properties.Title.title[0].plain_text}
                    </h3>
                    <p className="text-muted-foreground">
                      {" "}
                      {post.properties.Summary.rich_text[0].plain_text}
                    </p>
                    <div className="flex items-center justify-end md:absolute md:bottom-2 md:right-2">
                      <Link
                        href={`/blog/${post.properties.Slug.rich_text[0].plain_text}`}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/50"
                        prefetch={false}
                      >
                        <ArrowRightIcon className="h-4 w-4" />
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div> */}
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
