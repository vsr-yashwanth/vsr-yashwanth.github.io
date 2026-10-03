import React from "react";
import Hero from "@/components/hero/Hero";
import Identity from "@/components/about/Identity";
import ProjectSection from "@/components/projects/ProjectSection";
import ResearchSection from "@/components/research/ResearchSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import TechConstellation from "@/components/stack/TechConstellation";
import WritingSection from "@/components/writing/WritingSection";
import LabSection from "@/components/lab/LabSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full bg-[#07090e]">
      {/* 01 // Identity & Hero */}
      <Hero />

      {/* 01.5 // Editorial Philosophy & Academics */}
      <Identity />

      {/* 02 // Selected Projects */}
      <ProjectSection />

      {/* 03 // Research Archive */}
      <ResearchSection />

      {/* 04 // Experience & Leadership */}
      <ExperienceSection />

      {/* 05 // Tech Constellation */}
      <TechConstellation />

      {/* 06 // The Notebook & Manuscripts */}
      <WritingSection />

      {/* 07 // The Experimental Lab */}
      <LabSection />

      {/* 08 // Transmission End & Contact */}
      <ContactSection />
    </div>
  );
}
