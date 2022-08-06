export default function NavigationBarLinks(props) {
    const linkClasses = `text-base font-medium text-white hover:text-indigo-200`;

    const pages = {
        Mint: '#',
        About: '#',
        FAQ: '#',
        Information: '#',
        Contact: '#',
    };

    return (
        <>
            {Object.keys(pages).map(page => (
                <a key={page} href={pages[page]} className={linkClasses} {...props}>
                    {page}
                </a>
            ))}
        </>
    );
}
