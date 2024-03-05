'use client'

import { useTheme } from 'next-themes'
import { useState } from 'react'
import { useMount } from 'react-use'
import { Button } from './Button'
import { MoonIcon, SunIcon } from '~/assets'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useMount(() => setMounted(true))

  if (!mounted)
    return null

  return (
    <Button
      variant="text"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
