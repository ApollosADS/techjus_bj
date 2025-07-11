// src/utils/checkAssets.ts
import { verifyFilePaths } from './filePaths';

// Fonction pour vérifier les chemins des assets
export const checkAssets = (data: Record<string, unknown>) => {
  // Vérifie les chemins des images et PDFs
  verifyFilePaths(data);

  // Si vous avez une liste d'images ou de PDFs
  if (Array.isArray(data.images)) {
    (data.images as string[]).forEach((image: string) => {
      verifyFilePaths({ imageUrl: image });
    });
  }

  if (Array.isArray(data.documents)) {
    (data.documents as string[]).forEach((doc: string) => {
      verifyFilePaths({ pdfUrl: doc });
    });
  }
};

// Exemple d'utilisation
/*
const testData = {
  imageUrl: '/images/recrutement1.jpg',
  pdfUrl: '/documents/offre1.pdf',
  images: ['/images/recrutement2.jpg'],
  documents: ['/documents/offre2.pdf']
};

checkAssets(testData);
*/
