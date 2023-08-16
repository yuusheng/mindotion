import { Client } from '@notionhq/client'
import type { MindotionNode, NotionBlockResponse, NotionQueryResponse } from '@/lib/types'

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

export async function getNotionPage(page_id: string) {
  const notion = getNotionClient()
  const children = await notion.pages.retrieve({
    page_id,
  })

  return children as NotionQueryResponse
}

/**
 * Get the children **pages** of a Notion block, just pages will be returned
 * @param block Notion block
 */
export async function getNodeChildrenFromBlock(blocks: NotionBlockResponse[]) {
  const children: MindotionNode[] = []

  async function dfs(_block: NotionBlockResponse) {
    if (_block.type === 'child_page') {
      const page = await getNotionPage(_block.id)
      console.log(page)
      const icon = getIcon(page)

      children.push({
        id: page.id,
        title: page.properties.title.title[0].plain_text,
        icon,
      })
      return
    }

    if (_block.has_children) {
      const _children = await getNotionBlocks(_block.id)
      for (const _child of _children) {
        if (_child.type === 'child_page') {
          const page = await getNotionPage(_child.id)
          const icon = getIcon(page)

          children.push({
            id: page.id,
            title: page.properties.title.title[0].plain_text,
            icon,
          })
        } else {
          await dfs(_child)
        }
      }
    }
  }

  await Promise.all(blocks.map(dfs))

  return children
}

export async function transformData(): Promise<MindotionNode[]> {
  const pages = await getNotionDatabases()

  return Promise.all(
    pages.map(async (page) => {
      const icon = getIcon(page)

      const blocks = await getNotionBlocks(page.id)
      const children = await getNodeChildrenFromBlock(blocks)

      return {
        id: page.id,
        title: page.properties.Name?.title[0].text.content,
        icon,
        children,
      }
    }),
  )
}

function getIcon(page: NotionQueryResponse) {
  let icon: string

  if (!page.icon)
    return null

  if (page.icon.type === 'emoji')
    icon = page.icon.emoji
  else if (page.icon.type === 'external')
    icon = page.icon.external.url
  else
    icon = page.icon.file.url

  return icon
}
