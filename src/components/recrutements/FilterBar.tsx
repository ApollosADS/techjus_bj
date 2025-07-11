// src/components/recrutements/FilterBar.tsx
import React from 'react';
import Tag from '../shared/Tag';

interface FilterBarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  typeFilter: string;
  onTypeChange: (type: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showExpired: boolean;
  onShowExpiredChange: (show: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  categories, // Utiliser les catégories passées en props au lieu de la liste hardcodée
  selectedCategories, 
  onCategoryChange, 
  typeFilter, 
  onTypeChange,
  searchTerm,
  onSearchChange,
  showExpired,
  onShowExpiredChange
}) => {
  // Supprimer la liste hardcodée et utiliser les catégories des props
  // const allCategories = [...] - SUPPRIMÉ

  const typeOptions = [
    { value: '', label: 'Tous les types' },
    { value: 'CDI', label: 'CDI' },
    { value: 'CDD', label: 'CDD' },
    { value: 'Stage', label: 'Stage' },
    { value: 'Mission', label: 'Mission' },
    { value: 'Fonction publique', label: 'Fonction publique' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un poste, une organisation..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filtres */}
      <div className="space-y-4">
        {/* Type de contrat */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de contrat
          </label>
          <select
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Catégories - Utiliser les catégories dynamiques */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Catégories
          </label>
          
          {/* Afficher un message si aucune catégorie n'est disponible */}
          {categories.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune catégorie disponible</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`
                    px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200
                    ${selectedCategories.includes(category)
                      ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {category}
                  {selectedCategories.includes(category) && (
                    <span className="ml-2">×</span>
                  )}
                </button>
              ))}
            </div>
          )}
          
          {selectedCategories.length > 0 && (
            <button
              onClick={() => onCategoryChange('')} // Clear all
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Effacer tous les filtres
            </button>
          )}
        </div>

        {/* Options supplémentaires */}
        <div className="flex items-center pt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showExpired}
              onChange={(e) => onShowExpiredChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">
              Afficher les offres expirées
            </span>
          </label>
        </div>
      </div>

      {/* Résumé des filtres actifs */}
      {(selectedCategories.length > 0 || typeFilter || searchTerm) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Filtres actifs :</span>
            
            {searchTerm && (
              <Tag variant="primary" size="sm">
                "{searchTerm}"
              </Tag>
            )}
            
            {typeFilter && (
              <Tag variant="primary" size="sm">
                {typeOptions.find(opt => opt.value === typeFilter)?.label}
              </Tag>
            )}
            
            {selectedCategories.map(category => (
              <Tag key={category} variant="default" size="sm">
                {category}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {/* Debug info - à retirer en production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
          <p><strong>Debug FilterBar:</strong></p>
          <p>Catégories disponibles: {categories.join(', ')}</p>
          <p>Catégories sélectionnées: {selectedCategories.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default FilterBar;