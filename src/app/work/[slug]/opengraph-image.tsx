import { ImageResponse } from "next/og";
import contentManager from "@/lib/contentManager";
import type { Project } from "@/lib/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function OpenGraphImage({ params }: Props) {
    const { slug } = await params;
    const project = contentManager.getProjects().find((p: Project) => p.slug === slug);

    const title = project?.title ?? "Case Study";
    const subtitle = project?.outcomeLine || project?.description || "";
    const badge = project?.isCompanyProject
        ? `@ ${project.companyName ?? "Company"}`
        : project?.category || "Personal Project";
    const accent = "#7c3aed"; // primary purple

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 80,
                    background:
                        "radial-gradient(circle at 20% 0%, rgba(124,58,237,0.18), transparent 60%), linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
                    color: "#fafafa",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                {/* Top row: badge + Case study label */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 16px",
                            borderRadius: 999,
                            border: `1px solid ${accent}66`,
                            background: `${accent}1A`,
                            color: "#d8c5ff",
                            fontSize: 18,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                        }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 999,
                                background: accent,
                            }}
                        />
                        Case Study
                    </div>
                    <div
                        style={{
                            color: "#a1a1aa",
                            fontSize: 18,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                        }}
                    >
                        {badge}
                    </div>
                </div>

                {/* Middle: title + outcome */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: -1.5,
                            maxWidth: 1040,
                        }}
                    >
                        {title}
                    </div>
                    {subtitle ? (
                        <div
                            style={{
                                fontSize: 26,
                                lineHeight: 1.4,
                                color: "#d4d4d8",
                                maxWidth: 980,
                            }}
                        >
                            {subtitle.length > 180
                                ? subtitle.slice(0, 177) + "…"
                                : subtitle}
                        </div>
                    ) : null}
                </div>

                {/* Bottom: brand */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            fontSize: 22,
                            color: "#e4e4e7",
                            letterSpacing: 0.5,
                        }}
                    >
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: accent,
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: 18,
                            }}
                        >
                            S
                        </div>
                        sazzad.dev
                    </div>
                    <div
                        style={{
                            color: "#71717a",
                            fontSize: 18,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                        }}
                    >
                        Read on sazzad.dev
                    </div>
                </div>
            </div>
        ),
        { ...size },
    );
}
