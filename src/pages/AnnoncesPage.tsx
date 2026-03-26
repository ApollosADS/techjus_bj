import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  CircleDot,
  CalendarDays,
  History,
} from 'lucide-react';
import { Annonce } from '../types/annonce';
import AnnonceCard from '../components/annonces/AnnonceCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import AnnonceDiaporama from '../components/annonces/AnnonceDiaporama';
import AnnonceMoreInfo from '../components/annonces/AnnonceMoreInfo';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Type pour les données brutes importées du fichier JSON

interface FilterOptions {
  searchTerm: string;
  type: string;
  statut: string;
  lieu: string;
  prix: string;
  urgent: boolean;
  featured: boolean;
}

interface AnnoncesPageProps {
  /** Masque le hero plein écran (utilisé sous la page Opportunités) */
  embedded?: boolean;
}

const AnnoncesPage: React.FC<AnnoncesPageProps> = ({ embedded = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const annonceIdFromUrl = embedded ? (searchParams.get('annonce') ?? '') : '';

  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnnonce, setSelectedAnnonce] = useState<Annonce | null>(null);
  const [isDiaporamaOpen, setIsDiaporamaOpen] = useState(false);
  const [moreInfoAnnonce, setMoreInfoAnnonce] = useState<Annonce | null>(null);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  
  // États pour le diaporama des cartes
  const cardsPerView = Math.min(3, filteredAnnonces.length); // Nombre de cartes visibles à la fois, adaptatif
  
  const [filters] = useState<FilterOptions>({
    searchTerm: '',
    type: '',
    statut: '',
    lieu: '',
    prix: '',
    urgent: false,
    featured: false
  });

  // Référence pour le conteneur du diaporama

  // Fonctions de navigation du diaporama des cartes
  const nextCards = useCallback(() => {}, []);

  const prevCards = useCallback(() => {}, []);

  useEffect(() => {
    if (!embedded || !annonceIdFromUrl || loading || annonces.length === 0) return;
    const found = annonces.find((a) => a.id === annonceIdFromUrl);
    if (found) {
      setMoreInfoAnnonce(found);
      setIsMoreInfoOpen(true);
    }
  }, [embedded, annonceIdFromUrl, loading, annonces]);

  // Charger les données au montage du composant
  useEffect(() => {
    const loadAnnonces = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Charger les données depuis le fichier JSON
        const data = await import('../data/annonces.json');
        // Assertion de type pour les données importées
        const annoncesData = data.default as Array<{
          id: string;
          title: string;
          description: string;
          excerpt: string;
          date: string;
          dateDebut?: string;
          dateFin?: string;
          heureDebut?: string;
          heureFin?: string;
          lieu: string;
          type: string;
          statut: string;
          imageUrl?: string;
          images?: string[];
          organisateur: string;
          partenaires?: string[];
          prix?: string;
          capacite?: number;
          inscrits?: number;
          tags?: Array<{
            name: string;
            variant: 'primary' | 'secondary' | 'default' | 'success' | 'warning' | 'danger';
          }>;
          lienInscription?: string;
          lienPlusInfo?: string;
          urgent?: boolean;
          featured?: boolean;
          contact?: {
            telephone?: string;
            email?: string;
            website?: string;
          };
          programme?: Array<{
            heure: string;
            titre: string;
            description?: string;
            intervenant?: string;
          }>;
          createdAt?: string;
          updatedAt?: string;
          dateLabel?: string;
          heureLabel?: string;
          popupBannerUrl?: string;
        }>;
        
        const annoncesWithIcons = annoncesData.map((item) => {
          // Gestion du statut basé sur dateDebut/dateFin et heureDebut/heureFin
          const nowISO = new Date().toISOString();
          
          // Fonction utilitaire pour créer une date complète à partir d'une date et d'une heure
          const createFullDate = (dateStr: string, timeStr?: string): Date => {
            const [year, month, day] = dateStr.split('-').map(Number);
            const date = new Date(Date.UTC(year, month - 1, day));
            
            if (timeStr) {
              const [hours, minutes] = timeStr.split(':').map(Number);
              date.setUTCHours(hours, minutes, 0, 0);
            } else {
              date.setUTCHours(0, 0, 0, 0);
            }
            
            return date;
          };
          
          // S'assurer que la date actuelle est en UTC pour une comparaison cohérente
          const currentDate = new Date();
          currentDate.setUTCHours(currentDate.getHours(), currentDate.getMinutes(), 0, 0);
          
          // Déterminer les dates de début et de fin
          const debutDate = item.dateDebut || item.date;
          const finDate = item.dateFin || item.dateDebut || item.date;
          
          // Créer les dates complètes avec heures
          const dateDebutComplete = createFullDate(debutDate, item.heureDebut);
          const dateFinComplete = createFullDate(finDate, item.heureFin || item.heureDebut);
          
          // Si on a une heure de début mais pas de fin, on ajoute 1h par défaut
          if (item.heureDebut && !item.heureFin) {
            dateFinComplete.setHours(dateDebutComplete.getHours() + 1);
          }
          
          // Si pas d'heure de début, on considère la journée entière (de 00:00 à 23:59)
          if (!item.heureDebut) {
            dateDebutComplete.setHours(0, 0, 0, 0);
            dateFinComplete.setHours(23, 59, 59, 999);
          }
          
          // Déterminer le statut
          let statut: 'a_venir' | 'en_cours' | 'termine' | 'annule' = 'a_venir';
          
          // Définir le statut en fonction de la date actuelle
          const currentTime = currentDate.getTime();
          const debutTime = dateDebutComplete.getTime();
          const finTime = dateFinComplete.getTime();
          
          if (currentTime > finTime) {
            statut = 'termine';  // Après la fin de l'événement
          } else if (currentTime >= debutTime && currentTime <= finTime) {
            statut = 'en_cours'; // Pendant l'événement
          } else if (currentTime < debutTime) {
            statut = 'a_venir';  // Avant le début de l'événement
          }
          const annonce: Annonce = {
            id: item.id,
            title: item.title,
            description: item.description,
            excerpt: item.excerpt,
            date: item.date,
            heure: item.heureDebut || '14:00',
            dateLabel: item.dateLabel,
            heureLabel: item.heureLabel,
            lieu: item.lieu,
            type: (item.type || 'evenement') as 'evenement' | 'partenariat' | 'formation' | 'conference' | 'webinar' | 'atelier',
            statut: (['en_cours', 'a_venir', 'termine', 'annule'].includes(item.statut) 
              ? item.statut 
              : statut) as 'en_cours' | 'a_venir' | 'termine' | 'annule',
            imageUrl: item.imageUrl || '/placeholder-annonce.jpg',
            images: item.images || [],
            popupBannerUrl: item.popupBannerUrl,
            organisateur: item.organisateur || 'TechJus',
            partenaires: item.partenaires || [],
            prix: item.prix || 'Gratuit',
            capacite: item.capacite,
            inscrits: item.inscrits || 0,
            tags: (Array.isArray(item.tags) 
              ? item.tags.map(tag => {
                  if (typeof tag === 'string') return tag;
                  const validVariants = ['primary', 'secondary', 'default', 'success', 'warning', 'danger'] as const;
                  // Vérification du variant valide
                  if (!validVariants.includes(tag.variant as any)) {
                    console.warn(`Variant invalide pour le tag ${tag.name}: ${tag.variant}`);
                  }
                  return tag.name;
                })
              : []),
            lienInscription: item.lienInscription,
            urgent: item.urgent || false,
            featured: item.featured || false,
            contact: item.contact || {},
            programme: item.programme || [],
            createdAt: item.createdAt || nowISO,
            updatedAt: item.updatedAt || nowISO
          };
          
          return annonce;
        });
        
        setAnnonces(annoncesWithIcons);
        setFilteredAnnonces(annoncesWithIcons); // Initialiser les annonces filtrées
      } catch (error) {
        console.error('Erreur lors du chargement des annonces:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnnonces();
  }, []);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredAnnonces.length <= cardsPerView) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevCards();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextCards();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredAnnonces.length, cardsPerView, nextCards, prevCards]);

  // Filtrer les annonces
  const filterAnnonces = useMemo(() => {
    return annonces.filter(annonce => {
      // Filtre par recherche
      if (filters.searchTerm && filters.searchTerm.trim() !== '') {
        const searchTerm = filters.searchTerm.toLowerCase();
        const titleMatch = annonce.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = annonce.description.toLowerCase().includes(searchTerm);
        const excerptMatch = annonce.excerpt.toLowerCase().includes(searchTerm);
        const organisateurMatch = annonce.organisateur.toLowerCase().includes(searchTerm);
        
        if (!titleMatch && !descriptionMatch && !excerptMatch && !organisateurMatch) {
          return false;
        }
      }

      // Filtre par type
      if (filters.type && annonce.type !== filters.type) {
        return false;
      }

      // Filtre par statut
      if (filters.statut && annonce.statut !== filters.statut) {
        return false;
      }

      // Filtre par lieu
      if (filters.lieu && annonce.lieu !== filters.lieu) {
        return false;
      }

      // Filtre par prix
      if (filters.prix) {
        if (filters.prix === 'gratuit' && annonce.prix !== 'Gratuit') {
          return false;
        }
        if (filters.prix === 'payant' && annonce.prix === 'Gratuit') {
          return false;
        }
      }

      // Filtre par urgent
      if (filters.urgent && !annonce.urgent) {
        return false;
      }

      // Filtre par featured
      if (filters.featured && !annonce.featured) {
        return false;
      }

      return true;
    });
  }, [annonces, filters]);

  // Mettre à jour les annonces filtrées
  useEffect(() => {
    setFilteredAnnonces(filterAnnonces);
    // setCurrentCardIndex(0); // Reset l'index quand les filtres changent // This line is removed
  }, [filterAnnonces]);

  // Statistiques
  const stats = useMemo(() => {
    const total = annonces.length;
    const aVenir = annonces.filter(a => a.statut === 'a_venir').length;
    const urgents = annonces.filter(a => a.urgent).length;
    const gratuits = annonces.filter(a => a.prix === 'Gratuit').length;

    return { total, aVenir, urgents, gratuits };
  }, [annonces]);

  // Séparation des annonces par statut
  const annoncesEnCours = filteredAnnonces.filter(a => a.statut === 'en_cours');
  const annoncesAVenir = filteredAnnonces
    .filter(a => a.statut === 'a_venir')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const annoncesPassees = filteredAnnonces.filter(a => a.statut === 'termine' || a.statut === 'annule');

  // Gestionnaire de clic sur une annonce
  const handleAnnonceClick = (annonce: Annonce) => {
    // Ouvrir le diaporama si l'annonce a des images
    if (annonce.images && annonce.images.length > 0) {
      setSelectedAnnonce(annonce);
      setIsDiaporamaOpen(true);
    }
  };

  const closeDiaporama = () => {
    setIsDiaporamaOpen(false);
    setSelectedAnnonce(null);
  };

  const openMoreInfo = (annonce: Annonce) => {
    setMoreInfoAnnonce(annonce);
    setIsMoreInfoOpen(true);
  };

  const closeMoreInfo = () => {
    setIsMoreInfoOpen(false);
    setMoreInfoAnnonce(null);
    if (embedded && searchParams.get('annonce')) {
      setSearchParams({}, { replace: true });
    }
  };

  // Calculer le nombre total de pages

  if (loading) {
    return (
      <div
        className={
          embedded
            ? 'flex min-h-[280px] items-center justify-center'
            : 'flex min-h-screen items-center justify-center'
        }
      >
        <LoadingSpinner />
      </div>
    );
  }

  const statsBlocks = (
    <>
      <div className="text-center rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
        <Calendar className="mx-auto mb-2 h-8 w-8 text-blue-300" />
        <div className="text-2xl font-bold">{stats.total}</div>
        <div className="text-sm text-blue-200">Événements</div>
      </div>
      <div className="text-center rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
        <Clock className="mx-auto mb-2 h-8 w-8 text-green-300" />
        <div className="text-2xl font-bold">{stats.aVenir}</div>
        <div className="text-sm text-blue-200">À venir</div>
      </div>
      <div className="text-center rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
        <AlertTriangle className="mx-auto mb-2 h-8 w-8 text-red-400" />
        <div className="text-2xl font-bold">{stats.urgents}</div>
        <div className="text-sm text-blue-200">Urgents</div>
      </div>
      <div className="text-center rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
        <TrendingUp className="mx-auto mb-2 h-8 w-8 text-yellow-300" />
        <div className="text-2xl font-bold">{stats.gratuits}</div>
        <div className="text-sm text-blue-200">Gratuits</div>
      </div>
    </>
  );

  return (
    <div className={embedded ? '' : 'min-h-screen bg-gray-50'}>
      {!embedded && (
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-20 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h1 className="mb-6 text-5xl font-bold">
                Annonces & <span className="text-blue-300">Événements</span>
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-blue-100">
                Découvrez tous les événements, conférences, webinars et partenariats de la communauté TechJus.
                Restez informé des dernières opportunités dans le domaine du droit numérique.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">{statsBlocks}</div>
          </div>
        </section>
      )}

      <main
        className={
          embedded
            ? 'mx-auto max-w-none px-0 py-0'
            : 'mx-auto max-w-6xl px-4 py-12'
        }
      >
        {embedded && (
          <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-techjus-blue/10 bg-techjus-light/80 p-4 text-center shadow-sm">
              <Calendar className="mx-auto mb-2 h-7 w-7 text-techjus-blue" />
              <div className="text-xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs font-medium text-gray-500">Événements</div>
            </div>
            <div className="rounded-xl border border-techjus-blue/10 bg-techjus-light/80 p-4 text-center shadow-sm">
              <Clock className="mx-auto mb-2 h-7 w-7 text-techjus-green" />
              <div className="text-xl font-bold text-gray-900">{stats.aVenir}</div>
              <div className="text-xs font-medium text-gray-500">À venir</div>
            </div>
            <div className="rounded-xl border border-techjus-blue/10 bg-techjus-light/80 p-4 text-center shadow-sm">
              <AlertTriangle className="mx-auto mb-2 h-7 w-7 text-techjus-red" />
              <div className="text-xl font-bold text-gray-900">{stats.urgents}</div>
              <div className="text-xs font-medium text-gray-500">Urgents</div>
            </div>
            <div className="rounded-xl border border-techjus-blue/10 bg-techjus-light/80 p-4 text-center shadow-sm">
              <TrendingUp className="mx-auto mb-2 h-7 w-7 text-techjus-yellow" />
              <div className="text-xl font-bold text-gray-900">{stats.gratuits}</div>
              <div className="text-xs font-medium text-gray-500">Gratuits</div>
            </div>
          </div>
        )}
        {/* Filtres */}
        {/* Supprimer l'utilisation du filtre d'annonces dans le rendu (recherche de balises <AnnonceFilterBar ... /> ou similaires) */}

        {/* Résultats */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredAnnonces.length > 0 ? (
                <>
                  {filteredAnnonces.length} annonce{filteredAnnonces.length !== 1 ? 's' : ''} trouvée{filteredAnnonces.length !== 1 ? 's' : ''}
                </>
              ) : (
                'Aucune annonce trouvée'
              )}
            </h2>
            
            {filteredAnnonces.length > 0 && (
              <div className="text-sm text-gray-500">
                Triées par date de création
              </div>
            )}
          </div>
        </div>

        {/* Affichage des cartes */}
        {/* Section En cours */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-green-700 mb-4">Événements en cours</h3>
          {annoncesEnCours.length > 0 ? (
            annoncesEnCours.length <= 3 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {annoncesEnCours.map((annonce) => (
                  <AnnonceCard
                    key={annonce.id}
                    annonce={annonce}
                    onClick={() => handleAnnonceClick(annonce)}
                    onMoreInfo={() => openMoreInfo(annonce)}
                  />
                ))}
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl">
                {/* Navigation gauche/droite */}
                {/* ... Vous pouvez réutiliser la logique de diaporama ici si besoin ... */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  {annoncesEnCours.map((annonce) => (
                    <AnnonceCard
                      key={annonce.id}
                      annonce={annonce}
                      onClick={() => handleAnnonceClick(annonce)}
                      onMoreInfo={() => openMoreInfo(annonce)}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            <EmptyState
              icon={CircleDot}
              iconClassName="text-green-600"
              title="Aucun événement en cours"
              description="Il n'y a pas d'événement en cours actuellement."
            />
          )}
        </section>

        {/* Section À venir */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Événements à venir</h3>
          {annoncesAVenir.length > 0 ? (
            annoncesAVenir.length <= 3 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {annoncesAVenir.map((annonce) => (
                  <AnnonceCard
                    key={annonce.id}
                    annonce={annonce}
                    onClick={() => handleAnnonceClick(annonce)}
                    onMoreInfo={() => openMoreInfo(annonce)}
                  />
                ))}
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl">
                {/* Navigation gauche/droite */}
                {/* ... Vous pouvez réutiliser la logique de diaporama ici si besoin ... */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  {annoncesAVenir.map((annonce) => (
                    <AnnonceCard
                      key={annonce.id}
                      annonce={annonce}
                      onClick={() => handleAnnonceClick(annonce)}
                      onMoreInfo={() => openMoreInfo(annonce)}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            <EmptyState
              icon={CalendarDays}
              iconClassName="text-techjus-blue"
              title="Aucun événement à venir"
              description="Il n'y a pas d'événement à venir pour le moment."
            />
          )}
        </section>

        {/* Section Passés */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Événements passés</h3>
          {annoncesPassees.length > 0 ? (
            annoncesPassees.length <= 3 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {annoncesPassees.map((annonce) => (
                  <AnnonceCard
                    key={annonce.id}
                    annonce={annonce}
                    onClick={() => handleAnnonceClick(annonce)}
                    onMoreInfo={() => openMoreInfo(annonce)}
                  />
                ))}
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl">
                {/* Navigation gauche/droite */}
                {/* ... Vous pouvez réutiliser la logique de diaporama ici si besoin ... */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  {annoncesPassees.map((annonce) => (
                    <AnnonceCard
                      key={annonce.id}
                      annonce={annonce}
                      onClick={() => handleAnnonceClick(annonce)}
                      onMoreInfo={() => openMoreInfo(annonce)}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            <EmptyState
              icon={History}
              iconClassName="text-slate-400"
              title="Aucun événement passé"
              description="Aucun événement passé n'est affiché."
            />
          )}
        </section>

        {/* Diaporama en plein écran */}
        {selectedAnnonce && (
          <AnnonceDiaporama
            annonce={selectedAnnonce}
            isOpen={isDiaporamaOpen}
            onClose={closeDiaporama}
          />
        )}

        {/* Modal Plus d'info */}
        {moreInfoAnnonce && (
          <AnnonceMoreInfo
            annonce={moreInfoAnnonce}
            isOpen={isMoreInfoOpen}
            onClose={closeMoreInfo}
          />
        )}

        {/* Call to Action */}
        {annonces.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Vous organisez un événement ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Contactez-nous pour publier votre annonce et rejoindre notre communauté d'événements
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white font-semibold text-techjus-blue hover:bg-slate-100"
            >
              <Link to="/contact">Publier une annonce</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnnoncesPage;