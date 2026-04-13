"use client";

import React from "react";

interface SectionHeaderProps {
  sectionId: string;
  name: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ sectionId, name }) => {
  return (
    <div className="flex items-center space-x-4 mt-5 mb-10 ">
      <h2
        className={`font-bold capitalize text-on-background font-sans before:content-['${sectionId}.'] before:text-xl before:text-primary before:font-mono before:mr-2.5 whitespace-nowrap text-[clamp(26px,5vw,32px)]`}
      >
        {name}
      </h2>
      <span className="w-52 h-px bg-surface-variant" />
    </div>
  );
};  

export default SectionHeader;
