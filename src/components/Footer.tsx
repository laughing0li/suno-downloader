import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'
import logo from "@/app/ship.png"
import Link from 'next/link'
import Image from "next/image"

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
        tools: [
            { name: 'ResumeGo', href: 'https://resumego.io' },
            { name: 'Soundify', href: 'https://soundifytext.io' },
            { name: 'PhotoRater', href: 'https://photorater.io' },
        ]
    }
    return (
        <footer className="bg-indigo-50" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 ">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link
                            className="flex items-center gap-2 shrink-0 mt-4 sm:mt-0"
                            href="https://shipfa.st/?via=yunlong"
                            title={`shipfast homepage`}
                        >
                            <span className="text-slate-800">Built with</span>
                            <Image
                                src={logo}
                                alt={`shipfast logo`}
                                className="w-24 bg-black"
                                priority={true}
                                width={100}
                                height={100}
                            />
                        </Link>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">LEGAL</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.main.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">TOOLS</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.tools.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} target="blank" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="mt-10 text-center text-xs leading-5 text-slate-800">
                        &copy; {new Date().getFullYear()} <a href="/"> - Suno Downloader</a>.
                    </p>
                </div>
            </div>
        </footer>
    )
}

