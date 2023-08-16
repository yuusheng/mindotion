/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from '@notionhq/client'
import { NextResponse } from 'next/server'

const databaseId = process.env.NOTION_DATABASE_ID!
const notionKey = process.env.NOTION_KEY!

export async function GET() {
  const notion = new Client({ auth: notionKey })

  const response = await notion.databases.query({
    database_id: databaseId,
  })

  const children = await notion.blocks.children.list({
    block_id: '68b5646c-7280-4064-85dc-7679325c75bf',
  })
  const blocks = await notion.pages.retrieve({
    page_id: '4b4c5b0c-3241-44f4-847b-49af900b854e',
  })

  const block = await notion.blocks.retrieve({
    block_id: '4b4c5b0c-3241-44f4-847b-49af900b854e',
  })

  return NextResponse.json(block)
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
