import { initGA, logPageView } from '@/lib/analytics';
import type { AppProps } from 'next/app';
import { useMount } from 'react-use';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    useMount(() => {
        initGA();
        logPageView();
    });

    return (
        <div>
            <Component {...pageProps} />;
        </div>
    );
}

export default MyApp;
