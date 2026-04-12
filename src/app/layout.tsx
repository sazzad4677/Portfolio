import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../index.css';
import { ThemeProvider } from "@/components/theme-provider";
import JsonLd from './json-ld';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Sazzad Hosain | Frontend Developer & Software Engineer',
        template: '%s | Sazzad Hosain'
    },
    description: 'Sazzad is a passionate Software Engineer specializing in modern web technologies. Expert in React, Next.js, and TypeScript.',
    keywords: [
        'frontend developer', 'software engineer', 'Sazzad', 'Md Sazzad Hossain',
        'Full Stack Developer', 'React Developer', 'Next.js Developer',
        'TypeScript', 'Tailwind CSS'
    ],
    authors: [{ name: 'Md Sazzad Hossain', url: 'https://sazzad.dev' }],
    creator: 'Md Sazzad Hossain',
    publisher: 'Md Sazzad Hossain',
    metadataBase: new URL('https://sazzad.dev'),
    alternates: {
        canonical: 'https://sazzad.dev',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sazzad.dev/',
        title: 'Sazzad Hosain | Frontend Developer & Software Engineer',
        description: 'Building exceptional digital experiences with React, Next.js, and TypeScript.',
        siteName: 'Sazzad Hosain Portfolio',
        images: [
            {
                url: '/banner.png',
                width: 1200,
                height: 630,
                alt: 'Sazzad Hosain Portfolio',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sazzad Hosain | Frontend Developer & Software Engineer',
        description: 'Building exceptional digital experiences.',
        images: ['/banner.png'],
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-32x32.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
            <head>
                <JsonLd />
            </head>
            <body className={`${inter.className} antialiased selection:bg-primary/30 selection:text-primary`}>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="navy"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="min-h-screen bg-background transition-colors duration-500">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
