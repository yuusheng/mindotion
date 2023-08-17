import { Handle, Position } from 'reactflow'
import Image from 'next/image'
import { memo } from 'react'
import type { MindotionNode } from '~/lib/types'

function NotionNode({ data }: any) {
  const { title, icon, children } = data as MindotionNode

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <div className="h-[226px] w-[346px] flex flex-col rounded border border-zinc-200 bg-white">
        <div className='h-4/5 w-full p-3 border-b'>
          {/* {cover && cover.startsWith('http') ? <Image src={cover} alt={title} /> : cover} */}

          {
            children && children.map(child => (
              <div key={child.id} className='flex px-2 py-1 gap-1 hover:bg-zinc-300/50 rounded-md'>
                <span className='h-[18px] w-[18px] inline-block'>
                  {
                    child.icon && child.icon.startsWith('http')
                      ? <Image src={child.icon} width={18} height={18} className='w-[18px] h-[18px]' alt={child.title}/>
                      : child.icon
                  }
                </span>
                <span className='text-zinc-500'>{child.title}</span>
              </div>
            ))
          }
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
