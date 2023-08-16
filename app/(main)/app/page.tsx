import Flow from './flow'
import { transformData } from '~/lib/normalize/notion'

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
