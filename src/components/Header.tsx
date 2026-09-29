'use client'
import {Fragment, useState} from 'react'
import {Dialog, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, GlobeAltIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import Link from "next/link";
import {languages, localizedPath, repositoryUrl} from "~/config";
import {useCommonContext} from '~/context/common-context'
import LoadingModal from "./LoadingModal";
import Image from "next/image";
import GeneratingModal from "~/components/GeneratingModal";

const navigation = [
  {name: 'JSON Formatter', href: '/json-formatter'},
  {name: 'Timestamp', href: '/timestamp'}
]

function GitHubIcon({className}) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  );
}

export default function Header({
                                 locale = '',
                                 page = '',
                                 indexLanguageText
                               }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {setShowLoadingModal} = useCommonContext();

  const checkLocalAndLoading = (lang) => {
    if (locale != lang) {
      setShowLoadingModal(true);
    }
  }

  return (
    <header className="sticky top-0 bg-[#44403C] z-20 w-full">
      <LoadingModal loadingText={indexLanguageText.loadingText}/>
      <GeneratingModal generatingText={indexLanguageText.generateText}/>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href={localizedPath(locale)} className="-m-1.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
            <Image className="h-8 w-auto" src="/appicon.svg" alt="jsonformatter.cn" width={32} height={32}/>
          </a>
          <a href={localizedPath(locale)} className="-m-1.5 ml-0.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
            <Image
              className="h-8 w-auto"
              src="/jsonformatter.svg"
              width={732}
              height={74}
              alt="JSON Formatter"/>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={localizedPath(locale, item.href)}
              onClick={() => setShowLoadingModal(true)}
              className="text-sm font-semibold leading-6 text-white hover:text-blue-500">
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-1 justify-end">
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="mr-3 inline-flex items-center text-white/90 hover:text-white"
          >
            <GitHubIcon className="h-5 w-5"/>
          </a>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="inline-flex w-full justify-center gap-x-1.5 border border-[rgba(255,255,255,0.5)] rounded-md px-3 py-2 text-sm font-semibold text-white hover:border-[rgba(255,255,255,0.9)]">
              <GlobeAltIcon className="w-5 h-5 text-white"/>{locale == 'default' ? 'EN' : locale.toUpperCase()}
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true"/>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute right-0 z-10 mt-2 w-26 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {
                  languages.map((item) => {
                    const hrefValue = localizedPath(item.lang, page ? `/${page}` : '/');
                    return (
                      <Menu.Item key={item.lang}>
                        <Link href={hrefValue} onClick={() => checkLocalAndLoading(item.lang)}>
                              <span
                                className={'text-gray-700 block px-4 py-2 text-sm hover:text-[#2d6ae0]'}
                              >
                                {item.language}
                              </span>
                        </Link>
                      </Menu.Item>
                    )
                  })
                }
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10"/>
        <Dialog.Panel
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href={localizedPath(locale)} className="-m-1.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
              <Image className="h-8 w-auto" src="/appicon.svg" alt="jsonformatter.cn" width={32} height={32}/>
            </a>
            <a href={localizedPath(locale)} className="-m-1.5 ml-0.5 p-1.5" onClick={() => setShowLoadingModal(true)}>
              <Image
                className="h-8 w-auto"
                src="/jsonformatter.svg"
                width={732}
                height={74}
                alt="JSON Formatter"/>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={localizedPath(locale, item.href)}
                    onClick={() => setShowLoadingModal(true)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-blue-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center text-base font-semibold text-gray-900 hover:text-blue-500"
                >
                  <GitHubIcon className="h-5 w-5"/>
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
