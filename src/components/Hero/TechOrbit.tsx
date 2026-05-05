"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { Globe, Briefcase } from "lucide-react";
import type { HeroTechItem } from "@/lib/types";

/* ─── SVG icon registry (keyed by label) ─── */
const ICON_SVG: Record<string, React.ReactNode> = {
    "Node.js": <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#68A063"><path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.69.46 1.38 0 2.17-.84 2.17-2.3V8.55c0-.12-.1-.22-.22-.22h-.93c-.12 0-.22.1-.22.22v8.08c0 .65-.67 1.3-1.76.75L4.4 16.26a.27.27 0 0 1-.14-.24V7.44c0-.1.05-.19.14-.24l7.44-4.3c.08-.05.2-.05.29 0l7.44 4.3c.09.05.14.14.14.24v8.58c0 .1-.05.19-.14.24l-7.44 4.3c-.09.05-.2.05-.29 0l-1.9-1.13c-.08-.04-.17-.05-.25-.02-.69.31-.82.35-1.48.53-.16.05-.4.12.09.35l2.48 1.47c.24.14.5.21.78.21s.55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.24-.13-.51-.2-.78-.2z" /></svg>,
    "React": <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.6.045-.867.131C3.46 2.32 2.623 5.208 3.46 9.07c-2.745.764-4.46 1.947-4.46 3.225 0 1.278 1.714 2.461 4.46 3.225-.836 3.862.013 6.75 2.776 7.605.267.086.557.131.867.131 1.345 0 3.107-.96 4.888-2.622 1.78 1.653 3.541 2.602 4.887 2.602.31 0 .6-.045.867-.131 2.763-.855 3.612-3.743 2.775-7.605 2.746-.764 4.46-1.947 4.46-3.225 0-1.278-1.714-2.461-4.46-3.225.837-3.862-.012-6.75-2.775-7.605a2.42 2.42 0 0 0-.867-.131zM12 16.878c-2.69 0-4.878-2.189-4.878-4.878S9.31 7.122 12 7.122s4.878 2.189 4.878 4.878-2.189 4.878-4.878 4.878z" /></svg>,
    "TypeScript": <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#3178C6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.42.276.693.394l.87.348c.752.288 1.37.636 1.86 1.042.49.408.84.882 1.049 1.422.21.54.313 1.16.313 1.857 0 .9-.186 1.635-.558 2.207-.37.572-.9 1-1.586 1.285-.686.285-1.5.428-2.442.428-.893 0-1.694-.118-2.406-.353a5.075 5.075 0 0 1-1.824-1.024V17.18c.468.39.96.694 1.476.913.517.22 1.083.329 1.698.329.314 0 .597-.033.847-.1a1.6 1.6 0 0 0 .6-.303.744.744 0 0 0 .26-.573c0-.228-.082-.422-.246-.583-.163-.16-.399-.312-.71-.453a10.71 10.71 0 0 0-1.115-.434 8.502 8.502 0 0 1-1.476-.697 3.405 3.405 0 0 1-1.021-.952c-.248-.378-.372-.846-.372-1.404 0-.834.196-1.52.588-2.06.392-.538.938-.937 1.636-1.197a6.6 6.6 0 0 1 2.407-.39zm-9.898.482h5.606v1.758h-1.878V21h-1.85v-9.01H8.59V9.232z" /></svg>,
    "MongoDB": <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#47A248"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.238c.083-.396.161-.812.252-1.263.166-.823.363-1.726.586-2.602l.064-.244.066.235c.197.703.417 1.422.663 2.118.12.339.245.676.38.996l.073.148c.052-.158.097-.322.137-.488.317-1.356.345-2.79.132-4.172a8.693 8.693 0 0 0-.186-.98c2.427-2.054 3.69-5.03 3.878-8.393z" /></svg>,
    "Next.js": <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" /></svg>,
    "Express.js": <span className="font-mono text-[10px] font-bold leading-none text-on-background/90">eX</span>,
    "Prisma": <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M21.807 18.285L13.553.756a1.324 1.324 0 0 0-1.129-.754 1.31 1.31 0 0 0-1.206.626l-8.952 14.5a1.356 1.356 0 0 0 .016 1.455l4.376 6.778a1.408 1.408 0 0 0 1.58.581l12.703-3.757c.389-.115.707-.39.873-.755s.164-.783-.007-1.145zm-1.848.752L9.18 22.224a.452.452 0 0 1-.575-.52l3.85-18.438c.072-.345.549-.4.699-.08l7.129 15.138a.463.463 0 0 1-.324.713z" /></svg>,
    "PostgreSQL": <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#336791"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.826 2.865.334 4.482.632 6.748c.09.681.239 1.412.435 2.18.196.769.436 1.572.728 2.391a27.834 27.834 0 0 0 1.105 2.75c.226.468.468.919.742 1.32.137.2.284.39.458.549.087.079.187.158.31.218a.848.848 0 0 0 .403.08c.157-.006.3-.065.417-.138.349-.218.594-.544.784-.88.19-.336.328-.695.44-1.02.096-.278.178-.562.235-.83a5.19 5.19 0 0 0 1.07.378c-.053.182-.092.369-.104.563a2.557 2.557 0 0 0 .079.814 2.62 2.62 0 0 0 .108.305c-.848.387-2.328 1.168-2.724 2.475-.213.702-.09 1.447.348 2.076.437.627 1.181 1.098 2.153 1.285.604.116 1.3.143 2.063.066.583-.06 1.208-.18 1.858-.369a.932.932 0 0 0 .135.168c.145.148.335.268.54.322.346.091.69.046.989-.082a2.93 2.93 0 0 0 .673-.432c.2-.17.38-.358.532-.543.119-.144.224-.296.309-.454l.104.001c1.375.009 2.456-.283 3.299-.832a4.655 4.655 0 0 0 .748-.58c.06.077.116.145.18.22.332.39.759.725 1.316.87a2.5 2.5 0 0 0 .662.076c.317-.005.603-.093.852-.222.748-.389 1.222-1.061 1.574-1.756.527-1.042.854-2.234 1.088-3.148.055-.216.1-.41.148-.59l.021-.072c.17-.556.322-.996.49-1.533.33-1.052.618-2.123.733-3.265.116-1.149.056-2.377-.464-3.555-.52-1.177-1.49-2.29-3.102-3.178-.42-.232-.9-.402-1.416-.506-.124-.025-.25-.047-.38-.063A10.023 10.023 0 0 0 17.128 0z" /></svg>,
    "Supabase": <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#3ECF8E"><path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" /></svg>,
    "Python": <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#FFD43B"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" /></svg>,
};

interface TechBadge {
    label: string;
    icon: React.ReactNode;
    color: string;
    angle: number;
    ring: number; // 0 = inner, 1 = outer
}

const PARTICLES = [
    { x: "12%", y: "8%", size: 3, delay: 0 },
    { x: "85%", y: "15%", size: 2, delay: 0.5 },
    { x: "92%", y: "55%", size: 4, delay: 1.2 },
    { x: "8%", y: "72%", size: 2, delay: 0.8 },
    { x: "78%", y: "82%", size: 3, delay: 1.5 },
    { x: "20%", y: "90%", size: 2, delay: 2.0 },
];

interface TechOrbitProps {
    profileImage: string;
    name: string;
    techStack: HeroTechItem[];
}

const BASE = 520;
const IMG_H = 280;
const IMG_W = 220;
const ORBIT_R_INNER = 170;
const ORBIT_R_OUTER = 225;

const TechOrbit: React.FC<TechOrbitProps> = ({ profileImage, name, techStack }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const centerX = useRef(0);
    const centerY = useRef(0);
    const velocityRef = useRef(0);

    const rawAngle = useMotionValue(0);
    const angle = useSpring(rawAngle, { stiffness: 80, damping: 25, mass: 0.4 });

    /* Subtle cursor parallax effect */
    const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Inverse subtle shift: max 15px movement
            const x = (e.clientX / window.innerWidth - 0.5) * -30;
            const y = (e.clientY / window.innerHeight - 0.5) * -30;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    /* Build badge array — split across 2 rings to prevent overlap */
    const badges: TechBadge[] = techStack?.map((t, i) => {
        const ring = i % 2;  // alternate inner(0) / outer(1)
        const ringIndex = Math.floor(i / 2); // position within ring
        const countPerRing = Math.ceil(techStack.length / 2);
        return {
            label: t.label,
            icon: ICON_SVG[t.label] ?? <span className="text-[10px] font-bold">{t.label.slice(0, 2)}</span>,
            color: t.color,
            angle: (360 / countPerRing) * ringIndex + 270 + (ring * 36), // offset outer ring by 36°
            ring,
        };
    });

    useAnimationFrame(() => {
        if (!isDragging.current) {
            if (Math.abs(velocityRef.current) > 0.02) {
                velocityRef.current *= 0.96;
                rawAngle.set(rawAngle.get() + velocityRef.current);
            } else {
                velocityRef.current = 0;
                // Optimization: Disable idle sinusoidal animation on mobile to save main-thread work
                if (window.innerWidth < 768) return;

                const base = rawAngle.get();
                const speed = 0.08 + 0.03 * Math.sin(base * 0.005);
                rawAngle.set(base + speed);
            }
        }
    });

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        isDragging.current = true;
        lastX.current = e.clientX;
        lastY.current = e.clientY;
        velocityRef.current = 0;
        
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            centerX.current = rect.left + rect.width / 2;
            centerY.current = rect.top + rect.height / 2;
        }

        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }, []);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return;
        
        const dx = e.clientX - lastX.current;
        const dy = e.clientY - lastY.current;
        
        const rx = e.clientX - centerX.current;
        const ry = e.clientY - centerY.current;
        const r2 = rx * rx + ry * ry;
        
        if (r2 > 0) {
            const cross = rx * dy - ry * dx;
            const dAngle = (cross / Math.sqrt(r2)) * 0.4;
            
            velocityRef.current = dAngle;
            rawAngle.set(rawAngle.get() + dAngle);
        }
        
        lastX.current = e.clientX;
        lastY.current = e.clientY;
    }, [rawAngle]);

    const handlePointerUp = useCallback(() => { isDragging.current = false; }, []);

    const cx = BASE / 2;
    const cy = BASE / 2;

    return (
        /* Responsive wrapper: CSS scales the fixed-size orbit container */
        <div className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[460px] md:h-[460px] lg:w-[380px] lg:h-[380px] xl:w-[460px] xl:h-[460px] 2xl:w-[520px] 2xl:h-[520px]">
            <motion.div style={{ x: mouseX, y: mouseY }} className="h-full w-full">
                <div
                    ref={containerRef}
                    className="relative cursor-grab select-none active:cursor-grabbing origin-top-left w-full h-full"
                    style={{ transform: "scale(var(--orbit-scale,1))" }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    aria-hidden="true"
                >
                {/* Orbital rings */}
                {[140, 180, 225].map((r, i) => (
                    <div key={i} className="pointer-events-none absolute rounded-full border border-on-background/[0.06]" style={{
                        width: `${(r * 2 / BASE) * 100}%`, 
                        height: `${(r * 2 / BASE) * 100}%`, 
                        left: `${((cx - r) / BASE) * 100}%`, 
                        top: `${((cy - r) / BASE) * 100}%`,
                        ...(i === 2 ? { borderStyle: "dashed" } : {}),
                    }} />
                ))}

                {/* Glow */}
                <div className="pointer-events-none absolute rounded-full bg-primary/5 blur-[60px]"
                    style={{ width: '35%', height: '35%', left: '32.5%', top: '32.5%' }} />

                {/* Particles — Disabled on mobile for performance */}
                {PARTICLES.map((p, i) => (
                    <motion.div key={i}
                        className="pointer-events-none absolute rounded-full bg-primary/40 hidden md:block"
                        style={{ left: `${(p.x / BASE) * 100}%`, top: `${(p.y / BASE) * 100}%`, width: p.size, height: p.size }}
                        animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                    />
                ))}

                {/* Profile image */}
                <div className="absolute z-10 overflow-hidden rounded-2xl shadow-[0_15px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
                    style={{ width: '42.3%', height: '53.8%', left: '28.85%', top: '23.1%' }}>
                    <Image 
                        src={profileImage} 
                        alt={name} 
                        width={220} 
                        height={280} 
                        className="h-full w-full object-cover object-top" 
                        draggable={false} 
                        priority
                        quality={85}
                    />
                </div>

                {/* Orbiting badges */}
                {badges?.map((badge) => (
                    <OrbitBadge key={badge.label} badge={badge} angle={angle} cx={cx} cy={cy}
                        radius={badge.ring === 0 ? ORBIT_R_INNER : ORBIT_R_OUTER} BASE={BASE} />
                ))}

                <motion.div initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute z-30 rounded-xl border border-on-background/10 bg-[hsl(var(--surface-hsl)/0.85)] px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl"
                    style={{ bottom: '2%', right: '-2%' }}>
                    <div className="mb-1.5 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        <span className="font-sans text-xs font-bold uppercase tracking-wider text-on-background">Open to Work</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-on-surface-variant/60">
                        <span className="flex items-center gap-1"><Globe size={11} />Remote</span>
                        <span className="h-3 w-px bg-on-background/15" />
                        <span className="flex items-center gap-1"><Briefcase size={11} />Full-time</span>
                    </div>
                </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

/* ─── OrbitBadge ─── */
interface OrbitBadgeProps {
    badge: TechBadge;
    angle: ReturnType<typeof useSpring>;
    cx: number; cy: number; radius: number;
    BASE: number;
}

const OrbitBadge: React.FC<OrbitBadgeProps> = ({ badge, angle, cx, cy, radius, BASE }) => {
    const ref = useRef<HTMLDivElement>(null);

    useAnimationFrame(() => {
        if (!ref.current) return;
        const rad = ((angle.get() + badge.angle) * Math.PI) / 180;
        const x = cx + Math.cos(rad) * radius;
        // Use sin(rad) for depth since sin(rad) is 1 at the bottom (front) and -1 at the top (back)
        const z = Math.sin(rad);
        
        // Base Y plus perspective offset
        const y = cy + Math.sin(rad) * radius * 0.82 + z * 12;

        const t = (z + 1) / 2;  // 0 (back) → 1 (front)

        const scale = 0.75 + t * 0.45;      // 0.75 → 1.2
        const opacity = 0.35 + t * 0.65;    // 0.35 → 1.0
        const isMobile = window.innerWidth < 768;
        const blurVal = isMobile ? 0 : (1 - t) * 2;        // 2px → 0px (No blur on mobile)
        const zIdx = Math.round(t * 30);    // 0 → 30

        const xPct = (((x - cx) / BASE) * 100).toFixed(2);
        const yPct = (((y - cy) / BASE) * 100).toFixed(2);

        ref.current.style.transform = `translate(calc(-50% + ${xPct}%), calc(-50% + ${yPct}%)) scale(${scale.toFixed(3)})`;
        ref.current.style.zIndex = `${zIdx}`;
        ref.current.style.opacity = `${opacity.toFixed(3)}`;
        if (!isMobile) {
            ref.current.style.filter = blurVal > 0.1 ? `blur(${blurVal.toFixed(1)}px)` : 'none';
        } else {
            ref.current.style.filter = 'none';
        }
    });

    return (
        <div 
            ref={ref} 
            className="pointer-events-none absolute will-change-transform"
            style={{ left: '50%', top: '50%' }}
            aria-hidden="true"
        >
            <div className={`flex items-center gap-2 whitespace-nowrap rounded-full border border-on-background/[0.08] ${badge.color} px-3 py-1.5 shadow-lg shadow-black/10 backdrop-blur-lg text-on-background`}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-on-background/10">{badge.icon}</span>
                <span className="text-xs font-medium text-on-background">{badge.label}</span>
            </div>
        </div>
    );
};

export default TechOrbit;
