import { Client } from '@notionhq/client'

const databaseId = process.env.NOTION_DATABASE_ID!
const notionKey = process.env.NOTION_KEY!

export default async function Home() {
  const notion = new Client({ auth: notionKey })

  const response = await notion.databases.query({
    database_id: databaseId,
  })
  console.log(response.results)
  return <>
    <h1>Hi Next</h1>
    <div>{JSON.stringify(response.results)}</div>
  </>
}
