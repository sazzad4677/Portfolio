export default function JsonLd() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Md Sazzad Hossain',
        alternateName: 'Sazzad',
        url: 'https://sazzad.dev',
        image: 'https://sazzad.dev/banner.png',
        jobTitle: 'Software Engineer & Full-Stack Architect',
        description: 'Software Engineer from Bangladesh with almost 4 years of experience architecting scalable, AI-driven full-stack applications using Next.js, Node.js, and real-time systems.',
        knowsAbout: [
            'Software Engineering',
            'Full-Stack Development',
            'System Architecture',
            'React',
            'Next.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'TypeScript',
            'WebRTC',
            'Socket.io',
            'AI Integration',
            'Docker',
            'Tailwind CSS'
        ],
        sameAs: [
            'https://github.com/sazzad4677/',
            'https://www.linkedin.com/in/sazzad4673/',
        ],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'Bangladesh'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}