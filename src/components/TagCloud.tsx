import React, { useState } from 'react';

interface Tag {
  name: string;
  count: number;
  category: string;
}

interface TagCloudProps {
  onTagClick: (tag: string) => void;
}

const TagCloud: React.FC<TagCloudProps> = ({ onTagClick }) => {
  const [selectedTag, setSelectedTag] = useState('');

  const tags: Tag[] = [
    { name: 'Données personnelles', count: 45, category: 'data' },
    { name: 'Intelligence Artificielle', count: 32, category: 'tech' },
    { name: 'Blockchain', count: 28, category: 'tech' },
    { name: 'E-commerce', count: 41, category: 'business' },
    { name: 'Cybersécurité', count: 35, category: 'security' },
    { name: 'Droit d\'auteur', count: 29, category: 'law' },
    { name: 'Contrats numériques', count: 38, category: 'law' },
    { name: 'Protection des données', count: 42, category: 'data' },
    { name: 'Cloud Computing', count: 25, category: 'tech' },
    { name: 'Propriété intellectuelle', count: 33, category: 'law' },
    { name: 'Fintech', count: 27, category: 'business' },
    { name: 'IoT', count: 22, category: 'tech' },
    { name: 'Signature électronique', count: 31, category: 'business' },
    { name: 'Compliance', count: 36, category: 'law' },
    { name: 'Open Source', count: 24, category: 'tech' },
    { name: 'Éthique', count: 39, category: 'ethics' },
    { name: 'Gouvernance internet', count: 26, category: 'governance' },
    { name: 'Télécommunications', count: 34, category: 'telecom' },
    { name: 'Câble sous-marin', count: 19, category: 'telecom' },
    { name: 'GAFAM', count: 37, category: 'business' },
    { name: 'Géopolitique du numérique', count: 30, category: 'governance' },
    { name: 'Économie numérique', count: 40, category: 'business' }
  ];

  const getTagSize = (count: number) => {
    const maxCount = Math.max(...tags.map(t => t.count));
    const minCount = Math.min(...tags.map(t => t.count));
    const ratio = (count - minCount) / (maxCount - minCount);
    return 12 + ratio * 12; // Taille entre 12px et 24px
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      data: 'text-techjus-blue hover:text-techjus-blue-dark',
      tech: 'text-techjus-green hover:text-techjus-green-dark',
      business: 'text-techjus-yellow hover:text-techjus-yellow-dark',
      law: 'text-techjus-red hover:text-techjus-red-dark',
      security: 'text-techjus-orange hover:text-techjus-orange-dark',
      ethics: 'text-purple-600 hover:text-purple-800',
      governance: 'text-indigo-600 hover:text-indigo-800',
      telecom: 'text-teal-600 hover:text-teal-800'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 hover:text-gray-800';
  };

  const handleTagClick = (tagName: string) => {
    setSelectedTag(tagName);
    onTagClick(tagName);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Explorez nos thématiques</h3>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {tags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => handleTagClick(tag.name)}
            className={`
              inline-block px-3 py-2 rounded-full border-2 transition-all duration-300 font-medium
              ${selectedTag === tag.name
                ? 'bg-techjus-blue text-white border-techjus-blue'
                : `bg-white border-gray-200 ${getCategoryColor(tag.category)}`
              }
              hover:shadow-md hover:scale-105 hover:border-techjus-blue
            `}
            style={{ fontSize: `${getTagSize(tag.count)}px` }}
          >
            {tag.name}
            <span className="ml-1 text-xs opacity-70">({tag.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;