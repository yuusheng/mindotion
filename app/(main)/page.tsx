import { Button, LinkButton } from '~/components/ui/Button'
import packageJson from '~/package.json'

export default async function Home() {
  return (
    <>
      <section className='px-10 flex flex-col lg:px-28 lg:flex-row'>
        <div className='flex flex-col lg:w-1/2'>
          <h1 className='text-6xl font-bold'>Mindotion</h1>
          <h2 className='text-xl text-zinc-400'>Transform your <strong>Notion</strong> page into mind map.</h2>

          <div className='flex mt-14 gap-3'>
            <LinkButton href={'/app'}>
              Get started
            </LinkButton>
            <Button variant='secondary' asChild>
              <a href={packageJson.homepage} target='_blank'>Star</a>
            </Button>
          </div>
        </div>

        <div className='flex-1'>

        </div>
      </section>
    </>
  )
}
