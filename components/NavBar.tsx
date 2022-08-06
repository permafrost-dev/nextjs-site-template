import NavigationBarLinks from '@/components/partials/Navigation/NavBarLinks';

export default function NavBar() {
    return (
        <header className="w-full bg-slate-700">
            <nav className="mx-auto w-full px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
                    <div className="flex w-full items-center justify-center">
                        <a href="#">
                            <div id="logoImage" className="mx-auto flex h-16 w-16 rounded-full bg-slate-400 text-center align-middle text-xs">
                                <div className="my-6 mx-auto">LOGO</div>
                            </div>
                        </a>
                        <div className="ml-10 hidden space-x-8 lg:block">
                            <NavigationBarLinks />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center space-x-4 py-4 lg:hidden">
                    <NavigationBarLinks />
                </div>
            </nav>
        </header>
    );
}
