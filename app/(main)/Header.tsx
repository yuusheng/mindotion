import { Brand } from '~/components/ui/Brand'
import { Button } from '~/components/ui/Button'
import { Separator } from '~/components/ui/Separator'
import { ThemeToggle } from '~/components/ui/ThemeToggle'

function Header() {
  return (
    <>
      <header className='h-14 px-10 flex items-center justify-between lg:px-28'>
      <Brand />
        <div className='text-zinc-700/50 flex items-center'>
          <ThemeToggle />
          <Button variant='text'>
            Login
          </Button>
        </div>
      </header>
      <Separator className='mb-8' />
    </>
  )
}

export default Header
