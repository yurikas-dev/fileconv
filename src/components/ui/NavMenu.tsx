'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

type SubItem = {
  label: string;
  href: string;
  comingSoon?: boolean;
};

type DropdownNavItem = {
  kind: 'dropdown';
  label: string;
  subItems: SubItem[];
};

type FlatNavItem = {
  kind: 'flat';
  label: string;
  href: string;
};

type NavItem = DropdownNavItem | FlatNavItem;

type Props = {
  locale: string;
};

export function NavMenu({ locale }: Props) {
  const pathname = usePathname();
  const prefix = locale === 'en' ? '/en' : '';
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    {
      kind: 'dropdown',
      label: locale === 'en' ? 'Converter' : '変換',
      subItems: [
        {
          label: 'HEIC → JPG / PNG',
          href: `${prefix}/tools/converter/heic-to-jpg`,
        },
        {
          label: 'JPG → PNG / WebP',
          href: `${prefix}/tools/converter/jpg-converter`,
        },
        {
          label: 'PNG → JPG / WebP',
          href: `${prefix}/tools/converter/png-converter`,
        },
        {
          label: 'WebP → JPG / PNG',
          href: `${prefix}/tools/converter/webp-converter`,
        },
      ],
    },
    {
      kind: 'flat',
      label: locale === 'en' ? 'Audio' : '音声',
      href: `${prefix}/tools/audio/to-mp3`,
    },
    {
      kind: 'flat',
      label: locale === 'en' ? 'Compressor' : '圧縮',
      href: `${prefix}/tools/converter/image-compressor`,
    },
    {
      kind: 'flat',
      label: locale === 'en' ? 'Tips' : '記事',
      href: `${prefix}/blog`,
    },
  ];

  // パス変更でメニューを閉じる
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Clicking outside the menu will close the dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const soonLabel = locale === 'en' ? 'Soon' : '近日';

  return (
    <div ref={menuRef} className='flex items-center'>
      {/* ── Desktop nav ── */}
      <div className='hidden md:flex items-center gap-1'>
        {navItems.map((item) => {
          if (item.kind === 'flat') {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm px-2.5 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-brand-600 font-semibold'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            );
          }

          const isOpen = openMenu === item.label;
          const isActive = item.subItems.some(
            (s) => !s.comingSoon && pathname === s.href,
          );

          return (
            <div key={item.label} className='relative'>
              <button
                onClick={() => setOpenMenu(isOpen ? null : item.label)}
                className={`flex items-center gap-1 text-sm px-2.5 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-brand-600 font-semibold'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className='absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50'>
                  {item.subItems.map((sub) =>
                    sub.comingSoon ? (
                      <div
                        key={sub.label}
                        className='flex items-center justify-between px-4 py-2 text-sm text-gray-300 cursor-not-allowed'
                      >
                        <span>{sub.label}</span>
                        <span className='text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full'>
                          {soonLabel}
                        </span>
                      </div>
                    ) : (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setOpenMenu(null)}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          pathname === sub.href
                            ? 'text-brand-600 font-semibold bg-brand-50'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Mobile hamburger button ── */}
      <button
        onClick={() => setMobileOpen((prev) => !prev)}
        className='md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors'
        aria-label='メニューを開く'
      >
        {mobileOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
      </button>

      {/* ── Mobile panel ── */}
      {mobileOpen && (
        <div
          className='fixed top-14 left-0 right-0 bottom-0 z-40 bg-black/20'
          onClick={() => setMobileOpen(false)}
        >
          <div
            className='bg-white border-b border-gray-200 shadow-lg'
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              if (item.kind === 'flat') {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center px-5 py-3.5 text-sm border-b border-gray-100 transition-colors ${
                      isActive
                        ? 'text-brand-600 font-semibold bg-brand-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isExpanded = mobileExpanded === item.label;
              const isActive = item.subItems.some(
                (s) => !s.comingSoon && pathname === s.href,
              );

              return (
                <div key={item.label} className='border-b border-gray-100'>
                  <button
                    onClick={() =>
                      setMobileExpanded(isExpanded ? null : item.label)
                    }
                    className={`w-full flex items-center justify-between px-5 py-3.5 text-sm transition-colors ${
                      isActive
                        ? 'text-brand-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className='bg-gray-50 border-t border-gray-100'>
                      {item.subItems.map((sub) =>
                        sub.comingSoon ? (
                          <div
                            key={sub.label}
                            className='flex items-center justify-between px-8 py-3 text-sm text-gray-300 cursor-not-allowed'
                          >
                            <span>{sub.label}</span>
                            <span className='text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full'>
                              {soonLabel}
                            </span>
                          </div>
                        ) : (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className={`block px-8 py-3 text-sm transition-colors ${
                              pathname === sub.href
                                ? 'text-brand-600 font-semibold bg-brand-100'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
