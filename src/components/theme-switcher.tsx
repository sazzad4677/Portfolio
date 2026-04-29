"use client"

import * as React from "react"
import { Moon, Sun, Palette, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Wait until mounted to avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return (
        <Button variant="outline" size="icon" disabled>
            <Palette className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    )

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="glass hover:bg-primary/10">
                    <Palette className="h-[1.2rem] w-[1.2rem] transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass shadow-xl">
                <DropdownMenuItem onClick={() => setTheme("navy")} className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    <span>Navy (Default)</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span>Light</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => setTheme("rose")} className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-rose-400" />
                    <span>Rose</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
                    <Laptop className="h-4 w-4" />
                    <span>System</span>
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
