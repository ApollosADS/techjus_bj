import React, { useState } from 'react';
import Header from '../components/Header';
import FilterSection from '../components/FiltersSection';
import ResourceCard from '../components/ResourcesCard';
import { BookOpen, Users, Target } from 'lucide-react';

const Resources: React.FC = () => {
  const [filters, setFilters] = useState({});

  const resources = [
    {
      title: "Guide complet sur la protection des données personnelles",
      description: "Découvrez tout ce que vous devez savoir sur le Règlement Général sur la Protection des Données et sa mise en application pratique.",
      category: "Données personnelles",
      type: "Guide",
      author: "Philippe V. DJOKO",
      date: "15 Nov 2024",
      readTime: "10 min",
      imageUrl: "/api/placeholder/400/200",
      link: "/resources/données personnelles-guide"
    },
    {
      title: "L'IA et le droit : enjeux et perspectives",
      description: "Analyse approfondie des implications juridiques de l'intelligence artificielle dans le monde des affaires.",
      category: "IA",
      type: "Article",
      author: "Marielle I. KPASSASSI",
      date: "12 Nov 2024",
      readTime: "8 min",
      imageUrl: "/api/placeholder/400/200",
      link: "/resources/ia-droit"
    },
    {
      title: "Blockchain et contrats intelligents",
      description: "Comprendre les aspects juridiques de la blockchain et des smart contracts dans l'écosystème numérique.",
      category: "Blockchain",
      type: "Étude de cas",
      author: "Fidèle DOSSOU",
      date: "10 Nov 2024",
      readTime: "12 min",
      imageUrl: "/api/placeholder/400/200",
      link: "/resources/blockchain-contrats"
    },
    {
      title: "Cybersécurité et responsabilité juridique",
      description: "Les obligations légales des entreprises en matière de cybersécurité et protection des données.",
      category: "Cybersécurité",
      type: "Guide",
      author: "Philippe V. DJOKO",
      date: "8 Nov 2024",
      readTime: "15 min",
      imageUrl: "/api/placeholder/400/200",
      link: "/resources/cybersecurite-juridique"
    },
    {
      title: "E-commerce et droit de la consommation",
      description: "Réglementations et bonnes pratiques pour les plateformes de commerce électronique.",
      category: "E-commerce",
      type: "Article",
      author: "Marielle I. KPASSASSI",
      date: "5 Nov 2024",
      readTime: "9 min",
      imageUrl: "/api/placeholder/400/200",
      link: "/resources/ecommerce-droit"
    },
    {
      title: "Propriété intellectuelle et Intelligence artificielle",
      description: "Protection des créations numériques et enjeux de la propriété intellectuelle en ligne.",
      category: "Propriété Intellectuelle",
      type: "Étude de cas",
      author: "Fidèle DOSSOU",
      date: "2 Nov 2024",
      readTime: "11 min",
      imageUrl: "/api/placeholder/400/200",
      link: "/resources/propriete-intellectuelle"
    }
  ];

  const stats = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      number: "150+",
      label: "Ressources disponibles",
      color: "text-blue-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: "Professionnels formés",
      color: "text-green-400"
    },
    {
      icon: <Target className="w-8 h-8" />,
      number: "25+",
      label: "Thématiques couvertes",
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              Centre de <span className="text-white-400">Ressources</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos des articles, cours, ouvrages, magazine, thèses de doctorat & mémoires de master, et formations sur les aspects juridiques du numérique. 
              Une bibliothèque complète pour les professionnels du droit et du digital.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className={`${stat.color} flex justify-center mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-green-400 rounded-full mr-4"></div>
            Filtrer les ressources
          </h2>
          <FilterSection onFilterChange={setFilters} />
        </div>

        {/* Resources Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Toutes nos <span className="text-blue-400">ressources</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Explorez notre collection de guides, articles et études de cas sur le droit du numérique
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="transform hover:scale-105 transition-all duration-300">
              <ResourceCard {...resource} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Contactez notre équipe d'experts pour obtenir des conseils personnalisés
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Nous contacter
          </button>
        </div>
      </main>
    </div>
  );
};

export default Resources;