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
    a: (props) => {
      const { node, ...rest } = props;
      return (
        <span className="relative group">
          <a className="group-hover:text-white" {...rest}>
            {props.children}
          </a>
          <span className="absolute left-0 -bottom-1 w-full h-1 bg-orange-500 -z-10 group-hover:h-full group-hover:transition-all"></span>
        </span>
      );
    },
    pre: (props) => {
      const { node, ...rest } = props;
      return <CodeHighlight content={props.children} />;
    },
  };

  return (
    <article className="blog-width prose prose-a:no-underline py-4 ">
      <span className="text-slate-500">
        {formatDate(new Date(post.properties["Published Date"].date.start))}
      </span>
      <h1>{post.properties.Title.title[0].plain_text}</h1>
      <Markdown remarkPlugins={[remarkGfm]} components={{ ...components }}>
        {mdString.parent}
      </Markdown>
    </article>
  );
}
