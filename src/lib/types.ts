export interface HeroContent {
    greeting: string;
    name: string;
    tagline: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    cvLink?: string;
    videoUrl?: string;
}

export interface AboutContent {
    paragraphs: string[];
    skillsHeading: string;
    profileImage: string;
}

export interface Skill {
    id: number;
    name: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    links: {
        github?: string;
        external?: string;
        admin?: string;
    };
    image: {
        url: string;
    };
    featured: boolean;
}

export interface Experience {
    id: number;
    company: string;
    name: string;
    position: string;
    range: string;
    website: string;
    description: string[];
    technologies?: string[];
}

export interface ContactContent {
    preHeading: string;
    heading: string;
    description: string;
    email: string;
    ctaText: string;
}

export interface SeoContent {
    title: string;
    description: string;
    keywords: string;
    author: string;
    linkedin: string;
}

export interface PortfolioContent {
    hero: HeroContent;
    about: AboutContent;
    skills: Skill[];
    projects: Project[];
    experience: Experience[];
    contact: ContactContent;
    seo?: SeoContent;
}
