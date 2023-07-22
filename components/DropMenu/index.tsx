'use client'

import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'

export default function DropMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  return (
    <DropdownMenu.Root open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>

      <AnimatePresence>
        {
          isDropdownOpen && (
            <DropdownMenu.Portal forceMount>
              <DropdownMenu.Content align='start' sideOffset={6}>
                <motion.div
                  className='max-w-[200px] p-2 flex flex-col gap-2 text-sm text-gray-200 rounded-md bg-gray-700/80 shadow-2xl backdrop-blur-sm origin-top-left'
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 0.95 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <DropdownMenu.Group className='flex flex-col gap-2'>
                    <DropdownMenu.Item>个人信息</DropdownMenu.Item>
                    <DropdownMenu.Item>修改密码</DropdownMenu.Item>
                  </DropdownMenu.Group>

                  <DropdownMenu.Separator className='h-px bg-gray-500/50'/>

                  <DropdownMenu.Group>
                    <DropdownMenu.Item>个人信息</DropdownMenu.Item>
                  </DropdownMenu.Group>
                </motion.div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          )
        }
      </AnimatePresence>

    </DropdownMenu.Root>
  )
}
