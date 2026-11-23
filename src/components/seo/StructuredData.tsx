export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Madhavan",
    "url": "https://madhavan.dev",
    "email": "madhavan2001vivo@gmail.com",
    "image": "https://madhavan.dev/og-image.jpg",
    "jobTitle": [
      "Cloud & DevOps Engineer",
      "Infrastructure Engineer",
      "Security Tool Builder",
      "AI Systems Architect"
    ],
    "description": "Cloud & DevOps engineer building intelligent infrastructure, security tools, and AI systems. 3+ years experience, 10+ open-source projects.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dindigul",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://github.com/madhavan2012",
      "https://linkedin.com/in/madhavan"
    ],
    "knowsAbout": [
      "Cloud Computing", "DevOps", "AWS", "GCP", "Docker", "Kubernetes",
      "Terraform", "Linux", "CI/CD", "GitHub Actions", "Python",
      "TypeScript", "Cybersecurity", "MITRE ATT&CK", "Tor Network",
      "AI Systems", "Gemini API", "OpenRouter", "LangChain",
      "Infrastructure Engineering", "Network Security"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Cloud & DevOps Engineer",
      "occupationLocation": { "@type": "Country", "name": "India" },
      "skills": "Cloud Infrastructure, DevOps, Cybersecurity, AI Systems"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Madhavan — Portfolio",
    "url": "https://madhavan.dev",
    "description": "Portfolio of Madhavan, a Cloud & DevOps Engineer from India.",
    "author": { "@type": "Person", "name": "Madhavan" },
    "inLanguage": "en-IN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://madhavan.dev/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://madhavan.dev/#hero" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://madhavan.dev/#about" },
      { "@type": "ListItem", "position": 3, "name": "Skills", "item": "https://madhavan.dev/#skills" },
      { "@type": "ListItem", "position": 4, "name": "Projects", "item": "https://madhavan.dev/#selected-works" },
      { "@type": "ListItem", "position": 5, "name": "Experience", "item": "https://madhavan.dev/#experience" },
      { "@type": "ListItem", "position": 6, "name": "Contact", "item": "https://madhavan.dev/#contact" }
    ]
  };

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Madhavan's Open Source Projects",
    "description": "Selected engineering projects by Madhavan — Cloud & DevOps Engineer",
    "itemListElement": [
      {
        "@type": "SoftwareSourceCode",
        "position": 1,
        "name": "GhostLink",
        "description": "Anonymous browser gateway routing requests through real Tor nodes with circuit visualization and HTML sanitization.",
        "programmingLanguage": ["Node.js", "Express", "JavaScript"],
        "codeRepository": "https://github.com/madhavan2012/ghostlink",
        "keywords": "anonymous browsing, tor browser, privacy tool, node.js"
      },
      {
        "@type": "SoftwareSourceCode",
        "position": 2,
        "name": "NetMonitor",
        "description": "Full cybersecurity operations platform with live packet capture, MITRE ATT&CK mapping, and 37-tool pen-test terminal.",
        "programmingLanguage": ["Python", "FastAPI", "React"],
        "codeRepository": "https://github.com/madhavan2012/netmonitor",
        "keywords": "cybersecurity platform, packet capture, MITRE ATT&CK, SIEM dashboard"
      },
      {
        "@type": "SoftwareSourceCode",
        "position": 3,
        "name": "Jarvis AI",
        "description": "Local AI assistant with radar HUD controlling entire OS. Voice-activated, 2s latency, multi-provider fallback.",
        "programmingLanguage": ["Python", "PyQt6"],
        "codeRepository": "https://github.com/madhavan2012/jarvis-ai",
        "keywords": "local AI assistant, voice OS control, Gemini Live, OpenRouter"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
    </>
  );
}
