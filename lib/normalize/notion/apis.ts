import { Client } from '@notionhq/client'
import type { NotionBlockResponse, NotionPageResponse } from '~/lib/types/notionTypes'

const databaseId = process.env.NOTION_DATABASE_ID!
const notionKey = process.env.NOTION_KEY!
let notion: Client | null = null

function getNotionClient() {
  if (!notion)
    notion = new Client({ auth: notionKey })

  return notion
}

export async function getNotionDatabases() {
  const notion = getNotionClient()
  const response = await notion.databases.query({
    database_id: databaseId,
  })

  return response.results as NotionPageResponse[]
}

export async function getNotionBlocks(block_id: string) {
  const notion = getNotionClient()
  const children = await notion.blocks.children.list({
    block_id,
  })

  return children.results as NotionBlockResponse[]
}

export async function getNotionBlock(block_id: string) {
  const notion = getNotionClient()
  const block = await notion.blocks.retrieve({
    block_id,
  })

  return block as NotionBlockResponse
}

export async function getNotionPage(page_id: string) {
  const notion = getNotionClient()
  const page = await notion.pages.retrieve({
    page_id,
  })

  return page as NotionPageResponse
}
