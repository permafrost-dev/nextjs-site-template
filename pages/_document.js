import Document, { Head, Html, Main, NextScript } from 'next/document';

class MainDocument extends Document {
    render() {
        const title = 'My Next.js App';
        const description = 'My Next.js App';
        const mediaCardImageUrl = 'https://mydomain.example/images/media-card.png';
        const websiteUrl = 'https://mydomain.example/';

        return (
            <Html>
                <Head>
                    <meta name="title" content={title} />
                    <meta name="description" content={description} />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={websiteUrl} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={mediaCardImageUrl} />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content={websiteUrl} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={description} />
                    <meta property="twitter:image" content={mediaCardImageUrl} />

                    <link rel="icon" href="/favicon.png" />
                    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@400;600;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MainDocument;
