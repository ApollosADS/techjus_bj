import React from 'react';
import Header from '../components/Header';
import TagCloud from '../components/TagCloud';

const Thematiques: React.FC = () => {
  const handleTagClick = (tag: string) => {
    console.log(`Tag sélectionné : ${tag}`);
    // Tu peux ici ajouter une navigation ou un filtre
  };

  return (
    <div>
      <Header />
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white py-20 mt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Thématiques
            </h1>
      </section>

      <main className="container-custom py-12">
        <TagCloud onTagClick={handleTagClick} />

        {/* Tu peux ajouter ici les sections détaillées par catégorie si nécessaire */}
      </main>
    </div>
  );
};

export default Thematiques;
