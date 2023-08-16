import { Client } from '@notionhq/client'
import type { NotionBlockResponse, NotionQueryResponse } from '@/lib/types'

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

  return response.results as NotionQueryResponse[]
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
  const children = await notion.blocks.retrieve({
    block_id,
  })

  return children as NotionBlockResponse
}

export async function getNotionPage(page_id: string) {
  const notion = getNotionClient()
  const children = await notion.pages.retrieve({
    page_id,
  })

  return children as NotionQueryResponse
}
