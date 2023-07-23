import { transformData } from './getNotionPages'
import Flow from './flow'

export default async function App() {
  const pages = await transformData()

  return (
    <>
      <div className='h-full'>
        <Flow pages={pages}/>
      </div>
    </>
  )
}
