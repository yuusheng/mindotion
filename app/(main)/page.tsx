import { RiGithubFill } from 'react-icons/ri'
import { Button, LinkButton } from '~/components/ui/Button'
import packageJson from '~/package.json'

export default async function Home() {
  return (
    <>
      <section className='px-10 flex flex-col lg:px-28 lg:flex-row'>
        <div className='h-[calc(100vh-3.25rem)] flex flex-col gap-10 lg:w-2/3'>
          <h1 className='mt-36 text-6xl font-bold'>Transform your Notion page into mind map.</h1>
          <h2 className='text-xl text-zinc-400'>Mind Maps don&apos;t fully express Yourself? Give your mind map more possibilities with <strong>Mindotion</strong>!</h2>

          <div className='flex gap-3'>
            <LinkButton href={'/app'} size='lg'>
              Get started
            </LinkButton>
            <Button variant='secondary' size='lg' asChild>
              <a href={packageJson.homepage} target='_blank'><RiGithubFill className='mr-1'/>Star on Github</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
