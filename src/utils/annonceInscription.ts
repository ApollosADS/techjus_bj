import type { Annonce } from '@/types/annonce';

/** Inscription autorisée uniquement pour les événements à venir. */
export function isInscriptionOuverte(statut: Annonce['statut']): boolean {
  return statut === 'a_venir';
}

/** Libellé pour bouton d’inscription désactivé selon le statut. */
export function libelleInscriptionIndisponible(statut: Annonce['statut']): string {
  switch (statut) {
    case 'en_cours':
      return 'Événement en cours';
    case 'termine':
      return 'Clôturé';
    case 'annule':
      return 'Événement annulé';
    default:
      return 'Inscription non disponible';
  }
}
