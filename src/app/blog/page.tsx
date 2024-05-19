import { getDatabase } from "@/lib/notion";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/lib/utils";
import Typography from "@/components/Typography";
import { Metadata } from "next";

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

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <div className="blog-width blog-padding">
      <div className="flex flex-col gap-y-16">
        <div></div>
        <div className="flex flex-col gap-y-8">
          <Typography variant="h1">Blog</Typography>
          {posts.map((post: any) => {
            return (
              <article key={post.id} className="flex flex-col gap-y-1">
                <Typography
                  variant="p"
                  affects="small"
                  className="text-slate-500"
                >
                  {formatDate(
                    new Date(post.properties["Published Date"].date.start)
                  )}
                </Typography>
                <Typography
                  variant="h2"
                  affects="removePMargin"
                  className="text-slate-900 font-medium text-lg border-0 pb-0 link"
                >
                  <Link
                    href={`/blog/${post.properties.Slug.rich_text[0].plain_text}`}
                  >
                    {post.properties.Title.title[0].plain_text}
                  </Link>
                </Typography>
                <Typography
                  variant="p"
                  affects="removePMargin"
                  className="text-slate-700"
                >
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet
                </Typography>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
