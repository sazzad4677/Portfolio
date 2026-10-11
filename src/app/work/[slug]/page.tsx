import { notFound } from "next/navigation";
import type { Metadata } from "next";
import contentManager from "@/lib/contentManager";
import CaseStudyContent from "@/components/Works/CaseStudyContent";
import CaseStudyNav from "@/components/Works/CaseStudyNav";
import { Project } from "@/lib/types";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return contentManager
        .getProjects()
        .filter((p: Project) => !!p.caseStudy)
        .map((p: Project) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = contentManager.getProjects().find((p: Project) => p.slug === slug);
    if (!project) return { title: "Case Study — Sazzad Hossain" };

    const title = `${project.title} — Case Study`;
    const description = project.outcomeLine || project.description;
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            ...(project.links.external && { url: project.links.external }),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const project = contentManager.getProjects().find((p: Project) => p.slug === slug);
    if (!project || !project.caseStudy) notFound();

    const contact = contentManager.getContact();
    const cvLink = contentManager.getHero().cvLink;
    const liveUrl = project.links?.external;

    return (
        <main className="relative min-h-[100dvh] w-full overflow-x-hidden pb-32">
            {/* Atmospheric glow — same as the home page for visual continuity */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]" />
                <div className="absolute -right-24 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/6 blur-[100px]" />
            </div>

            {/* Branded sticky top nav — same height as the home header */}
            <CaseStudyNav project={project} contact={contact} liveUrl={liveUrl} cvLink={cvLink} />

            <div className="relative z-10 site-container px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
                <CaseStudyContent project={project} />
            </div>
        </main>
    );
}
