import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const navigation = {
    social: [
      {
        name: 'X',
        href: 'https://twitter.com/li_laughing_',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
          </svg>
        ),
      }
    ],
    main: [
      { name: t('item1'), href: '/about' },
      { name: t('item2'), href: '/privacy' },
    ],
  }
  return (
    <footer className="flex-none bg-slate-900">
      <Container className="flex flex-col items-center justify-between md:flex-row">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-8 sm:py-10 lg:px-8">
          <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <a href={item.href} className="text-medium leading-6 text-gray-100 hover:text-gray-400">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <p className="mt-10 text-center text-xs leading-5 text-gray-100">
            &copy; {new Date().getFullYear()} <a href="/"> - Suno Downloader</a>. 
          </p>
        </div>
      </Container>

    </footer>
  )
}
