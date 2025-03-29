// Could be in a separate projectsData.js file or within page.tsx
export const projectsData = [
    {
      id: 'ecommerce',
      title: "Lab Invetory Management System",
      shortDescription: "Full-featured Lab Inventory management site with auth, product management, cart, payments...",
      longDescription: "Built using Laravel for the backend API and React for the dynamic frontend. Features include user registration/login, product catalog with search/filtering, shopping cart persistence, Stripe integration for payments, and an admin panel for managing products and orders. Containerized with Docker for easy deployment.",
      technologies: ["Laravel", "React", "MySQL", "Docker", "Stripe API", "Tailwind CSS"],
      images: [ // Add paths to your images (place them in the /public folder)
        '/images/projects/ecommerce-1.jpg',
        '/images/projects/ecommerce-2.jpg',
        '/images/projects/ecommerce-3.jpg',
      ],
      links: {
        github: '#', // Replace with actual link
        demo: '#'    // Replace with actual link
      }
    },
    {
      id: 'fitness-app',
      title: "Book Hive",
      shortDescription: "Cross-platform mobile app specially for Srilankan reading community...",
      longDescription: "Developed with React Native for cross-platform compatibility (iOS/Android). Uses Firebase for backend services including authentication, Firestore database for user data storage (workouts, goals, nutrition logs), and Cloud Functions for potential background tasks. Features progress charts using a charting library and social sharing options.",
      technologies: ["React Native", "Firebase Auth", "Firestore", "Java/Kotlin (Native Modules)", "Charting Lib"],
      images: [
         '/images/projects/fitness-1.png',
         '/images/projects/fitness-2.png',
      ],
      links: {
        github: '#',
        store: '#' // Link to Play Store/App Store if available
      }
    },
    // ... add detailed data for all your other projects
  ];