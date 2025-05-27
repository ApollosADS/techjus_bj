// TagCloud.tsx
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
    { name: 'Open Source', count: 24, category: 'tech' }
  ];

  const getTagSize = (count: number) => {
    const maxCount = Math.max(...tags.map(t => t.count));
    const minCount = Math.min(...tags.map(t => t.count));
    const ratio = (count - minCount) / (maxCount - minCount);
    return 12 + ratio * 12; // Taille entre 12px et 24px
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      data: 'text-blue-600 hover:text-blue-800',
      tech: 'text-green-600 hover:text-green-800',
      business: 'text-yellow-600 hover:text-yellow-800',
      law: 'text-red-600 hover:text-red-800',
      security: 'text-orange-600 hover:text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 hover:text-gray-800';
  };

  const handleTagClick = (tagName: string) => {
    setSelectedTag(tagName);
    onTagClick(tagName);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
      <h2 className="text-2xl font-bold text-techjus-blue mb-6 text-center">
        Explorez nos thématiques
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4 leading-relaxed">
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
            <span className="ml-2 text-xs opacity-75">({tag.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;