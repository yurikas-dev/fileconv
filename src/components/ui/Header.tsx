import Link from 'next/link';
import Image from 'next/image';
import { LangSwitcher } from './LangSwitcher';
import { NavMenu } from './NavMenu';

type Props = { locale: string };

export async function Header({ locale }: Props) {
  return (
    <header className='bg-white border-b border-gray-100 sticky top-0 z-50'>
      <div className='max-w-3xl mx-auto px-4 h-14 flex items-center justify-between'>
        <Link
          href={locale === 'en' ? '/en' : '/'}
          className='flex items-center hover:opacity-80 transition-opacity'
        >
          <Image
            src='/logo-header.svg'
            alt='FileConv'
            width={155}
            height={39}
            priority
          />
        </Link>
        <nav className='flex items-center gap-2'>
          <NavMenu locale={locale} />
          <LangSwitcher />
        </nav>
      </div>
    </header>
  );
}
