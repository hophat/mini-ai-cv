
import { CVData } from './types';

export const INITIAL_CV_DATA: CVData = {
  name: "Ho Phat",
  title: "IT Manager",
  contact: {
    location: "Thu Duc, Ho Chi Minh City",
    phone: "0989-511-431",
    email: "hophat271996@gmail.com",
    linkedin: "linkedin.com/in/ho-phat",
    portfolio: "gulagi.com",
  },
  profile: "Dynamic IT Manager with a proven track record at Playground Vina, where I expanded the development team from 4 to 32 members. Skilled in PHP and project management, I successfully implemented CI/CD pipelines, enhancing operational efficiency and driving project success. Recognized for leadership and innovative solutions in fast-paced environments.",
  skills: [
    "PHP and Node.js",
    "Blockchain technologies: Geth and Solidity",
    "Continuous integration & delivery (CI/CD)",
    "Elasticsearch expertise",
    "Database management: MySQL & MongoDB",
    "Project management",
    "Team leadership & time management",
  ],
  workExperience: [
    {
      role: "IT Manager",
      company: "Vang Trang Khuyet Social Organization and Charity Fund",
      period: "Jan 2025 – Present",
      location: "Ho Chi Minh",
      responsibilities: [
        "Digitized operations for charitable organization, achieving 70% completion.",
        "Developed flexible workflows using base.vn system.",
        "Created tracking system for gift distribution to beneficiaries.",
        "Managed IT team to ensure operational efficiency.",
        "Integrated third-party software solutions to enhance functionality.",
      ],
    },
    {
      role: "IT Manager",
      company: "Playground Vina",
      period: "Nov 2021 – Dec 2024",
      location: "",
      responsibilities: [
        "Directed development of two core company projects.",
        "Expanded workforce from 4 to 32 developers.",
        "Established Dev team workflows using hybrid Scrum and Lean model.",
        "Built CI/CD pipelines with AWS, Ubuntu, Git, Jenkins.",
        "Developed apps with PHP, Node.js (NestJS), React.js, React Native.",
        "Reviewed code quality to uphold best practices.",
        "Managed four teams with 32 members to meet objectives.",
        "Assisted in IT solution implementation to boost operational efficiency.",
      ],
    },
    {
      role: "Solutions Developer",
      company: "Librasoft",
      period: "Jun 2019 – Oct 2021",
      location: "",
      responsibilities: [
        "Collaborated with director to devise solutions for company projects.",
        "Led team of 2 developers ensuring efficient execution.",
        "Developed web and app solutions using PHP, Ionic, Vue.js, Angular.",
        "Engaged with customers to gather requirements and propose solutions.",
        "Planned project phases to align with company strategy.",
        "Recognized as key member, proposed for 5% equity.",
      ],
    },
    {
      role: "PHP Developer",
      company: "PA Vietnam",
      period: "Jun 2017 – May 2019",
      location: "",
      responsibilities: [
        "Collaborated with eCommerce project leader to drive outcomes.",
        "Optimized system performance by reducing code clutter 30–40%.",
        "Developed PHP code without reliance on frameworks.",
        "Earned “Outstanding Employee of the Year” recognition.",
      ],
    },
  ],
  education: [
    {
      degree: "Information Technology",
      institution: "Industrial University of Ho Chi Minh City",
      year: "Jan 2018",
    },
    {
      degree: "High School",
      institution: "Ly Thuong Kiet High School, Binh Thuan",
      year: "Jan 2014",
    },
  ],
  projects: [
    {
      name: "VTK",
      description: "Check-in & Charity Gift Distribution System",
    },
    {
      name: "RMMS.VN",
      description: "Vietnam Road Asset Management System",
    },
    {
      name: "Winery.swap",
      description: "Decentralized Exchange Platform",
    },
    {
      name: "AIzen Loan",
      description: "Unsecured Loan System",
    },
    {
      name: "Pool Wallet",
      description: "Web3 Digital Wallet",
    },
  ],
  languages: ["Vietnamese (Native)", "English (Working proficiency)"],
  interests: ["Playing football", "Gaming", "Coffee"],
};
