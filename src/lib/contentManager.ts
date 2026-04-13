// Content Manager - Handles portfolio content using static data
// Backend functionality removed for modern pure-frontend architecture

import { defaultContent } from './defaultContent';
import { PortfolioContent, HeroContent, AboutContent, Skill, DetailedSkill, Service, Certification, Project, ArchiveProject, Experience, ContactContent, SeoContent } from './types';

type Listener = (content: PortfolioContent) => void;

class ContentManager {
    private content: PortfolioContent;
    private listeners: Set<Listener>;
    private initialized: boolean;

    constructor() {
        this.content = defaultContent;
        this.listeners = new Set();
        this.initialized = true;
    }

    get isInitialized(): boolean {
        return this.initialized;
    }

    // Subscribe to changes
    subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        // Call immediately with current content
        listener(this.content);
        return () => this.listeners.delete(listener);
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener(this.content));
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('seo-update'));
        }
    }

    // Get all content
    getAllContent(): PortfolioContent {
        return this.content;
    }

    // Modern "Save" - now just a local update (useful for state-driven UI)
    async saveAllContent(newContent: PortfolioContent): Promise<PortfolioContent> {
        this.content = newContent;
        this.notifyListeners();
        return this.content;
    }

    // Hero Section
    getHero(): HeroContent {
        return this.getAllContent().hero || defaultContent.hero;
    }

    // About Section
    getAbout(): AboutContent {
        return this.getAllContent().about || defaultContent.about;
    }

    // Skills
    getSkills(): Skill[] {
        return this.getAllContent().skills || [];
    }

    getDetailedSkills(): DetailedSkill[] {
        return this.getAllContent().detailedSkills || [];
    }

    // Services
    getServices(): Service[] {
        return this.getAllContent().services || [];
    }

    // Certifications
    getCertifications(): Certification[] {
        return this.getAllContent().certifications || [];
    }

    // Projects
    getProjects(): Project[] {
        return this.getAllContent().projects || [];
    }

    getArchiveProjects(): ArchiveProject[] {
        return this.getAllContent().archiveProjects || [];
    }

    getProject(projectId: number): Project | undefined {
        const projects = this.getProjects();
        return projects.find(p => p.id === projectId);
    }

    // Experience
    getExperience(): Experience[] {
        return this.getAllContent().experience || [];
    }

    getJob(jobId: number): Experience | undefined {
        const experience = this.getExperience();
        return experience.find(j => j.id === jobId);
    }

    // Contact
    getContact(): ContactContent {
        return this.getAllContent().contact || defaultContent.contact;
    }

    // SEO
    getSeo(): SeoContent {
        return this.getAllContent().seo || {
            title: '',
            description: '',
            keywords: '',
            author: '',
            linkedin: ''
        };
    }

    // Theme Management
    getTheme(): any {
        return (this.getAllContent() as any).theme || {
            defaultTheme: 'system',
            customThemes: []
        };
    }

    // Data Management
    async exportContent(): Promise<string> {
        return JSON.stringify(this.getAllContent(), null, 2);
    }

    async importContent(jsonString: string): Promise<boolean> {
        try {
            const data = JSON.parse(jsonString);
            await this.saveAllContent(data);
            return true;
        } catch (error) {
            console.error('Error importing content:', error);
            return false;
        }
    }

    async resetToDefaults(): Promise<boolean> {
        await this.saveAllContent(defaultContent);
        return true;
    }
}

// Create and export a singleton instance
const contentManager = new ContentManager();
export default contentManager;
