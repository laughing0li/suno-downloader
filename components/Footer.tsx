import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";
import { useTranslations } from "next-intl"

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.mailgun.supportEmail, the link won't be displayed.

const Footer = () => {
    const t = useTranslations('footer')
    const navigation = {
        main: [
            { name: t('item1'), href: '/about' },
            { name: t('item2'), href: '/privacy' },
            { name: t('pricing'), href: '/pricing' },
        ],
        tools: [
            { name: t('music'), href: '/ai-music-generator' },
            { name: t('lyrics'), href: '/ai-lyrics-generator' },
            { name: t('item3'), href: '/' },
        ],
        links: [
            { name: 'ResumeGo', href: 'https://resumego.io' },
            { name: 'Soundify', href: 'https://soundifytext.io' },
            { name: 'PhotoRater', href: 'https://photorater.io' },
        ]
    }
  return (
    <footer className="bg-gradient-to-r from-[#ECF5FF] via-[#d2deee] to-[#ECF5FF] border-base-content/10">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href="/#"
              aria-current="page"
              className="flex gap-2 justify-center md:justify-start items-center"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                width={24}
                height={24}
                className="rounded-lg"
              >
              </Image>
              <strong className="font-extrabold tracking-tight text-base md:text-lg ml-4">
                {t('item3')}
              </strong>
            </Link>

            <p className="mt-3 text-sm text-base-content/80">
                {t('description')}
            </p>
            <p className="mt-3 text-sm text-base-content/60">
              {t('copyright')}
            </p>
          </div>
          <div className="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
              {t('links')}
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                {navigation.links.map((item, i) => (
                  <Link key={i} href={item.href} className="link link-hover">
                    {item.name}
                    </Link>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                {t('legal')}
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                {navigation.main.map((item, i) => (
                  <Link key={i} href={item.href} className="link link-hover">
                    {item.name}
                    </Link>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                Tools
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                {navigation.tools.map((item, i) => (
                  <Link key={i} href={item.href} className="link link-hover">
                    {item.name}
                    </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
