export interface CourseFaq {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'hardware' | 'software' | 'chip-level' | 'master';
  duration: string;
  hasConfirmedDuration: boolean;
  practicalRatio: string;
  level: string;
  shortDescription: string;
  fullOverview: string;
  highlights: string[];
  modules: string[];
  toolsCovered: string[];
  skillsLearned: string[];
  practicalApproach: string;
  careerOpportunities: string[];
  faqs: CourseFaq[];
  visualType: 'hero-lab' | 'microscope' | 'software' | 'tools' | 'iphone' | 'reballing';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'lab' | 'hardware' | 'software' | 'tools' | 'students';
  description: string;
  badge: string;
}

export interface AdmissionApplication {
  id: string;
  fullName: string;
  fatherName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  dateOfBirth: string;
  gender: string;
  qualification: string;
  selectedCourse: string;
  preferredBatch: string;
  hostelRequired: boolean;
  address: string;
  city: string;
  state: string;
  pincode: string;
  appliedDate: string;
  status: 'Received' | 'Under Review' | 'Enrolled';
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  date: string;
}
