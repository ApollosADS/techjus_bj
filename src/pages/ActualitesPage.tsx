import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Actualite } from '../components/actualites/types';
import ActualiteCard from '../components/actualites/ActualiteCard';
import ActualiteDetail from '../components/actualites/ActualiteDetail';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import Tag from '../components/shared/Tag';

// Import des données (à remplacer par un appel API)
import actualitesData from '../data/actualites.json';

const ActualitesPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug || '';
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Simulation d'un appel API
    setTimeout(() => {
      // Convertir les données pour correspondre au type Actualite
      const formattedData = actualitesData.map(item => ({
        ...item,
        tempsLecture: item.tempsLecture.toString(),
        extrait: item.extrait || '',
        auteur: item.auteur || '',
        tags: item.tags || []
      }));
      
      setActualites(formattedData);
      setLoading(false);
    }, 500);
  }, []);

  // Si on a un slug, afficher le détail de l'article
  if (slug) {
    const actualite = actualites.find(a => a.id.toString() === slug);
    
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      );
    }

    if (!actualite) {
      return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <EmptyState 
              title="Article non trouvé"
              description="L'article que vous cherchez n'existe pas ou a été supprimé."
              icon="❌"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <ActualiteDetail actualite={actualite} />
        </div>
      </div>
    );
  }

  // Page de liste des actualités
  const allTags = [...new Set(actualites.flatMap(a => a.tags))];
  
  const filteredActualites = actualites.filter(actualite => {
    const matchesTag = !selectedTag || (actualite.tags?.includes(selectedTag) || false);
    const matchesSearch = !searchTerm || 
      actualite.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (actualite.extrait?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (actualite.auteur?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    return matchesTag && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Actualités TechJus
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Restez informé des dernières évolutions en matière de droit, technologie et éthique numérique
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          {/* Barre de recherche */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value || '')}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Filtrer par catégorie
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  !selectedTag 
                    ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? '' : tag || '')}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedTag === tag
                      ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Résumé des filtres */}
          {(selectedTag || searchTerm) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Filtres actifs :</span>
                {searchTerm && (
                  <Tag variant="primary" size="sm">"{searchTerm}"</Tag>
                )}
                {selectedTag && (
                  <Tag variant={selectedTag} size="sm">{selectedTag}</Tag>
                )}
                <button
                  onClick={() => {
                    setSelectedTag('');
                    setSearchTerm('');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium ml-2"
                >
                  Effacer tous
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Statistiques */}
        <div className="mb-8">
          <p className="text-gray-600">
            {filteredActualites.length} article{filteredActualites.length !== 1 ? 's' : ''} trouvé{filteredActualites.length !== 1 ? 's' : ''}
            {selectedTag && ` dans la catégorie "${selectedTag}"`}
          </p>
        </div>

        {/* Grille d'articles */}
        {filteredActualites.length === 0 ? (
          <EmptyState 
            title="Aucun article trouvé"
            description="Essayez d'ajuster vos filtres ou votre recherche."
            icon="🔍"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActualites.map(actualite => (
              <ActualiteCard key={actualite.id} actualite={actualite} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActualitesPage;
