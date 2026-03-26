// src/types/recrutement.ts

export interface Recrutement {
  id: string;
  title: string;
  organization: string;
  type: 'Stage' | 'CDI' | 'CDD' | 'Mission' | 'Collaboration' | 'Fonction publique'; // Ajout de CDD et Fonction publique
  duration: string;
  deadline: string;
  datePublication: string;
  location: string;
  salary: string;
  theme: string;
  categories: string[];
  description: string;
  skills: string[];
  benefits: string[];
  contact: {
    email: string;
    telephone: string;
  };
  files?: {
    image?: string;
    pdf?: string;
  };
  pdf?: string;   // URL du PDF
  urgent: boolean;
  tags: string[];
  createdAt: string;
}