export interface Actualite {
  id: number;
  titre: string;
  contenu: string;
  date: string;
  image?: string;
  tags?: string[];
  auteur?: string;
  tempsLecture?: string;
  extrait?: string;
}
