// Could be in a separate projectsData.js file or within page.tsx
export const projectsData = [
    {
      id: 'ecommerce',
      title: "Lab Invetory Management System",
      shortDescription: "Full-featured Lab Inventory management site with auth, product management, cart, payments...",
      longDescription: "A full featured Lab Inventory management site built with Codeigniter(PHP) and MySQL as backend database. It includes user authentication, role based permissions , comprahensive admin-dashboard, easily add components using CSV files and also a QR code feature to students for look for components in the university easily.",
      technologies: ["Codeigniter", "MySQL", "Fast API", "CSS"],
      images: [ // Add paths to your images (place them in the /public folder)
        
      ],
      links: {
        github: 'https://github.com/raveenadhikari/Lab-Inventory_system', // Replace with actual link
        demo: '#'    // Replace with actual link
      }
    },
    {
      id: 'BookHive',
      title: "Book Hive",
      shortDescription: "Cross-platform mobile app specially for Srilankan reading community...",
      longDescription: "Developed with React Native for cross-platform compatibility and Firebase for backend services. BookHive is a mobile application designed to connect readers and book lovers in Sri Lanka. Users can share their favorite books, discover new reads, and engage with a community of fellow bibliophiles. The app features user authentication, real-time database for book listings, and a user-friendly interface for seamless navigation.As a personal project, BookHive showcases my skills in mobile app development and my passion for reading. It serves as a platform for book enthusiasts to connect, share, and explore the world of literature together.Also users can add their own books to the app and also can review and share their own opinions on books.",
      technologies: ["React Native", "Firebase Auth", "Firestore", "Java/Kotlin (Native Modules)", ],
      images: [
         '/images/BookHive/BookHive01.jpeg',
         '/images/BookHive/BookHive02.jpeg',
      ],
      links: {
        github: 'https://github.com/raveenadhikari/Book-Hive',
        store: '#' // Link to Play Store/App Store if available
      }
    },
    {
      id:"Autonomus Inspection Robot",
      title: "Autonomous Inspection Robot",
      shortDescription: "A robot that can autonomously navigate and inspect a given area...",
      longDescription: "An autonomous inspection robot designed to navigate and inspect a given area. It utilizes advanced sensors and algorithms to map its environment, detect obstacles, and perform inspections autonomously. The robot is equipped with a camera for real-time monitoring and recognizing cracks and objects with computer vision and can be controlled remotely via a web interface. This project showcases my skills in robotics, computer vision, and remote control systems.",
      technologies: ["ESP-32/C++", "Python", "OpenCV", "Flask"],
      images: [
        //images/projects/inspection-robot-1.jpg',
      ],
      links: {
        github: 'https://github.com/raveenadhikari/Autonomous-Inspection-Robot',
        demo: '#', // Replace with actual link
    }
  },
  {
      id: 'Smart-Home-Power-Monitoring-System',
      title: "Smart Home Power Monitoring System",
      shortDescription: "A smart home power monitoring system that tracks energy consumption...",
      longDescription: "A smart home power monitoring system that tracks energy consumption and provides real-time data to users. The system uses IoT technology to monitor power usage in different appliances and sends alerts for unusual consumption patterns. Users can access the data through a web interface, allowing them to make informed decisions about their energy usage. This project demonstrates my skills in IoT development, data analysis, and user interface design.",
      technologies: ["Atmega 328","C", "Python", "Flask"],
      images: [
        //images/projects/smart-home-1.jpg',],
      ],
      links: {
        github: 'https://github.com/raveenadhikari/Smart-Energy_Meter',
        demo: '#', // Replace with actual link
        
      }
  }
    // ... add detailed data for all your other projects
  ];