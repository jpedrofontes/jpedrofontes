export const cv = {
  name: "João Pedro Fontes",
  title: "R&D Engineer & AI Researcher",
  email: "jpedrofontes8@gmail.com",
  phone: "+351 93 2837601",
  website: "jpedrofontes.com",
  github: "jpedrofontes",

  experiences: [
    {
      title: "Advanced Backend Engineer",
      company: "Loka Inc.",
      location: "Lisbon, Portugal",
      start: "Sep 2024",
      end: null as string | null,
      description:
        "Developing scalable and maintainable backend systems using Python and modern frameworks such as FastAPI. Designed and implemented robust RESTful APIs and high-throughput data processing pipelines. Utilized Docker and cloud technologies to ensure high performance, reliability, security, and observability in production environments while providing on-call support.",
    },
    {
      title: "R&D Engineer",
      company: "Swoove Studios",
      location: "Antwerp, Belgium",
      start: "Jul 2023",
      end: "Aug 2024" as string | null,
      description:
        "Played a key role in elevating animation quality through innovative AI solutions. Leveraged Python expertise to develop advanced Pose Estimation and Reconstruction tools, utilizing PyTorch and integrating with Procedural Animation in Unity. Engineered a cutting-edge animation search system by combining Python-based NLP with Azure.",
    },
    {
      title: "Analyst / Senior Analyst",
      company: "Accenture Portugal",
      location: "Braga, Portugal",
      start: "Sep 2021",
      end: "Jun 2023" as string | null,
      description:
        "Consulted for major clients in the telecommunications and retail sectors. Gained hands-on experience in Java backend development and managed a critical order tracking system, utilizing a tech stack that included Golang and AWS. Contributed to system enhancements and provided on-call troubleshooting support.",
    },
    {
      title: "Research Fellow / Senior AI Researcher",
      company: "CCG/ZGDV Institute, University of Minho",
      location: "Guimarães, Portugal",
      start: "Oct 2017",
      end: "Jul 2021" as string | null,
      description:
        "Initially joined as a Research Fellow until 2018, then advanced to Senior AI Researcher. Contributed to EU-funded research projects, focusing on AI applications in criminal investigation and Industry 4.0. Utilized Python for developing AI solutions, bridging academia and industry. Mentored new research fellows, sharing expertise in AI methodologies and their practical applications across diverse sectors.",
    },
  ],

  education: [
    {
      degree: "Ph.D. in Information Systems and Technology",
      institution: "University of Minho",
      location: "Braga, Portugal",
      start: "2020",
      end: null as string | null,
      description:
        "Focus: Development of Quantitative Imaging Biomarkers for cancer diagnosis and monitoring, applied to breast cancer.",
      thesis:
        '"A Framework for the Development of Quantitative Imaging Biomarkers for Cancer Research"',
    },
    {
      degree: "M.Sc. in Informatics Engineering",
      institution: "University of Minho",
      location: "Braga, Portugal",
      start: "2016",
      end: "2018" as string | null,
      description:
        "Specializations: Artificial Intelligence, Business Intelligence, Parallel and Distributed Computing.",
      thesis:
        '"Intelligent Medical Image Analysis: A Deep Learning Approach to Breast Cancer Diagnosis"',
    },
    {
      degree: "B.Sc. in Informatics Engineering",
      institution: "University of Minho",
      location: "Braga, Portugal",
      start: "2013",
      end: "2016" as string | null,
      description:
        "Core curriculum covering programming, algorithms, computer architecture, databases, and advanced mathematics.",
      thesis: null as string | null,
    },
  ],

  skills: [
    {
      category: "Core Competencies",
      items: ["Machine Learning", "Deep Learning", "Computer Vision", "Backend Development"],
    },
    {
      category: "Programming Languages",
      items: ["Python", "Golang", "C#", "JavaScript / TypeScript", "C/C++", "Java", "SQL"],
    },
    {
      category: "Frameworks & Tools",
      items: ["PyTorch", "TensorFlow", "Keras", "FastAPI", "Flask", "Node.js", "React", "Next.js", "Django"],
    },
    {
      category: "Cloud & DevOps",
      items: ["Docker", "AWS", "Azure"],
    },
  ],

  publications: [
    {
      title: "Deep Learning Framework for Breast Cancer Subtypes Detection and Diagnosis",
      venue: "Biomedical Signal Processing and Control",
      year: 2026,
      status: "under review" as string | null,
      link: null as string | null,
    },
    {
      title: "A Comprehensive Framework for Detecting and Diagnosing Breast Cancer Phenotypes in MRI",
      venue: "European Congress of Radiology (ECR), Poster C-24782",
      year: 2025,
      status: null as string | null,
      link: null as string | null,
    },
    {
      title: "Accurate Phenotyping of Luminal A Breast Cancer in Magnetic Resonance Imaging: A New 3D CNN Approach",
      venue: "Computers in Biology and Medicine, vol. 189, 109903",
      year: 2025,
      status: null as string | null,
      link: null as string | null,
    },
    {
      title: "An Innovative Faster R-CNN-Based Framework for Automated Detection of Breast Cancer Pathological Lesions in MRI",
      venue: "Journal of Imaging, vol. 9, no. 9, 169",
      year: 2023,
      status: null as string | null,
      link: null as string | null,
    },
    {
      title: "Deployment Service for Scalable Distributed Deep Learning Training on Multiple Clouds",
      venue: "11th International Conference on Cloud Computing and Services Science (CLOSER), 135–142",
      year: 2021,
      status: null as string | null,
      link: null as string | null,
    },
    {
      title: "Representation Learning Approach to Breast Cancer Diagnosis",
      venue: "European Congress of Radiology (ECR), Poster C-2062",
      year: 2019,
      status: null as string | null,
      link: null as string | null,
    },
    {
      title: "AGATHA: Face Benchmarking Dataset for Exploring Criminal Surveillance Methods on Open Source Data",
      venue: "2018 International Conference on Graphics and Interaction (ICGI), 1–8",
      year: 2018,
      status: null as string | null,
      link: null as string | null,
    },
  ],

  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Aug 2024",
      description:
        "Foundational understanding of IT services and their uses in the AWS Cloud. Demonstrated cloud fluency and foundational AWS knowledge.",
      link: null as string | null,
    },
  ],

  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Spanish", level: "Fluent" },
    { name: "German", level: "Basic" },
  ],

  licenses: ["Car driving license", "Motorcycle license (up to 125 cm³)"],
};

export type CVData = typeof cv;
export type Experience = (typeof cv.experiences)[0];
export type Education = (typeof cv.education)[0];
export type SkillGroup = (typeof cv.skills)[0];
export type Publication = (typeof cv.publications)[0];
export type Certification = (typeof cv.certifications)[0];
