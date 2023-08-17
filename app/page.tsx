import { Button, LinkButton } from '~/components/ui/Button'
import packageJson from '~/package.json'

export default async function Home() {
  return (
    <>
      <section className='flex flex-col gap-6'>
        <h1 className='text-6xl font-bold'>Mindotion</h1>

        <div className='flex gap-3'>
          <LinkButton href={'/app'}>
            Get started
          </LinkButton>
          <Button variant='secondary'>
            <a href={packageJson.homepage} target='_blank'>Star</a>
          </Button>
        </div>
      </section>
    </>
  )
}
