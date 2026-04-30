import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

const ShimmerLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[998] bg-background overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70vw_80vh_at_0%_38%,hsla(var(--primary-hsl)/0.12)_0%,transparent_62%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_68vw_78vh_at_100%_34%,hsla(var(--primary-hsl)/0.1)_0%,transparent_60%)]" />
            </div>

            <div className="site-container relative z-10 pt-32 space-y-24">
                {/* Hero Skeleton */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-16 w-3/4 md:h-20" />
                        <Skeleton className="h-16 w-1/2 md:h-20" />
                    </div>
                    <Skeleton className="h-24 w-2/3 md:h-32" />
                    <div className="flex gap-4">
                        <Skeleton className="h-12 w-40 rounded-lg" />
                        <Skeleton className="h-12 w-40 rounded-lg" />
                    </div>
                </div>

                {/* Projects Skeleton */}
                <div className="space-y-12">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-64" />
                        <div className="h-px flex-1 bg-border/20" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[1, 2].map((i) => (
                            <div key={i} className="rounded-2xl border border-border/40 bg-surface/20 p-6 space-y-6">
                                <Skeleton className="aspect-video w-full rounded-xl" />
                                <div className="space-y-3">
                                    <Skeleton className="h-6 w-1/2" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((j) => (
                                        <Skeleton key={j} className="h-6 w-20 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 pointer-events-none" />
        </div>
    );
};

export default ShimmerLoader;
