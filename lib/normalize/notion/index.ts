import { getNotionBlocks, getNotionDatabases, getNotionPage } from './apis'
import type { MindotionNode, NotionBlockResponse, NotionQueryResponse } from '~/lib/types'

/**
 * Transform Notion data to Mindotion data
 * @returns MindotionNode list
 */
export async function transformData(): Promise<MindotionNode[]> {
  const pages = await getNotionDatabases()

  return Promise.all(
    pages.map(async (page) => {
      const icon = getIcon(page)

      const blocks = await getNotionBlocks(page.id)
      const children = await getChildrenFromBlocks(blocks)

      return {
        id: page.id,
        title: page.properties.Name?.title[0].text.content,
        icon,
        children,
      }
    }),
  )
}

/**
 * Get the children **pages** of a Notion block, just pages will be returned
 * @param blocks Notion blocks, using blocks to make sure dfs doesn't include parent blocks
 */
async function getChildrenFromBlocks(blocks: NotionBlockResponse[]) {
  const children: MindotionNode[] = []

  async function dfs(block: NotionBlockResponse) {
    if (block.type === 'child_page') {
      const page = await getNotionPage(block.id)
      const icon = getIcon(page)

      children.push({
        id: page.id,
        title: page.properties.title.title[0].plain_text,
        icon,
      })
      return
    }

    if (block.has_children) {
      const blocks = await getNotionBlocks(block.id)
      await Promise.all(blocks.map(dfs))
    }
  }

  await Promise.all(blocks.map(dfs))
  return children
}

function getIcon(page: NotionQueryResponse) {
  switch (page.icon?.type) {
    case 'emoji':
      return page.icon.emoji
    case 'external':
      return page.icon.external.url
    case 'file':
      return page.icon.file.url
    default:
      return null
  }
}
