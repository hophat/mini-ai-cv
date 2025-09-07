
export interface Contact {
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface CVData {
  name: string;
  title: string;
  contact: Contact;
  profile: string;
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  languages: string[];
  interests: string[];
}

export enum Template {
  Modern = 'Modern',
  Classic = 'Classic',
}
