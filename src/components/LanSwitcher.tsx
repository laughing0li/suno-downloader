'use client'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { LanguageIcon } from '@heroicons/react/24/outline'
const languages = [
    { name: 'English', href: '/en', locale: 'en' },
    { name: '日本語', href: '/jp', locale: 'jp' },
    { name: ' 中文', href: '/ch', locale: 'ch' },
    { name: '한국어', href: '/ko', locale: 'ko' },
    // 西班牙语
    { name: 'Español', href: '/es', locale: 'es' },
    // 法语
    { name: 'Français', href: '/fr', locale: 'fr' },
    // 德语
    { name: 'Deutsch', href: '/de', locale: 'de' },
    // 意大利语
    { name: 'Italiano', href: '/it', locale: 'it' },
    // 葡萄牙语
    { name: 'Português', href: '/pt', locale: 'pt' },
    // 俄语
    { name: 'Русский', href: '/ru', locale: 'ru' },
    // 阿拉伯语
    { name: 'العربية', href: '/ar', locale: 'ar' },
    // 印地语
    { name: 'हिंदी', href: '/hi', locale: 'hi' },
]

export default function LanSwitcher() {
    const pathname = usePathname();
    const pathItems = pathname.split('/').filter(item => item !== '');
    // Default locale
    let currentLocale = 'EN';
    let toPath = '';

    if (pathname === '/') {
        toPath = '';
    } else if (pathItems.length === 1) {
        const [firstItem] = pathItems;
        if (isLocale(firstItem)) {
            currentLocale = firstItem.toUpperCase();
        } else {
            toPath = firstItem;
        }
    } else {
        const [firstItem, ...restItems] = pathItems;
        if (isLocale(firstItem)) {
            currentLocale = firstItem.toUpperCase();
            toPath = restItems.join('/');
        } else {
            currentLocale = 'EN';
            toPath = pathItems.join('/');
        }
    }
    console.log('currentLocale:', currentLocale);
    function isLocale(item: string) {
        return /^[a-z]{2}$/.test(item);  // Checks for two lowercase letters only
    }
    return (
        <Popover className="relative">
            <Popover.Button className="hover:cursor-pointer inline-flex outline-none items-center gap-x-1 text-sm font-semibold leading-6 text-slate-700">
                <LanguageIcon className="h-5 w-5" />
                <span className='text font-light font-mono mr-1'>{currentLocale}</span>
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
                    <div className="w-46 max-h-60 overflow-auto shrink rounded-xl p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        {languages.map((item) => (
                            <a className="block p-2 hover:text-indigo-600" key={item.name} href={
                                `/${item.locale}/${toPath}`
                            }>{item.name}</a>
                        ))}
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
