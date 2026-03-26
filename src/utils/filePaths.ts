// src/utils/filePaths.ts

// Chemins des fichiers PDF
export const OPEN_GOVLAB_TECHJUS_PDF = '/OpenGovLab_Techjus.pdf';
export const TECHJUS_PRESENTATION_PDF = '/techjus_presentation.pdf';

// Fonction pour normaliser les chemins des fichiers
export const normalizeFilePath = (path: string | undefined): string | undefined => {
  if (!path) return undefined;
  
  // Supprime le préfixe '\public\' si présent
  let normalizedPath = path.replace(/^\\public\\/, '/');
  
  // Assure que le chemin commence par '/'
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }
  
  return normalizedPath;
};

// Helper pour vérifier les chemins des fichiers
export const verifyFilePaths = (data: Record<string, unknown>) => {
  if (data.imageUrl) {
    const normalizedPath = normalizeFilePath(data.imageUrl as string);
    if (normalizedPath !== data.imageUrl) {
      console.warn(`Image path corrected: ${data.imageUrl} → ${normalizedPath}`);
    }
  }

  if (data.pdfUrl) {
    const normalizedPath = normalizeFilePath(data.pdfUrl as string);
    if (normalizedPath !== data.pdfUrl) {
      console.warn(`PDF path corrected: ${data.pdfUrl} → ${normalizedPath}`);
    }
  }
};
