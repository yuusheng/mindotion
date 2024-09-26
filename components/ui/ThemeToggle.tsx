'use client'

import { useTheme } from 'next-themes'
import { Button } from './Button'
import { MoonIcon, SunIcon } from '~/assets'
import { useMounted } from '~/hooks/useMounted'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { mounted } = useMounted()

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
