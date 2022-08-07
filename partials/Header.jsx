/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';

export function Header() {
    let [open, setOpen] = useState(false);

    const logoUrl = 'https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg';

    const sections = [
        { name: 'About Us', url: '#about-us' },
        { name: 'Technologies', url: '#technologies' },
        { name: 'Development', url: '#development' },
        { name: 'Contact', url: '#contact' },
    ];

    return (
        <header>
            <div className="relative bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span className="sr-only">Home</span>
                            <img className="h-12 w-auto sm:h-10" src={logoUrl} alt="Logo" />
                        </a>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <button
                            onClick={() => setOpen(!open)}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <nav className="hidden items-center justify-center space-x-10 md:flex">
                        {sections.map(section => (
                            <a key={section.name} href={section.url} className="text-base font-medium text-gray-500 hover:text-gray-900">
                                {section.name}
                            </a>
                        ))}
                    </nav>
                </div>

                {open && (
                    <div className="absolute inset-x-0 top-0 z-30 origin-top-right p-2 transition md:hidden">
                        <div className="ring-opacity/5 divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black">
                            <div className="px-5 pt-5 pb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <img className="h-8 w-auto" src={logoUrl} alt="Logo" />
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            onClick={() => setOpen(!open)}
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Close menu</span>
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-6 px-5">
                                <div className="grid grid-cols-2 gap-4">
                                    {sections.map(section => (
                                        <a key={section.name} href={section.url} className="text-base font-medium text-gray-900 hover:text-gray-700">
                                            {section.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
