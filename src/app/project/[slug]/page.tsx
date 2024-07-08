import React from "react";
import type { Metadata, ResolvingMetadata } from "next";

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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: {
    slug: string;
  };
};
export const revalidate = 100;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!process.env.ARTICLE_DATABASE_ID) {
    throw new Error("DB Id is not defined");
  }
  const posts = await getDatabase(process.env.ARTICLE_DATABASE_ID);
  const post = posts.find(
    (post: any) => true //post.properties.Slug.rich_text[0].plain_text === params.slug
  );

  return {
    title: post.properties.Title.title[0].plain_text + " - Dedi",
  };
}

export async function generateStaticParams() {
  if (!process.env.PROJECT_DATABASE_ID) {
    throw new Error("DB Id is not defined");
  }
  const posts = await getDatabase(process.env.PROJECT_DATABASE_ID);
  return posts.map((post) => ({
    slug: post.properties.Slug.rich_text[0].plain_text,
  }));
}

async function getPost(params) {
  if (!process.env.PROJECT_DATABASE_ID) {
    throw new Error("Undefined Notion Database ID");
  }
  const slug = params.slug;
  const projects = await getDatabase(process.env.PROJECT_DATABASE_ID);
  const matchedProject = projects.filter(
    (p) => p.properties.Slug.rich_text[0].plain_text === slug
  );

  const postId = matchedProject[0].id;
  const page = await getPage(postId);
  return page;
}

export default async function ProjectPage(props: Props) {
  // Get post's content and convert to markdown string
  const post = await getPost(props.params);
  // const blocks = await fetchPageBlocks(post.id);
  const n2m = new NotionToMarkdown({ notionClient: notion });
  // const mdblocks = await n2m.blocksToMarkdown(blocks);
  const mdblocks = await n2m.pageToMarkdown(post.id);
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
  prose-p:leading-7 prose-p:[&:not(:first-child)]:mt-6
  prose-a:link`;

  const title = post.properties.Name.title[0].plain_text;
  const thumbnail = post.properties.Thumbnail.files[0]?.file.url;
  const description = post.properties.Description.rich_text[0]?.plain_text;
  const screenshots = post.properties.Screenshot.files.map(
    (item) => item.file.url
  );
  const githubLink = post.properties["Github Link"].url;
  const link = post.properties.Link.url;
  const technologies = post.properties.Technologies.multi_select.map(
    (item) => item.name
  );
  return (
    <section
      id="project-detail"
      className="container mx-auto max-w-5xl px-4 py-20 "
    >
      <div className="space-y-8">
        <div className="space-y-4 pt-6">
          <h2 className="text-3xl font-bold">Project Details</h2>
          <p className="text-muted-foreground">
            Learn more about this project.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={thumbnail}
              width={600}
              height={400}
              alt="Project Image"
              className="w-full rounded-lg object-cover object-center cursor-pointer transition-transform duration-300 hover:scale-105"
              //   onClick={() => {}}
            />
          </div>
          <div className="space-y-4 ">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p>{description}</p>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold">Technologies Used:</h4>
                <div className="flex-1 space-x-2">
                  {technologies.map((item) => (
                    <Badge>{item} </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Project Goals:</h4>
                <p>
                  The main goals of this project were to create a responsive and
                  visually appealing portfolio website that showcases my work.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              {githubLink && (
                <Link href={githubLink} prefetch={false}>
                  <Button>
                    <GithubIcon className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Button>
                </Link>
              )}
              {link && (
                <Link href={link} prefetch={false}>
                  <Button variant="secondary">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Visit Website
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Project Details</h3>
          <article
            className={`prose prose-gray max-w-none mx-auto lg:max-w-6xl dark:prose-invert prose-a:link`}
          >
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{ ...components }}
            >
              {mdString.parent}
            </Markdown>
          </article>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Project Screenshots</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {screenshots.map((url) => (
              <img
                key={url}
                src={url}
                width={600}
                height={400}
                alt="Project Screenshot 1"
                className="w-full rounded-lg object-cover object-center cursor-pointer transition-transform duration-300 hover:scale-105"
                //   onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function GithubIcon(props) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
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

function LinkIcon(props) {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
