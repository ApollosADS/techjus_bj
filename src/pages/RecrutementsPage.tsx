// src/pages/RecrutementsPage.tsx
import React, { useState, useEffect } from 'react';
import { Recrutement } from '../types/recrutement';
import FilterBar from '../components/recrutements/FilterBar';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import RecrutementCard from '../components/recrutements/RecrutementCard';
import recrutementsData from '../data/recrutements.json';

interface FilterOptions {
  categories: string[];
  type: string;
  searchTerm: string;
  showExpired: boolean;
}

const RecrutementsPage: React.FC = () => {
  const [recrutements, setRecrutements] = useState<Recrutement[]>([]);
  const [filteredRecrutements, setFilteredRecrutements] = useState<Recrutement[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showExpired, setShowExpired] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Fonction pour filtrer les recrutements
  const filterRecrutements = (recrutements: Recrutement[], options: FilterOptions): Recrutement[] => {
    return recrutements.filter(recrutement => {
      // Filtrer par catégorie (seulement si des catégories sont sélectionnées)
      if (options.categories.length > 0) {
        const hasMatchingCategory = options.categories.some(cat => 
          recrutement.categories.some(recCat => 
            recCat.toLowerCase().includes(cat.toLowerCase())
          )
        );
        if (!hasMatchingCategory) {
          return false;
        }
      }

      // Filtrer par type (seulement si un type est sélectionné)
      if (options.type && options.type !== '') {
        if (recrutement.type !== options.type) {
          return false;
        }
      }

      // Filtrer par recherche (seulement si un terme de recherche est saisi)
      if (options.searchTerm && options.searchTerm.trim() !== '') {
        const searchTermLower = options.searchTerm.toLowerCase();
        const titleMatch = recrutement.title.toLowerCase().includes(searchTermLower);
        const orgMatch = recrutement.organization.toLowerCase().includes(searchTermLower);
        const descMatch = recrutement.description.toLowerCase().includes(searchTermLower);
        
        if (!titleMatch && !orgMatch && !descMatch) {
          return false;
        }
      }

      // Filtrer par date si showExpired est false
      if (!options.showExpired) {
        const deadline = new Date(recrutement.deadline);
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
        if (deadline < now) {
          return false;
        }
      }

      return true;
    });
  };

  // Fonction pour trier les recrutements par date de publication (plus récents en premier)
  const sortRecrutements = (recrutements: Recrutement[]): Recrutement[] => {
    return [...recrutements].sort((a, b) => {
      const dateA = new Date(a.datePublication || a.createdAt);
      const dateB = new Date(b.datePublication || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  };

  // Fonction pour normaliser les données JSON vers le type Recrutement
  const normalizeRecrutementData = (data: Record<string, unknown>[]): Recrutement[] => {
    return data.map(item => ({
      ...item,
      urgent: item.urgent as boolean || false,
      tags: item.tags as string[] || [],
      createdAt: item.createdAt as string || item.datePublication as string || new Date().toISOString(),
      skills: item.skills as string[] || [],
      benefits: item.benefits as string[] || [],
      contact: item.contact as { email: string; telephone: string } || { email: '', telephone: '' },
      files: item.files as { image?: string; pdf?: string } || {},
      pdf: item.pdf as string | undefined
    })) as Recrutement[];
  };

  // Gestionnaire de changement de catégorie
  const handleCategoryChange = (category: string): void => {
    if (category === '') {
      // Clear all categories
      setSelectedCategories([]);
      return;
    }
    
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Gestionnaire de changement de type
  const handleTypeChange = (type: string): void => {
    setTypeFilter(type);
  };

  // Gestionnaire de changement de recherche
  const handleSearchChange = (search: string): void => {
    setSearchTerm(search);
  };

  // Gestionnaire de changement d'affichage des offres expirées
  const handleShowExpiredChange = (show: boolean): void => {
    setShowExpired(show);
  };

  // Charger les données au montage du composant - UN SEUL useEffect pour le chargement
  useEffect(() => {
    // console.log('Chargement des données de recrutement...'); // Debug - COMMENTÉ
    
    try {
      const normalizedData = normalizeRecrutementData(recrutementsData);
      // console.log('Données normalisées:', normalizedData); // Debug - COMMENTÉ
      
      setRecrutements(normalizedData);
      
      // Initialiser les catégories disponibles
      const allCategories = Array.from(new Set(
        normalizedData.flatMap(recrutement => recrutement.categories)
      )).sort();
      // console.log('Catégories disponibles:', allCategories); // Debug - COMMENTÉ
      setCategories(allCategories);
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des recrutements:', error);
      setLoading(false);
    }
  }, []);

  // Appliquer les filtres quand les données ou les filtres changent
  useEffect(() => {
    // console.log('Application des filtres...'); // Debug - COMMENTÉ
    // console.log('Recrutements disponibles:', recrutements.length); // Debug - COMMENTÉ
    // console.log('Filtres actifs:', { selectedCategories, typeFilter, searchTerm, showExpired }); // Debug - COMMENTÉ
    
    if (recrutements.length > 0) {
      const filtered = filterRecrutements(recrutements, {
        categories: selectedCategories,
        type: typeFilter,
        searchTerm: searchTerm,
        showExpired: showExpired
      });
      
      // console.log('Recrutements filtrés:', filtered.length); // Debug - COMMENTÉ
      setFilteredRecrutements(filtered);
    }
  }, [recrutements, selectedCategories, typeFilter, searchTerm, showExpired]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const sortedRecrutements = sortRecrutements(filteredRecrutements);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Offres d'emploi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les opportunités de carrière dans le domaine du droit et de la technologie
          </p>
        </div>
        
        <FilterBar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          typeFilter={typeFilter}
          onTypeChange={handleTypeChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          showExpired={showExpired}
          onShowExpiredChange={handleShowExpiredChange}
        />

        {/* Statistiques et Debug Info */}
        <div className="mb-8">
          <p className="text-gray-600">
            {sortedRecrutements.length} offre{sortedRecrutements.length !== 1 ? 's' : ''} trouvée{sortedRecrutements.length !== 1 ? 's' : ''}
            {recrutements.length > 0 && (
              <span className="ml-2 text-sm text-gray-500">
                (sur {recrutements.length} au total)
              </span>
            )}
          </p>
          
          {/* Debug info - à retirer en production */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
              <p>Debug: {recrutements.length} recrutements chargés</p>
              <p>Filtres actifs: {selectedCategories.join(', ') || 'aucun'}</p>
            </div>
          )} */}
        </div>

        {/* Grille des recrutements */}
        {sortedRecrutements.length === 0 ? (
          <div>
            {recrutements.length === 0 ? (
              <EmptyState 
                title="Aucune offre d'emploi disponible" 
                description="Les données de recrutement ne sont pas disponibles pour le moment"
                icon="📭"
              />
            ) : (
              <EmptyState 
                title="Aucune offre d'emploi correspondant à vos critères" 
                description="Essayez d'ajuster vos filtres de recherche ou activez l'affichage des offres expirées"
                icon="🔍"
              />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRecrutements.map((recrutement: Recrutement) => (
              <RecrutementCard key={recrutement.id} recrutement={recrutement} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecrutementsPage;