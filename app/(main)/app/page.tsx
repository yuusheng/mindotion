import Mindotion from './Mindotion'
import { transformData } from '~/lib/normalize/notion'

export default async function App() {
  const pages = await transformData()

  return (
    <>
      <div className='h-full'>
        <Mindotion pages={pages}/>
      </div>
    </>
  )
}
