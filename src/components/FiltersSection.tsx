import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterSectionProps {
  onFilterChange: (filters: any) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const categories = ['RGPD', 'IA', 'Blockchain', 'E-commerce', 'Cybersécurité'];
  const types = ['Article', 'Guide', 'Vidéo', 'Webinar', 'Étude de cas'];

  const handleFilterChange = () => {
    onFilterChange({
      search: searchTerm,
      category: selectedCategory,
      type: selectedType
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="text-techjus-blue" size={20} />
        <h2 className="text-xl font-bold text-techjus-blue">Filtrer les ressources</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange();
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techjus-blue focus:border-transparent"
          />
        </div>

        {/* Filtre par catégorie */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleFilterChange();
          }}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techjus-blue focus:border-transparent"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Filtre par type */}
        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            handleFilterChange();
          }}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techjus-blue focus:border-transparent"
        >
          <option value="">Tous les types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSection;