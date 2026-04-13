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

export interface DetailedSkill {
    category: string;
    items: string[];
}

export interface Certification {
    id: number;
    title: string;
    issuer: string;
    date: string;
    description: string;
    link?: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    modalDetails: string[];
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
    detailedSkills: DetailedSkill[];
    services: Service[];
    projects: Project[];
    experience: Experience[];
    certifications: Certification[];
    contact: ContactContent;
    seo?: SeoContent;
}
