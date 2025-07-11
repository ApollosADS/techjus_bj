// src/types/annonce.ts

export interface Tag {
  name: string;
  variant: 'primary' | 'secondary' | 'default' | 'success' | 'warning' | 'danger';
}

export interface Contact {
  telephone?: string;
  email?: string;
  website?: string;
}

export interface ProgrammeItem {
  heure: string;
  titre: string;
  description?: string;
  intervenant?: string;
}

export interface Annonce {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  heure: string;
  lieu: string;
  type: 'evenement' | 'partenariat' | 'formation' | 'conference' | 'webinar' | 'atelier';
  statut: 'a_venir' | 'en_cours' | 'termine' | 'annule';
  imageUrl: string; // Image principale
  images?: string[]; // Images supplémentaires pour le diaporama
  organisateur: string;
  partenaires?: string[];
  prix?: string;
  capacite?: number;
  inscrits?: number;
  tags?: string[];
  lienInscription?: string;
  urgent: boolean;
  featured: boolean;
  contact?: Contact;
  programme?: ProgrammeItem[];
  createdAt: string;
  updatedAt: string;
} 