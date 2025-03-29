"use client";
import { useState, useEffect, useRef } from "react";
//import Image from "next/image"; // Keep if you plan to add images later
import ProjectModal from "./src/components/ProjectModal";
import {projectsData} from "./projectsData"; // Import your projects data
import {
  FaReact, FaPhp, FaNodeJs, FaDatabase, FaMobileAlt, FaGitAlt,
  FaDocker, FaLinux, FaAws, FaJsSquare, FaPython, FaTerminal, FaRobot, FaMicrochip
} from 'react-icons/fa';
import { SiCplusplus, SiSharp, SiTailwindcss, SiLaravel, SiMongodb } from "react-icons/si";

type Project = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  images: string[];
  links: {
    github?: string;
    demo?: string;
    store?: string;
    video?: string;
    docs?: string;
    npm?: string;
    blog?: string;
  };
};

export default function Home() {

  
  const [typedText, setTypedText] = useState("");
  const fullText = "Hello, I'm Raveen Adhikari. Welcome to my terminal.";
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); 
  
  // Refs for each section
  const headerRef = useRef<HTMLElement>(null); // Ref for header height calculation
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const renderSkillLevel = (level: number, maxLevel = 10) => {
    const filledChar = '█'; // You can change this character (e.g., '#', '*')
    const emptyChar = '░'; // You can change this character (e.g., '.', '-')
    const filledCount = Math.max(0, Math.min(maxLevel, Math.round(level)));
    const emptyCount = maxLevel - filledCount;
  
    return (
      <span className="font-mono text-sm" aria-label={`${level} out of ${maxLevel}`}>
        <span className="text-green-500">{filledChar.repeat(filledCount)}</span>
        <span className="text-zinc-600">{emptyChar.repeat(emptyCount)}</span>
      </span>
    );
  };

  //skill levels
  const skillsData = {
    web: [
      { name: "React/Next.js", level: 9, icon: <FaReact /> },
      { name: "Laravel", level: 8.5, icon: <SiLaravel /> },
      { name: "HTML/CSS/JS", level: 9.5, icon: <FaJsSquare /> },
      { name: "Tailwind CSS", level: 8.8, icon: <SiTailwindcss /> },
    ],
    backend: [
      { name: "Node.js", level: 8.5, icon: <FaNodeJs /> },
      { name: "SQL (MySQL, PgSQL)", level: 9.2, icon: <FaDatabase /> },
      { name: "MongoDB", level: 8, icon: <SiMongodb /> },
      { name: "API Design (REST/GraphQL)", level: 8.8, icon: <FaTerminal /> }, // Example different icon
    ],
    mobile: [
       { name: "React Native", level: 8.5, icon: <FaMobileAlt /> },
       { name: "Java/Kotlin (Android)", level: 7.5, icon: <FaMobileAlt /> }, // Reusing icon
       { name: "Mobile UI/UX", level: 8, icon: <FaMobileAlt /> },
    ],
    devops: [
       { name: "Git/GitHub", level: 9, icon: <FaGitAlt /> },
       { name: "Docker", level: 8, icon: <FaDocker /> },
       { name: "Linux/Unix", level: 8.5, icon: <FaLinux /> },
       { name: "AWS Basics", level: 7.5, icon: <FaAws /> },
    ],
    languages: [
       { name: "JavaScript/TypeScript", level: 9.5, icon: <FaJsSquare /> },
       { name: "PHP", level: 9, icon: <FaPhp /> },
       { name: "Python", level: 8.5, icon: <FaPython /> },
       { name: "C/C++", level: 8, icon: <SiCplusplus /> },
       { name: "C# (.NET/Unity)", level: 6, icon: <SiSharp /> },
    ],
    hardware: [
       { name: "Arduino/PlatformIO", level: 8.5, icon: <FaMicrochip /> },
       { name: "Raspberry Pi", level: 8, icon: <FaRobot /> }, // Example different icon
       { name: "Embedded C", level: 7.5, icon: <FaTerminal /> },
       { name: "Circuit Design Basics", level: 7, icon: <FaMicrochip /> },
    ],
  };

  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]); // Added fullText dependency

  // Scroll to section
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement | null>, section: string) => {
    if (sectionRef.current) {
      // Calculate offset dynamically if needed, accounting for sticky header height
      // const headerHeight = headerRef.current?.offsetHeight || 80; // Example dynamic height
      // const yOffset = -headerHeight;
      // const y = sectionRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      // window.scrollTo({ top: y, behavior: 'smooth' });

      // Simpler method (might be slightly less precise depending on exact header height)
       sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

      setActiveSection(section);
      setIsMobileMenuOpen(false); // Close mobile menu on navigation
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Optional: Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // Optional: Restore body scroll
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener on component unmount or when modal closes
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
       // Ensure scroll is restored if component unmounts while modal is open
       if (isModalOpen) {
         document.body.style.overflow = 'auto';
       }
    };
  }, [isModalOpen]); 


  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // More robust offset calculation considering header height
      const headerHeight = headerRef.current?.offsetHeight || 80; // Default if ref not ready
      const scrollPosition = window.scrollY + headerHeight + 20; // Add a little buffer

      const sections = [
        { ref: homeRef, id: "home" },
        { ref: aboutRef, id: "about" },
        { ref: projectsRef, id: "projects" },
        { ref: skillsRef, id: "skills" },
        { ref: contactRef, id: "contact" },
      ];

      let currentSection = "home"; // Default to home if nothing else matches
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          currentSection = section.id;
          break;
        }
      }
       // Only update state if the active section has actually changed
      setActiveSection(prevSection => {
          if (prevSection !== currentSection) {
              return currentSection;
          }
          return prevSection;
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check in case the page loads scrolled down
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
     // Add headerRef to dependencies if using its height dynamically inside handleScroll
  }, [headerRef]);

  // Define common button classes for reuse
  const navButtonClasses = (sectionId: string) =>
    `block w-full text-left md:w-auto md:text-center px-3 py-2 transition-colors ${
      activeSection === sectionId
        ? "text-white bg-green-800"
        : "hover:text-white hover:bg-green-700"
    }`;

  return (
    // Use container for centered content, max-width, and padding
    // Adjusted padding for different screen sizes px-4 sm:px-6 lg:px-8
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      {/* Header / Navigation - Sticky */}
      {/* Added ref to header */}
      <header
        ref={headerRef}
        className="border-b border-green-700 pb-4 sticky top-0 bg-zinc-900 z-50 py-3 md:py-4 mb-8 md:mb-12"
      >
        {/* Main navigation container */}
        <nav className="flex flex-wrap justify-between items-center">
          {/* Logo/Brand Name */}
          <div className="text-lg font-bold">[Raveen@portfolio ~]$</div>

          {/* Mobile Menu Button (Visible only on small screens) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              {/* Simple Hamburger/Close Icon */}
              {isMobileMenuOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
              <span className="sr-only">Open main menu</span>
            </button>
          </div>

          {/* Desktop Navigation Links (Hidden on small screens) */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            <button onClick={() => scrollToSection(homeRef, "home")} className={navButtonClasses("home")}>
              ./home
            </button>
            <button onClick={() => scrollToSection(aboutRef, "about")} className={navButtonClasses("about")}>
              ./about
            </button>
            <button onClick={() => scrollToSection(projectsRef, "projects")} className={navButtonClasses("projects")}>
              ./projects
            </button>
            <button onClick={() => scrollToSection(skillsRef, "skills")} className={navButtonClasses("skills")}>
              ./skills
            </button>
            <button onClick={() => scrollToSection(contactRef, "contact")} className={navButtonClasses("contact")}>
              ./contact
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown (Conditionally rendered) */}
        {/* Use absolute positioning or manage layout flow carefully */}
        <div
          id="mobile-menu"
          className={`md:hidden ${ isMobileMenuOpen ? "block" : "hidden"} absolute top-full left-0 right-0 bg-zinc-800 border-b border-green-700 z-40`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button onClick={() => scrollToSection(homeRef, "home")} className={navButtonClasses("home")}>
               ./home
             </button>
             <button onClick={() => scrollToSection(aboutRef, "about")} className={navButtonClasses("about")}>
               ./about
             </button>
             <button onClick={() => scrollToSection(projectsRef, "projects")} className={navButtonClasses("projects")}>
               ./projects
             </button>
             <button onClick={() => scrollToSection(skillsRef, "skills")} className={navButtonClasses("skills")}>
               ./skills
             </button>
             <button onClick={() => scrollToSection(contactRef, "contact")} className={navButtonClasses("contact")}>
               ./contact
             </button>
          </div>
        </div>
      </header>

      {/* --- SECTIONS --- */}
      {/* Add pt-16 (or similar padding-top) to sections to offset the sticky header */}
      {/* Adjust mb- (margin-bottom) for spacing */}

      {/* Hero Section */}
      <section ref={homeRef} id="home" className="mb-20 md:mb-24 pt-16">
        <div className="font-mono">
          {/* Responsive text size */}
          <div className="text-2xl sm:text-3xl md:text-4xl mb-4">
            <span className="text-white">{typedText}</span>
            <span className="animate-pulse">_</span> {/* Blinking cursor */}
          </div>
          <p className="text-lg mb-8">
            Full-Stack Developer | Tech Polyglot | Continuous Learner
          </p>
          {/* Added overflow-x-auto for safety on small screens */}
          <div className="border border-green-700 p-4 bg-zinc-800 rounded overflow-x-auto">
            <p className="text-sm text-green-300">
              $ cat ./about-me.txt<br />
              <span className="text-white">
                I build solutions across the tech spectrum. From web and mobile to embedded systems,
                I thrive on mastering diverse technologies. My philosophy: I can learn anything and build everything.
              </span>
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={() => scrollToSection(projectsRef, "projects")}
              className="px-4 py-2 bg-green-700 text-white hover:bg-green-600 transition-colors"
            >
              $ cd ./projects
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="mb-20 md:mb-24 pt-16">
        <h2 className="text-xl sm:text-2xl mb-6 border-b border-green-700 pb-2">
          $ ./about --verbose
        </h2>
        {/* Grid stacks vertically on mobile, two columns on medium screens+ */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {/* Adjusted paragraph spacing */}
            <p className="mb-4">
              I&apos;m a multidisciplinary developer with expertise spanning web, mobile, and embedded systems development.
              My journey began with a fascination for electronics and robotics, but quickly expanded to encompass
              the entire technology stack.
            </p>
            <p className="mb-4">
              My approach to technology is driven by curiosity and adaptability. I believe in picking the right tool
              for each job, whether it&apos;s Laravel for web backends, React for interactive UIs, or C for embedded systems.
            </p>
            <p>
              I believe that continuous learning is the foundation of success in tech. Every new language or framework
              I master expands my ability to solve complex problems efficiently.
            </p>
          </div>
          {/* Code block container with overflow handling */}
          <div className="border border-green-700 p-4 bg-zinc-800 rounded overflow-x-auto">
            <pre className="text-sm text-green-300 whitespace-pre-wrap">
{`struct Developer {
  char name[50] = "Your Name";
  char education[100] = "B.S. Electronics & Comp Sci";
  char specialty[100] = "Full-Stack & Embedded";
  char philosophy[100] = "Can learn anything...";
  char currentFocus[100] = "C# with Unity & .NET";
  bool seekingNewChallenges = true;
};`}
            </pre>
          </div>
        </div>
      </section>

       {/* --- Projects Section --- */}
       <section ref={projectsRef} id="projects" className="mb-20 md:mb-24 pt-16">
        <h2 className="text-xl sm:text-2xl mb-6 border-b border-green-700 pb-2">
          $ ls -la ./projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map through project data */}
          {projectsData.map((project) => (
            // Added cursor-pointer and hover effect
            <div
              key={project.id}
              className="border border-green-700 p-4 bg-zinc-800 rounded flex flex-col cursor-pointer hover:border-green-500 hover:shadow-lg hover:shadow-green-900/30 transition-all duration-200"
              onClick={() => handleProjectClick(project)} // Attach onClick handler
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
              {/* Display Technologies Concisely */}
              <p className="text-green-300 mb-2 text-sm">
                 Tech: {project.technologies.slice(0, 4).join(', ')}{project.technologies.length > 4 ? '...' : ''}
              </p>
              <p className="mb-4 flex-grow text-sm sm:text-base">
                 {project.shortDescription}
              </p>
              {/* Simple link indication, details in modal */}
               <div className="flex space-x-4 mt-auto text-sm">
                 {project.links.github && <span className="text-green-400">GitHub</span>}
                 {project.links.demo && <span className="text-green-400">Demo</span>}
                 {project.links.store && <span className="text-green-400">Store</span>}
                 {/* Add others as needed */}
                 <span className="text-zinc-500 ml-auto">Click to view details</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="mb-20 md:mb-24 pt-16">
  <h2 className="text-xl sm:text-2xl mb-6 border-b border-green-700 pb-2">
    {/* Use a terminal-like icon */}
    <FaTerminal className="inline-block mr-2 align-baseline" />
    $ stat --format=&quot;%A %n&quot; ./skills/*
  </h2>

  {/* Grid layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">

    {/* Web Development Category */}
    <div>
      {/* Category Title with Icon */}
      <h3 className="text-lg sm:text-xl mb-4 flex items-center">
        <FaReact className="text-green-400 mr-3 text-xl" /> {/* Example Icon */}
        Web Development
      </h3>
      {/* Skills List */}
      <div className="space-y-2">
        {skillsData.web.map(skill => (
          <div key={skill.name} className="flex justify-between items-center">
            <span className="text-white flex items-center">
              {/* Optional: Icon per skill */}
              {/* {skill.icon && <span className="mr-2 opacity-80">{skill.icon}</span>} */}
              {skill.name}
            </span>
            {renderSkillLevel(skill.level)}
          </div>
        ))}
      </div>
    </div>

    {/* Backend & Databases Category */}
    <div>
      <h3 className="text-lg sm:text-xl mb-4 flex items-center">
        <FaDatabase className="text-green-400 mr-3 text-xl" />
        Backend & Databases
      </h3>
      <div className="space-y-2">
        {skillsData.backend.map(skill => (
          <div key={skill.name} className="flex justify-between items-center">
            <span className="text-white">{skill.name}</span>
            {renderSkillLevel(skill.level)}
          </div>
        ))}
      </div>
    </div>

    {/* Mobile Development Category */}
    <div>
      <h3 className="text-lg sm:text-xl mb-4 flex items-center">
        <FaMobileAlt className="text-green-400 mr-3 text-xl" />
        Mobile Development
      </h3>
      <div className="space-y-2">
        {skillsData.mobile.map(skill => (
          <div key={skill.name} className="flex justify-between items-center">
            <span className="text-white">{skill.name}</span>
            {renderSkillLevel(skill.level)}
          </div>
        ))}
      </div>
    </div>

    {/* DevOps & Tools Category */}
    <div>
      <h3 className="text-lg sm:text-xl mb-4 flex items-center">
        <FaDocker className="text-green-400 mr-3 text-xl" />
        DevOps & Tools
      </h3>
      <div className="space-y-2">
        {skillsData.devops.map(skill => (
          <div key={skill.name} className="flex justify-between items-center">
            <span className="text-white">{skill.name}</span>
            {renderSkillLevel(skill.level)}
          </div>
        ))}
      </div>
    </div>

    {/* Programming Languages Category */}
    <div>
      <h3 className="text-lg sm:text-xl mb-4 flex items-center">
        <FaTerminal className="text-green-400 mr-3 text-xl" /> {/* Generic Code Icon */}
        Programming Languages
      </h3>
      <div className="space-y-2">
        {skillsData.languages.map(skill => (
          <div key={skill.name} className="flex justify-between items-center">
            <span className="text-white">{skill.name}</span>
            {renderSkillLevel(skill.level)}
          </div>
        ))}
      </div>
    </div>

    {/* Hardware & Electronics Category */}
    <div>
       <h3 className="text-lg sm:text-xl mb-4 flex items-center">
         <FaMicrochip className="text-green-400 mr-3 text-xl" />
         Hardware & Electronics
       </h3>
       <div className="space-y-2">
         {skillsData.hardware.map(skill => (
          <div key={skill.name} className="flex justify-between items-center">
            <span className="text-white">{skill.name}</span>
            {renderSkillLevel(skill.level)}
          </div>
        ))}
      </div>
    </div>

  </div> {/* End Grid */}

  {/* Keep the Learning Philosophy section as is, or update its style too */}
  <div className="mt-12 border border-green-700 p-4 bg-zinc-800 rounded overflow-x-auto">
    <h3 className="text-lg sm:text-xl mb-4">Current Learning Focus:</h3>
    <pre className="text-sm text-green-300 whitespace-pre-wrap">
{`function learningProcess() {
const currentFocus = "C# with Unity and .NET";
const interests = ["ML", "AR/VR", "Adv DevOps"];

while(true) {
  learnNewTechnology();
  buildProjects();
  shareKnowledge();
  // Continuous loop
}
}`}
    </pre>
  </div>
</section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="mb-16 pt-16">
        <h2 className="text-xl sm:text-2xl mb-6 border-b border-green-700 pb-2">
          $ ./contact --send-message
        </h2>
        {/* Grid stacks on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info & Details */}
          <div>
            <p className="mb-6">
              Interested in collaborating or discussing opportunities? Reach out:
            </p>
            {/* Use word-break if long links/emails cause overflow */}
            <div className="space-y-3 break-words">
              <p>
                <span className="text-green-300">$ echo $EMAIL:</span>{" "}
                <a href="mailto:your.email@example.com" className="text-white hover:underline">
                  raveenrandika999@gmail.com
                </a>
              </p>
              <p>
                <span className="text-green-300">$ echo $GITHUB:</span>{" "}
                <a href="https://github.com/raveenadhikari" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                  github.com/raveenadhikari
                </a>
              </p>
              <p>
                <span className="text-green-300">$ echo $LINKEDIN:</span>{" "}
                <a href="https://www.linkedin.com/in/raveen-adhikari-84849a270/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                  linkedin.com/in/raveenadhikari
                </a>
              </p>
            </div>
             {/* Opportunities block */}
            <div className="mt-8 border border-green-700 p-4 bg-zinc-800 rounded overflow-x-auto">
              <pre className="text-sm text-green-300 whitespace-pre-wrap">
{`#!/bin/bash
echo "Open to discussing:"
echo "✓ Freelance projects"
echo "✓ Full-time roles"
echo "✓ Tech collaborations"
echo "✓ Open source work"
echo "✓ Mentorship"`}
              </pre>
            </div>
          </div>

          {/* Contact Form */}
          {/* Consider using a form service like Formspree, Netlify Forms, or a backend */}
          <div className="border border-green-700 p-4 bg-zinc-800 rounded">
             {/* Add onSubmit handler if implementing form submission */}
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 text-green-300">
                  $ Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name" // Add name attribute for form submission
                  required
                  className="w-full bg-zinc-700 text-white p-2 font-mono focus:outline-none focus:ring-1 focus:ring-green-500 rounded"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-green-300">
                  $ Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-zinc-700 text-white p-2 font-mono focus:outline-none focus:ring-1 focus:ring-green-500 rounded"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 text-green-300">
                  $ Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-zinc-700 text-white p-2 font-mono focus:outline-none focus:ring-1 focus:ring-green-500 rounded"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white hover:bg-green-600 transition-colors w-full rounded"
              >
                $ ./send.sh
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 md:mt-24 pt-6 pb-8 border-t border-green-700 text-sm text-green-300">
         {/* Flex layout for alignment, stacks vertically on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-2 md:space-y-0">
          <p>© {new Date().getFullYear()} [Your Name] | Built w/ Next.js & Tailwind</p>
          <p>
            $ echo &quot;Learn anything, build everything.&quot;
          </p>
        </div>
      </footer>
      {/* --- Modal Rendering --- */}
      {/* Render the modal conditionally */}
      {isModalOpen && selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}