import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../index.css';
import { ThemeProvider } from "@/components/theme-provider";
import JsonLd from './json-ld';
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { InteractiveBackground } from "@/components/Background/InteractiveBackground";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Sazzad Hossain | Software Engineer & Full-Stack Architect',
        template: '%s | Sazzad Hossain'
    },
    description: 'Software Engineer with almost 4 years of experience architecting scalable, AI-driven full-stack applications. Expert in Next.js, Node.js, and real-time systems.',
    keywords: [
        'Software Engineer', 'Full Stack Developer', 'Sazzad Hossain', 'Md Sazzad Hossain',
        'React Developer', 'Next.js Developer', 'Node.js Developer', 'TypeScript',
        'Tailwind CSS', 'WebRTC', 'Socket.io', 'AI Integration', 'MongoDB', 'Express.js'
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
        title: 'Sazzad Hossain | Software Engineer & Full-Stack Architect',
        description: 'Architecting scalable, AI-driven full-stack systems with Next.js, React, Node.js, and MongoDB.',
        siteName: 'Sazzad Hossain Portfolio',
        images: [
            {
                url: '/banner.png',
                width: 1200,
                height: 630,
                alt: 'Sazzad Hossain - Software Engineer Portfolio',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sazzad Hossain | Software Engineer & Full-Stack Architect',
        description: 'Architecting scalable, AI-driven full-stack systems from server to screen.',
        images: ['/banner.png'],
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/favicon-32x32.png',
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
                <style>{`
                    html, body { background: #02050e; }
                    #initial-loader-check { display: none; }
                `}</style>
            </head>
            <body className={`${inter.className} antialiased`} suppressHydrationWarning>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="navy"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <div className="bg-mesh-layer" aria-hidden="true" />
                    <InteractiveBackground />
                    <main className="min-h-screen bg-transparent transition-colors duration-500">
                        <SmoothScroll>
                            {children}
                        </SmoothScroll>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
