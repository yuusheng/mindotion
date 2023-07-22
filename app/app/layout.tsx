import 'reactflow/dist/style.css'
import DropMenu from '@/components/DropMenu'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className='p-4 flex'>
        <DropMenu />
      </header>
      {children}
    </>
  )
}
