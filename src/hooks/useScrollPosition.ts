"use client";

import { useState, useEffect } from "react";

const useScrollPosition = (): number => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.pageYOffset);
        };

        window.addEventListener("scroll", updatePosition);
        updatePosition();

        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    return scrollPosition;
};

export default useScrollPosition;
