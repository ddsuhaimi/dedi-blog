import React from "react";

import {
  fetchPageBlocks,
  getBlocks,
  getDatabase,
  getPage,
  notion,
} from "@/lib/notion";

import { NotionToMarkdown } from "notion-to-md";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeHighlight from "@/components/CodeHighlight";
import { formatDate } from "@/lib/utils";
import Typography from "@/components/Typography";

type Props = {
  params: {
    slug: string;
  };
};
export const revalidate = 100;

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_ARTICLE_DATABASE_ID) {
    throw new Error("DB Id is not defined");
  }
  const posts = await getDatabase(process.env.NEXT_PUBLIC_ARTICLE_DATABASE_ID);
  return posts.map((post) => ({
    slug: post.properties.Slug.rich_text[0].plain_text,
  }));
}

async function getPost(params) {
  if (!process.env.NEXT_PUBLIC_ARTICLE_DATABASE_ID) {
    throw new Error("Undefined Notion Database ID");
  }
  const slug = params.slug;
  const posts = await getDatabase(process.env.NEXT_PUBLIC_ARTICLE_DATABASE_ID);
  const matchedPost = posts.filter(
    (p) => p.properties.Slug.rich_text[0].plain_text === slug
  );

  const postId = matchedPost[0].id;
  const page = await getPage(postId);
  return page;
}

export default async function PostPage(props: Props) {
  // Get post's content and convert to markdown string
  const post = await getPost(props.params);
  const blocks = await fetchPageBlocks(post.id);
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.blocksToMarkdown(blocks);
  const mdString = n2m.toMarkdownString(mdblocks);

  const components = {
    pre: (props) => {
      const { node, ...rest } = props;
      return <CodeHighlight content={props.children} />;
    },
  };

  const shadcnProseStyle = `prose-h1:scroll-m-20 prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:lg:text-5xl
  prose-h2:scroll-m-20 prose-h2:border-b prose-h2:pb-2 prose-h2:text-3xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:first:mt-0
  prose-h3:scroll-m-20 prose-h3:text-2xl prose-h3:font-semibold prose-h3:tracking-tight
  prose-h4:scroll-m-20 prose-h4:text-xl prose-h4:font-semibold prose-h4:tracking-tight
  prose-p:leading-7 prose-p:[&:not(:first-child)]:mt-6`;
  return (
    <div className="blog-width blog-padding">
      <div className="flex flex-col gap-y-16">
        <div></div>
        <article className={"prose prose-slate " + shadcnProseStyle}>
          <Typography
            variant="p"
            affects="small"
            className="not-prose text-slate-500 mt-0 my-0"
          >
            {formatDate(new Date(post.properties["Published Date"].date.start))}
          </Typography>
          <h1>{post.properties.Title.title[0].plain_text}</h1>
          <Markdown remarkPlugins={[remarkGfm]} components={{ ...components }}>
            {mdString.parent}
          </Markdown>
        </article>
      </div>
    </div>
  );
}
