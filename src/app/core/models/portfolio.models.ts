export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  summary: string;
  highlights: string[];
  socialLinks: SocialLink[];
  resume: {
    url: string;
    fileName: string;
  };
}

export interface SkillCategory {
  category: string;
  technologies: string[];
}

export interface SoftSkill {
  name: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  isCorporate: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  status: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  url: string;
  icon: string;
  action: 'link' | 'mailto' | 'copy';
}

export interface PortfolioData {
  personal: PersonalInfo;
  about: {
    paragraphs: string[];
    highlights: string[];
  };
  skillCategories: SkillCategory[];
  softSkills: SoftSkill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  contactLinks: ContactLink[];
  navigation: NavItem[];
}
