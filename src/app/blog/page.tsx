import { getDatabase } from "@/lib/notion";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/lib/utils";
import Typography from "@/components/Typography";

type Props = {};

async function getPosts() {
  if (!process.env.NEXT_PUBLIC_ARTICLE_DATABASE_ID) {
    throw new Error("No article database id");
  }
  const posts = await getDatabase(process.env.NEXT_PUBLIC_ARTICLE_DATABASE_ID);
  return posts;
}

export const revalidate = 10;

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
        <div className="flex flex-col gap-y-6">
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
                  className="text-slate-900 font-medium text-base border-0 pb-0"
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
