import Image from 'next/image'
import type { Node } from './node'
import { transformData } from './getNotionPages'
import { Flow } from './flow'

export default async function App() {
  const pages = await transformData()

  return (
    <>
      <h1>app page</h1>
      <ul className="flex gap-7">
        {pages.map(page => (
          <li key={page.id}>
            <Card {...page} />
          </li>
        ))}
      </ul>
      <div className='h-96'>
        <Flow />
      </div>
    </>
  )
}

type CardProps = Node

function Card({ title, icon }: CardProps) {
  return <div className="p-2 border border-gray-700 flex flex-col bg-slate-200 rounded cursor-pointer">
    <div className='h-[24px] flex gap-1'>
      <Image src={icon} alt={title} width={24} height={24} className='rounded-full h-full w-auto'/>
      <h2 className='select-none'>{title}</h2>
    </div>
  </div>
}

