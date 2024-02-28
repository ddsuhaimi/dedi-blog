import { getDatabase } from "@/lib/notion";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/lib/utils";

type Props = {};

async function getPosts() {
  if (!process.env.NEXT_PUBLIC_ARTICLE_DATABASE_ID) {
    throw new Error("No article database id");
  }
  const posts = await getDatabase(process.env.NEXT_PUBLIC_ARTICLE_DATABASE_ID);
  return posts;
}

export const revalidate = 10;

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <div className="blog-width h-screen">
      <div>
        <section className="my-4">
          <h1 className="text-2xl">Blog</h1>
          <span className="text-lg text-slate-500">
            I write sometimes. Enjoy.
          </span>
          <hr className="border-slate-500 border-opacity-10 mt-2" />
        </section>
        {posts.map((post: any) => {
          return (
            <article key={post.id} className="my-4">
              <span className="text-slate-500">
                {formatDate(
                  new Date(post.properties["Published Date"].date.start)
                )}
              </span>
              <h2 className="text-xl">
                <Link
                  href={`/blog/${post.properties.Slug.rich_text[0].plain_text}`}
                >
                  {post.properties.Title.title[0].plain_text}
                </Link>
              </h2>
            </article>
          );
        })}
      </div>
    </div>
  );
}
