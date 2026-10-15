export const cv = {
  name: "João Pedro Fontes",
  title: "Senior Backend Engineer",
  email: "mail@jpedrofontes.com",
  website: "jpedrofontes.com",
  github: "jpedrofontes",

  experiences: [
    {
      company: "Loka Inc.",
      logo: "/logos/loka.jpg",
      location: "Lisbon, Portugal",
      description:
        "Develop scalable backend systems and REST APIs in Python and FastAPI. Use Docker and cloud technologies to deliver production services with a focus on performance, reliability, security, and observability, while providing on-call support. Promoted to Senior Backend Engineer in October 2026.",
      roles: [
        {
          title: "Senior Backend Engineer",
          start: "Oct 2026",
          end: null as string | null,
        },
        {
          title: "Advanced Backend Engineer",
          start: "Sep 2024",
          end: "Sep 2026" as string | null,
        },
      ],
    },
    {
      company: "Swoove Studios",
      logo: "/logos/swoove.jpg",
      location: "Antwerp, Belgium",
      description:
        "Developed pose-estimation and reconstruction tools in Python and PyTorch to improve animation quality, integrating the results with procedural animation in Unity. Built an animation-search system combining Python-based natural language processing with Azure services.",
      roles: [
        {
          title: "R&D Engineer",
          start: "Jul 2023",
          end: "Aug 2024" as string | null,
        },
      ],
    },
    {
      company: "Accenture Portugal",
      logo: "/logos/accenture.jpg",
      location: "Braga, Portugal",
      description:
        "Consulted for Sky in telecommunications (September–December 2021), gaining hands-on Java backend experience, then worked on Worten's Golang/AWS order-tracking system (January 2022–June 2023). Contributed system enhancements and on-call troubleshooting support, and was promoted to Senior Analyst in January 2023.",
      roles: [
        {
          title: "Senior Analyst",
          start: "Jan 2023",
          end: "Jun 2023" as string | null,
        },
        {
          title: "Analyst",
          start: "Sep 2021",
          end: "Dec 2022" as string | null,
        },
      ],
    },
    {
        company: "CCG/ZGDV Institute",
      logo: "/logos/ccg.jpg",
      location: "Guimarães, Portugal",
      description:
        "Developed Python-based AI and computer-vision solutions for EU-funded projects in criminal investigation and Industry 4.0, connecting academic research with practical applications. Collaborated with multidisciplinary research teams and mentored incoming research fellows. Advanced from Research Fellow to Senior AI Researcher in October 2018.",
      roles: [
        {
          title: "Senior AI Researcher",
          start: "Oct 2018",
          end: "Jul 2021" as string | null,
        },
        {
          title: "Research Fellow",
          start: "Oct 2017",
          end: "Oct 2018" as string | null,
        },
      ],
    },
  ],

  education: [
    {
      degree: "Ph.D. in Information Systems and Technology",
      institution: "University of Minho",
      logo: "/logos/uminho.png",
      location: "Braga, Portugal",
      start: "2020",
      end: "2026" as string | null,
      description:
        "Focus: Development of Quantitative Imaging Biomarkers for cancer diagnosis and monitoring, applied to breast cancer.",
      thesis:
        '"A Framework for the Development of Quantitative Imaging Biomarkers for Cancer Research"',
      thesisLink: null as string | null,
    },
    {
      degree: "M.Sc. in Informatics Engineering",
      institution: "University of Minho",
      logo: "/logos/uminho.png",
      location: "Braga, Portugal",
      start: "2016",
      end: "2018" as string | null,
      description:
        "Specializations: Artificial Intelligence, Business Intelligence, Parallel and Distributed Computing.",
      thesis:
        '"Intelligent Medical Image Analysis: A Deep Learning Approach to Breast Cancer Diagnosis"',
      thesisLink: "https://hdl.handle.net/1822/59906" as string | null,
    },
    {
      degree: "B.Sc. in Informatics Engineering",
      institution: "University of Minho",
      logo: "/logos/uminho.png",
      location: "Braga, Portugal",
      start: "2013",
      end: "2016" as string | null,
      description:
        "Core curriculum covering programming, algorithms, computer architecture, databases, and advanced mathematics.",
      thesis: null as string | null,
      thesisLink: null as string | null,
    },
  ],

  skills: [
    {
      category: "Core Competencies",
          items: ["Backend Development", "API Design", "Cloud Infrastructure", "Machine Learning"],
    },
    {
      category: "Programming Languages",
      items: ["Python", "Golang", "SQL", "JavaScript / TypeScript", "C#", "Java"],
    },
    {
      category: "Frameworks & Tools",
      items: ["FastAPI", "Flask", "Django", "PyTorch", "TensorFlow", "Keras", "Node.js", "React", "Next.js"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Azure", "GCP", "Docker"],
    },
  ],

  publications: [
    {
      title: "Deep Learning Framework for Breast Cancer Subtypes Detection and Diagnosis",
      venue: "Biomedical Signal Processing and Control, vol. 130, 111532",
      publisher: "Elsevier",
      publisherLogo: "/logos/elsevier.png",
      year: 2027,
      status: null as string | null,
      link: "https://doi.org/10.1016/j.bspc.2026.111532" as string | null,
    },
    {
      title: "A Comprehensive Framework for Detecting and Diagnosing Breast Cancer Phenotypes in MRI",
      venue: "European Congress of Radiology (ECR), Poster C-24782",
      publisher: "ESR",
      publisherLogo: "/logos/esr.png",
      year: 2025,
      status: null as string | null,
      link: "https://doi.org/10.26044/ecr2025/C-24782" as string | null,
    },
    {
      title: "Accurate Phenotyping of Luminal A Breast Cancer in Magnetic Resonance Imaging: A New 3D CNN Approach",
      venue: "Computers in Biology and Medicine, vol. 189, 109903",
      publisher: "Elsevier",
      publisherLogo: "/logos/elsevier.png",
      year: 2025,
      status: null as string | null,
      link: "https://doi.org/10.1016/j.compbiomed.2025.109903" as string | null,
    },
    {
      title: "An Innovative Faster R-CNN-Based Framework for Automated Detection of Breast Cancer Pathological Lesions in MRI",
      venue: "Journal of Imaging, vol. 9, no. 9, 169",
      publisher: "MDPI",
      publisherLogo: "/logos/mdpi.png",
      year: 2023,
      status: null as string | null,
      link: "https://doi.org/10.3390/jimaging9090169" as string | null,
    },
    {
      title: "Deployment Service for Scalable Distributed Deep Learning Training on Multiple Clouds",
      venue: "11th Int. Conference on Cloud Computing and Services Science (CLOSER), 135–142",
      publisher: "SCITEPRESS",
      publisherLogo: "/logos/scitepress.png",
      year: 2021,
      status: null as string | null,
      link: "https://doi.org/10.5220/0010359601350142" as string | null,
    },
    {
      title: "Representation Learning Approach to Breast Cancer Diagnosis",
      venue: "European Congress of Radiology (ECR), Poster C-2062",
      publisher: "ESR",
      publisherLogo: "/logos/esr.png",
      year: 2019,
      status: null as string | null,
      link: "https://doi.org/10.26044/ecr2019/C-2062" as string | null,
    },
    {
      title: "AGATHA: Face Benchmarking Dataset for Exploring Criminal Surveillance Methods on Open Source Data",
      venue: "2018 Int. Conference on Graphics and Interaction (ICGI), 1–8",
      publisher: "IEEE",
      publisherLogo: "/logos/ieee.png" as string | null,
      year: 2018,
      status: null as string | null,
      link: "https://doi.org/10.1109/ITCGI.2018.8602903" as string | null,
    },
  ],

  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      badgeUrl: "/logos/aws.png",
      date: "Aug 2024",
      description:
        "Foundational understanding of IT services and their uses in the AWS Cloud. Demonstrated cloud fluency and foundational AWS knowledge.",
      link: "https://www.credly.com/badges/231b94a2-7fad-4832-a703-cfc479576929/public_url" as string | null,
    },
  ],

  portfolio: [
    {
      name: "JORA Aesthetics",
      description:
        "Full-stack website for an aesthetics clinic in Braga. Multilingual (PT/EN), blog with CMS, contact form, Instagram feed integration, and newsletter system.",
      url: "https://jora-aesthetics.pt" as string | null,
      repo: null as string | null,
      privateRepo: true,
      tags: [] as string[],
    },
    {
      name: "Breast Cancer Phenotype Classifier",
      description:
        "PhD research: classifies breast cancer MRI volumes into 4 molecular phenotypes (Luminal A/B, HER2-enriched, Triple-Negative) using 3D CNNs in TensorFlow/Keras.",
      url: null as string | null,
      repo: "https://github.com/jpedrofontes/phenotype-classifier",
      privateRepo: false,
      tags: ["Python", "TensorFlow", "Keras", "3D CNN", "Medical Imaging"],
    },
    {
      name: "Tumor Malignancy Predictor",
      description:
        "MSc thesis: 2D deep learning model for binary classification of breast tumors (benign vs. malignant) from mammography scans.",
      url: "https://repositorium.uminho.pt/entities/publication/3cf7198c-74fa-40ae-bc72-d63e8dd34c74",
      repo: "https://github.com/jpedrofontes/tumor-malignancy-predictor",
      privateRepo: false,
      tags: ["Python", "TensorFlow", "Keras", "Computer Vision"],
    },
    {
      name: "2015 US Flight Delays & Cancellations",
      description:
        "Knowledge extraction and data analysis on the Bureau of Transportation Statistics dataset of ~6M domestic flights. Built in R.",
      url: null as string | null,
      repo: "https://github.com/jpedrofontes/2015-flight-delays-and-cancellations",
      privateRepo: false,
      tags: ["R", "Data Analysis", "Knowledge Extraction", "Visualization"],
    },
  ],

  languages: [
    { name: "Portuguese",  level: "Native"       },
    { name: "English",     level: "Fluent"        },
    { name: "Spanish",     level: "Fluent"        },
    { name: "German",      level: "Elementary"    },
  ],

  licenses: ["Car driving license", "Motorcycle license (up to 125 cm³)"],
};

export type CVData = typeof cv;
export type ExperienceGroup = (typeof cv.experiences)[0];
export type ExperienceRole = (typeof cv.experiences)[0]["roles"][0];
export type Education = (typeof cv.education)[0];
export type SkillGroup = (typeof cv.skills)[0];
export type Publication = (typeof cv.publications)[0];
export type Certification = (typeof cv.certifications)[0];
export type PortfolioItem = (typeof cv.portfolio)[0];
