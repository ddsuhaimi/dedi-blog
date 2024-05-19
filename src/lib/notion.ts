const { Client } = require("@notionhq/client");

// Initializing a client
export const notion = new Client({
  //   auth: process.env.NOTION_TOKEN,
  auth: process.env.SECRET_TOKEN || "",
});

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Published Date",
        direction: "descending",
      },
    ],
  });
  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};

export const fetchPageBlocks = async (pageId: string) => {
  const blocks = await notion.blocks.children.list({ block_id: pageId });
  return blocks.results;
};
