import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Portfolio from "@/components/sections/Portfolio";
import Certifications from "@/components/sections/Certifications";
import Publications from "@/components/sections/Publications";
import AdditionalInfo from "@/components/sections/AdditionalInfo";
import { cv } from "@/lib/cv-data";

export default function Page() {
  return (
    <div className="min-h-screen bg-bg">
      <Sidebar cv={cv} />
      {/* pt-14: offset for mobile sticky header; lg:ml-72: offset for desktop sidebar */}
      <main className="lg:ml-72 pt-14 lg:pt-0">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Hero />
          <Experience      experiences={cv.experiences}         />
          <Education       education={cv.education}             />
          <Skills          skills={cv.skills}                   />
          <Portfolio       portfolio={cv.portfolio}             />
          <Certifications  certifications={cv.certifications}   />
          <Publications    publications={cv.publications}       />
          <AdditionalInfo  languages={cv.languages} licenses={cv.licenses} />
        </div>
      </main>
    </div>
  );
}
