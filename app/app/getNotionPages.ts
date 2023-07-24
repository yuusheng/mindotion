import { Client } from '@notionhq/client'
import type { Node } from './node'

const databaseId = process.env.NOTION_DATABASE_ID!
const notionKey = process.env.NOTION_KEY!
let notion: Client | null = null

function getNotionClient() {
  if (!notion)
    notion = new Client({ auth: notionKey })

  return notion
}

export async function getNotionPages() {
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

  return children.results
}

export async function getNodeChildrenFromBlock(block: NotionBlock) {
  return block
}

export async function transformData(): Promise<Node[]> {
  const pages = await getNotionPages()

  return Promise.all(
    pages.map(async (page) => {
      let icon: string
      if (page.icon.type === 'emoji')
        icon = page.icon.emoji
      else if (page.icon.type === 'external')
        icon = page.icon.external.url
      else
        icon = page.icon.file.url

      // const children = await getNotionBlocks(page.id)
      // children.results.map(child => {
      //   child.
      // })

      return {
        id: page.id,
        title: page.properties.Name.title[0].text.content,
        icon,
      }
    }),
  )
}

export interface Title {
  type: string
  text: {
    content: string
    link?: any
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href?: any
}

export interface NotionQueryResponse {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: string
    id: string
  }
  last_edited_by: {
    object: string
    id: string
  }
  cover?: any
  icon: Icon
  parent: {
    type: string
    database_id: string
  }
  archived: boolean
  properties: {
    Date: {
      id: string
      type: string
      date?: any // todo
    }
    Status: {
      id: string
      type: string
      status: {
        id: string
        name: string
        color: string
      }
    }
    Assign: {
      id: string
      type: string
      people: any[] // todo
    }
    Name: {
      id: string
      type: string
      title: Title[]
    }
  }
  url: string
  public_url?: any
}

export type Icon = {
  type: 'external'
  external: {
    url: string
  }
} | {
  type: 'emoji'
  emoji: string
} | {
  type: 'file'
  file: {
    url: string
    expiry_time: string
  }
}

export interface NotionBlock {

}
