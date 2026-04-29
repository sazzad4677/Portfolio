export interface HeroSocialLink {
    name: string;
    url: string;
    type: 'github' | 'linkedin' | 'email';
}

export interface HeroTechItem {
    label: string;
    color: string;
}

export interface HeroStat {
    value: string;
    label: string;
    sublabel: string;
    icon: string;
    color: string;
}

export interface HeroContent {
    greeting: string;
    name: string;
    tagline: string;
    headline: string;
    badgeText: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    cvLink?: string;
    videoUrl?: string;
    profileImage: string;
    socials: HeroSocialLink[];
    techStack: HeroTechItem[];
    stats: HeroStat[];
}

// ── About Section ──────────────────────────────────────────────
export interface AboutInfoCard {
    icon: string;
    title: string;
    description: string;
    variant: 'normal' | 'highlight' | 'minimal';
}

export interface AboutFeatureItem {
    icon: string;
    title: string;
    description: string;
}

export interface AboutTechChip {
    icon: string;
    label: string;
}

export interface AboutContent {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    description: string;
    quote: string;
    infoCards: AboutInfoCard[];
    cta: {
        text: string;
        buttonLabel: string;
        buttonLink: string;
    };
    coreWorkLabel: string;
    coreWorkItems: AboutFeatureItem[];
    techStackLabel: string;
    techStack: AboutTechChip[];
    /** @deprecated kept for backward compat */
    paragraphs: string[];
    skillsHeading: string;
    profileImage: string;
}

export interface Skill {
    id: number;
    name: string;
}

export interface DetailedSkillItem {
    name: string;
    level?: 'primary' | 'secondary' | 'familiar';
    /** @deprecated use level instead */
    highlight?: boolean;
}

export interface DetailedSkill {
    category: string;
    context?: string;
    items: DetailedSkillItem[];
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
    descriptionList?: string[];
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

export interface ArchiveProject {
    title: string;
    description: string;
    technologies: string[];
    featured?: boolean;
    links: {
        github: string;
        liveLink: string;
    };
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

export interface Education {
    id: number;
    school: string;
    degree: string;
    range: string;
    description: string[];
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
    archiveProjects: ArchiveProject[];
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
    contact: ContactContent;
    seo?: SeoContent;
}
