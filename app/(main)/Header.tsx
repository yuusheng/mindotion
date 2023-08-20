import { Button } from '~/components/ui/Button'
import { Separator } from '~/components/ui/Separator'

function Header() {
  return (
    <>
      <header className='h-14 px-10 flex items-center justify-between lg:px-28'>
        <span className='font-bold'>
          Mindotion
        </span>

        <div className='text-zinc-700/50'>
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
