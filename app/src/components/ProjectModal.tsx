import React from 'react';
import Image from 'next/image'; // Use Next.js Image for optimization
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'; // Icons

// Define the props type based on the Project type in page.tsx
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

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent clicks inside the modal content from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start z-[100] p-4 sm:p-8 overflow-y-auto"
      onClick={onClose} // Close when clicking the overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Modal Content */}
      <div
        className="relative bg-zinc-900 border border-green-700 rounded-lg p-5 sm:p-8 max-w-4xl w-full my-10 sm:my-16 shadow-xl shadow-green-900/20"
        onClick={handleContentClick} // Prevent overlay click propagation
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-green-400 hover:text-white hover:bg-green-700 rounded-full transition-colors"
          aria-label="Close project details"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-white mb-4 pr-10">
          {project.title}
        </h2>

        {/* Image Carousel/Grid (Simple Example) */}
        {project.images && project.images.length > 0 && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.images.map((imgSrc, index) => (
              <div key={index} className="relative aspect-video border border-zinc-700 rounded overflow-hidden">
                 {/* Use next/image - ensure domain is configured if using external URLs */}
                <Image
                  src={imgSrc}
                  alt={`${project.title} screenshot ${index + 1}`}
                  layout="fill" // Or fixed/intrinsic/responsive depending on need
                  objectFit="cover" // Or contain
                  className="bg-zinc-800" // Placeholder background
                />
              </div>
            ))}
          </div>
        )}

        {/* Long Description */}
        <div className="text-green-300 mb-6 prose prose-invert prose-sm sm:prose-base max-w-none">
            {/* Use paragraphs or markdown parser if description is markdown */}
            {project.longDescription.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>


        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-lg text-white font-semibold mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-zinc-700 text-green-300 text-xs sm:text-sm px-3 py-1 rounded font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="border-t border-green-800 pt-4 flex flex-wrap gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-700 text-white hover:bg-green-600 transition-colors rounded text-sm"
            >
              <FaGithub className="mr-2" /> GitHub Repo
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-zinc-700 text-green-300 hover:bg-zinc-600 hover:text-white transition-colors rounded text-sm"
            >
              <FaExternalLinkAlt className="mr-2" /> Live Demo
            </a>
          )}
           {/* Add other link types similarly */}
          {project.links.store && (
             <a href={project.links.store} /*...*/ > Store Link </a>
          )}
           {project.links.video && (
             <a href={project.links.video} /*...*/ > Demo Video </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;