import { getNotionPages } from './getNotionPages'
import type { Node } from './node'

export async function transformData(): Promise<Node[]> {
  const pages = await getNotionPages()

  return pages.map(page => ({
    id: page.id,
    title: page.properties.Name.title[0].text.content,
    icon: page.icon.external.url,
  }))
}
