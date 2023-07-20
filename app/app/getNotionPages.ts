import { Client } from '@notionhq/client'
import type { Node } from './node'

const databaseId = process.env.NOTION_DATABASE_ID!
const notionKey = process.env.NOTION_KEY!

export async function getNotionPages() {
  const notion = new Client({ auth: notionKey })

  const response = await notion.databases.query({
    database_id: databaseId,
  })

  return response.results as NotionQueryResponse[]
}

export async function transformData(): Promise<Node[]> {
  const pages = await getNotionPages()

  return pages.map(page => ({
    id: page.id,
    title: page.properties.Name.title[0].text.content,
    icon: page.icon.external.url,
  }))
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
  icon: {
    type: string
    external: {
      url: string
    }
  }
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
