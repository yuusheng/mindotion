import { Client } from '@notionhq/client'

const databaseId = process.env.NOTION_DATABASE_ID!
const notionKey = process.env.NOTION_KEY!

export async function getNotion(req: any, res: any) {
  const notion = new Client({ auth: notionKey })

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Status',
      select: {
        equals: 'Open',
      },
    },
  })

  res.status(200).json({ data: response.results })
}
