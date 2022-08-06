import { AboutUs } from '@/partials/AboutUs';
import { Contact } from '@/partials/Contact';
import { Features } from '@/partials/Features';
import { Footer } from '@/partials/Footer';
import Head from 'next/head';
import { Header } from '@/partials/Header';
import { HeroCard } from '@/partials/HeroCard';
import { LogoCloud } from '@/partials/LogoCloud';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>My Next.js App</title>
            </Head>

            <main>
                <Header />
                <HeroCard />
                <LogoCloud />
                <AboutUs />
                <Features />
                <Contact />
            </main>

            <Footer />
        </>
    );
};

export default Home;
