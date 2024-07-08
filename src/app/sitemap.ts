import { getDatabase } from "@/lib/notion";

const URL = "https://dedisuhaimi.com";
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
export default async function sitemap() {
  const posts = await getPosts();
  const slug_posts = posts.map((post) => ({
    slug: post.properties.Slug.rich_text[0].plain_text,
    date: post.last_edited_time,
  }));
  const fposts = slug_posts.map(({ slug, date }) => ({
    url: `${URL}/blog/${slug}`,
    lastModified: date,
  }));

  const routes = ["", "/blog", "/project", "/contact"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...fposts];
}
