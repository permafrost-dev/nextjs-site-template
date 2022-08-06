import Image from 'next/image';
import heroImg from '../public/images/hero.svg';

export function HeroCard() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="relative z-10 h-full bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
                    <svg
                        className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 text-white lg:block"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true">
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>
                    <div className="w-full">
                        <div className="mt-1 w-full max-w-7xl px-4 sm:mt-1 sm:px-6 md:mt-1 lg:mt-1 lg:px-8 xl:mt-1">
                            <div className="text-center lg:text-left">
                                <h1 className="whitespace-nowrap text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
                                    <span className="block text-amber-600 xl:inline" style={{ fontFamily: 'Dosis, sans-serif' }}>
                                        My App
                                    </span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-lg lg:mx-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat est eget elit hendrerit blandit. Cras.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <a
                                            href="#about-us"
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 px-8 py-3 text-base font-medium text-white hover:bg-amber-700 md:py-4 md:px-10 md:text-lg">
                                            About Us
                                        </a>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <a
                                            href="#contact"
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-300 px-8 py-3 text-base font-medium text-amber-700 hover:bg-amber-400 md:py-4 md:px-10 md:text-lg">
                                            Contact
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <Image priority className="mt-1 h-48 w-full object-fill sm:h-72 md:h-full lg:w-full" src={heroImg} alt="" />
            </div>
        </div>
    );
}
