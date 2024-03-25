import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import LanSwitcher from './LanSwitcher'

export function Header() {
  return (
    <header className="relative z-50 flex-none lg:pt-11">
      <Container className="">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0 flex justify-between">
          <Logo className="h-12 w-auto text-slate-900" />
          <LanSwitcher />
        </div>
      </Container>
    </header>
  )
}
