import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Calendar, Clock, TrendingUp, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Annonce } from '../types/annonce';
import AnnonceCard from '../components/annonces/AnnonceCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import AnnonceDiaporama from '../components/annonces/AnnonceDiaporama';
import AnnonceMoreInfo from '../components/annonces/AnnonceMoreInfo';
import { Link } from 'react-router-dom';

// Import des données (à remplacer par un appel API en production)
import annoncesData from '../data/annonces.json';

interface FilterOptions {
  searchTerm: string;
  type: string;
  statut: string;
  lieu: string;
  prix: string;
  urgent: boolean;
  featured: boolean;
}

const AnnoncesPage: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnnonce, setSelectedAnnonce] = useState<Annonce | null>(null);
  const [isDiaporamaOpen, setIsDiaporamaOpen] = useState(false);
  const [moreInfoAnnonce, setMoreInfoAnnonce] = useState<Annonce | null>(null);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  
  // États pour le diaporama des cartes
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
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
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fonctions de navigation du diaporama des cartes
  const nextCards = useCallback(() => {
    const maxIndex = Math.max(0, filteredAnnonces.length - cardsPerView);
    setCurrentCardIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, [filteredAnnonces.length, cardsPerView]);

  const prevCards = useCallback(() => {
    const maxIndex = Math.max(0, filteredAnnonces.length - cardsPerView);
    setCurrentCardIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, [filteredAnnonces.length, cardsPerView]);

  const goToCardIndex = useCallback((index: number) => {
    const maxIndex = Math.max(0, filteredAnnonces.length - cardsPerView);
    setCurrentCardIndex(Math.min(index, maxIndex));
  }, [filteredAnnonces.length, cardsPerView]);



  // Charger les données au montage du composant
  useEffect(() => {
    const loadAnnonces = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // En production, remplacer par un appel API
        // Adapter les données au nouveau format
        const adaptedData = annoncesData.map(item => ({
          ...item,
          heure: item.heureDebut || '14:00',
          tags: item.tags?.map(tag => tag.name) || []
        })) as Annonce[];
        setAnnonces(adaptedData);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des annonces:', error);
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
    setCurrentCardIndex(0); // Reset l'index quand les filtres changent
  }, [filterAnnonces]);

  // Statistiques
  const stats = useMemo(() => {
    const total = annonces.length;
    const aVenir = annonces.filter(a => a.statut === 'a_venir').length;
    const urgents = annonces.filter(a => a.urgent).length;
    const gratuits = annonces.filter(a => a.prix === 'Gratuit').length;

    return { total, aVenir, urgents, gratuits };
  }, [annonces]);

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
  };

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredAnnonces.length / cardsPerView);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              Annonces & <span className="text-blue-300">Événements</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Découvrez tous les événements, conférences, webinars et partenariats de la communauté TechJus. 
              Restez informé des dernières opportunités dans le domaine du droit numérique.
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Calendar className="w-8 h-8 text-blue-300 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-blue-200 text-sm">Événements</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Clock className="w-8 h-8 text-green-300 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.aVenir}</div>
              <div className="text-blue-200 text-sm">À venir</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.urgents}</div>
              <div className="text-blue-200 text-sm">Urgents</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <TrendingUp className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.gratuits}</div>
              <div className="text-blue-200 text-sm">Gratuits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
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
        {filteredAnnonces.length > 0 ? (
          <div className="relative">
            {/* Si moins de 3 annonces, affichage simple en grille */}
            {filteredAnnonces.length <= 3 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnnonces.map((annonce) => (
                  <div key={annonce.id} className="transform hover:scale-105 transition-all duration-300">
                    <AnnonceCard
                      annonce={annonce}
                      onClick={() => handleAnnonceClick(annonce)}
                      onMoreInfo={() => openMoreInfo(annonce)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Diaporama pour plus de 3 annonces */
              <div 
                ref={carouselRef}
                className="relative overflow-hidden rounded-xl"
              >
                {/* Navigation gauche/droite */}
                <button
                  onClick={prevCards}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full hover:bg-white transition-colors shadow-lg z-10 border border-gray-200"
                  title="Précédent"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextCards}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full hover:bg-white transition-colors shadow-lg z-10 border border-gray-200"
                  title="Suivant"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Grille des cartes avec transition */}
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentCardIndex * (100 / cardsPerView)}%)`,
                      width: `${(filteredAnnonces.length / cardsPerView) * 100}%`
                    }}
                  >
                    {filteredAnnonces.map((annonce) => (
                      <div 
                        key={annonce.id} 
                        className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                        style={{ minWidth: `${100 / cardsPerView}%` }}
                      >
                        <div className="transform hover:scale-105 transition-all duration-300">
                          <AnnonceCard
                            annonce={annonce}
                            onClick={() => handleAnnonceClick(annonce)}
                            onMoreInfo={() => openMoreInfo(annonce)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Indicateurs de navigation */}
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => goToCardIndex(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-200 border-2 ${
                          Math.floor(currentCardIndex / cardsPerView) === index
                            ? 'bg-blue-600 border-blue-600 shadow-lg' 
                            : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                        title={`Page ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Compteur de position et instructions */}
                <div className="text-center mt-4 space-y-2">
                  <div className="text-sm text-gray-500">
                    {currentCardIndex + 1} - {Math.min(currentCardIndex + cardsPerView, filteredAnnonces.length)} sur {filteredAnnonces.length} annonces
                  </div>
                  <div className="text-xs text-gray-400 flex items-center justify-center gap-4">
                    <span>← → Navigation manuelle</span>
                    <span>Cliquez sur les points pour aller à une page spécifique</span>
                    <span>Cliquez sur une carte pour voir les images</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            icon="📅"
            title="Aucune annonce trouvée"
            description="Aucune annonce ne correspond aux critères de recherche sélectionnés."
          />
        )}

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
            <h3 className="text-2xl font-bold mb-4">
              Vous organisez un événement ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Contactez-nous pour publier votre annonce et rejoindre notre communauté d'événements
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              <Link to="/contact" className="block w-full h-full">Publier une annonce</Link>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnnoncesPage;