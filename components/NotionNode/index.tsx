import { Handle, Position } from 'reactflow'
import Image from 'next/image'
import { memo } from 'react'

export interface NotionNodeProps {
  title: string
  icon?: string
  cover?: string
  url: string
  children?: NotionNodeProps[]
}

function NotionNode({ data }: any) {
  const { title, icon = '' } = data as NotionNodeProps

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <div className="h-[226px] w-[346px] flex flex-col rounded border border-zinc-200 bg-white">
        <div className='h-4/5 w-full border-b'>
          {/* {cover && cover.startsWith('http') ? <Image src={cover} alt={title} /> : cover} */}

        </div>
        <div className='px-3 flex-1 flex items-center gap-2'>
          <span className='w-[18px] h-[18px]'>
            {icon && icon.startsWith('http') ? <Image src={icon} width={18} height={18} alt={title} /> : icon}
          </span>
          {title}
        </div>
      </div>
    </>
  )
}

export default memo(NotionNode)
