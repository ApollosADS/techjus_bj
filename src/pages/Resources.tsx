import React, { useState, useMemo } from 'react';
import { BookOpen, Users, Target, Filter, Calendar, Clock, User } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Types pour TypeScript
interface FilterState {
  category: string;
  type: string;
}

interface Resource {
  title: string;
  description: string;
  category: string;
  type: string;
  author: string;
  date: string;
  readTime: string;
  link: string;
}

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
}

// FilterSection component
const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Toutes');
  const [activeType, setActiveType] = useState<string>('Tous');
  
  const categories = ['Toutes', 'Données personnelles', 'IA', 'Blockchain', 'Cybersécurité', 'E-commerce', 'Propriété Intellectuelle'];
  const types = ['Tous', 'Guide', 'Article', 'Étude de cas', 'Ouvrage', 'Dictionnaire', 'Rapport', 'Cours', 'Documentation'];
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onFilterChange({ category, type: activeType });
  };
  
  const handleTypeChange = (type: string) => {
    setActiveType(type);
    onFilterChange({ category: activeCategory, type });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <span className="font-medium text-gray-700">Filtres</span>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Catégorie</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              type="button"
              size="sm"
              variant={activeCategory === category ? 'default' : 'secondary'}
              className={`rounded-full ${activeCategory === category ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Type de contenu</label>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Button
              key={type}
              type="button"
              size="sm"
              variant={activeType === type ? 'default' : 'secondary'}
              className={`rounded-full ${activeType === type ? 'bg-green-600 hover:bg-green-700' : ''}`}
              onClick={() => handleTypeChange(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ResourceCard component
const ResourceCard: React.FC<Resource> = ({ 
  title, 
  description, 
  category, 
  type, 
  author, 
  date, 
  readTime}) => {
  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'Guide': return 'bg-blue-100 text-blue-800';
      case 'Article': return 'bg-green-100 text-green-800';
      case 'Étude de cas': return 'bg-purple-100 text-purple-800';
      case 'Ouvrage': return 'bg-orange-100 text-orange-800';
      case 'Dictionnaire': return 'bg-indigo-100 text-indigo-800';
      case 'Rapport': return 'bg-red-100 text-red-800';
      case 'Cours': return 'bg-yellow-100 text-yellow-800';
      case 'Documentation': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleReadMore = () => {
    // Désactivé jusqu'à ce que les ressources soient disponibles
    // window.location.href = link;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 opacity-75">
      <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <BookOpen className="w-16 h-16 text-blue-500 opacity-50" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
            {type}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
        
        <Button
          type="button"
          variant="secondary"
          className="w-full cursor-not-allowed bg-gray-400 text-white hover:bg-gray-400"
          disabled
          onClick={handleReadMore}
        >
          Bientôt disponible
        </Button>
      </div>
    </div>
  );
};

const Resources: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({ category: 'Toutes', type: 'Tous' });
  const [shouldNavigateToContact, setShouldNavigateToContact] = useState<boolean>(false);
  
  const handleContactClick = () => {
    setShouldNavigateToContact(true);
  };
  
  // Filtrage des ressources avec useMemo pour optimiser les performances
  const filteredResources = useMemo(() => {
    const resources: Resource[] = [
      {
        title: "Guide complet sur la protection des données personnelles",
        description: "Découvrez tout ce que vous devez savoir sur le Règlement Général sur la Protection des Données et sa mise en application pratique.",
        category: "Données personnelles",
        type: "Guide",
        author: "",
        date: "15 Nov 2024",
        readTime: "10 min",
        link: "/resources/donnees-personnelles-guide"
      },
      {
        title: "L'IA et le droit : enjeux et perspectives",
        description: "Analyse approfondie des implications juridiques de l'intelligence artificielle dans le monde des affaires.",
        category: "IA",
        type: "Article",
        author: "",
        date: "12 Nov 2024",
        readTime: "8 min",
        link: "/resources/ia-droit"
      },
      {
        title: "Blockchain et contrats intelligents",
        description: "Comprendre les aspects juridiques de la blockchain et des smart contracts dans l'écosystème numérique.",
        category: "Blockchain",
        type: "Étude de cas",
        author: "",
        date: "10 Nov 2024",
        readTime: "12 min",
        link: "/resources/blockchain-contrats"
      },
      {
        title: "Cybersécurité et responsabilité juridique",
        description: "Les obligations légales des entreprises en matière de cybersécurité et protection des données.",
        category: "Cybersécurité",
        type: "Guide",
        author: "",
        date: "8 Nov 2024",
        readTime: "15 min",
        link: "/resources/cybersecurite-juridique"
      },
      {
        title: "E-commerce et droit de la consommation",
        description: "Réglementations et bonnes pratiques pour les plateformes de commerce électronique.",
        category: "E-commerce",
        type: "Article",
        author: "",
        date: "5 Nov 2024",
        readTime: "9 min",
        link: "/resources/ecommerce-droit"
      },
      {
        title: "Propriété intellectuelle et Intelligence artificielle",
        description: "Protection des créations numériques et enjeux de la propriété intellectuelle en ligne.",
        category: "Propriété Intellectuelle",
        type: "Étude de cas",
        author: "",
        date: "2 Nov 2024",
        readTime: "11 min",
        link: "/resources/propriete-intellectuelle"
      }
    ];
    
    return resources.filter(resource => {
      const categoryMatch = filters.category === 'Toutes' || resource.category === filters.category;
      const typeMatch = filters.type === 'Tous' || resource.type === filters.type;
      return categoryMatch && typeMatch;
    });
  }, [filters]);
  
  if (shouldNavigateToContact) {
    return <Navigate to="/contact" replace />;
  }
  
  const stats = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      number: "150+",
      label: "Ressources à venir",
      color: "text-blue-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: "Professionnels à former",
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
    <div className="page-canvas">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-techjus-blue to-slate-900 py-20 text-white">
        <div className="bg-opportunites-mesh absolute inset-0 opacity-20" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-techjus-blue/20" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-techjus-yellow/90">
              Documentation & veille
            </p>
            <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Centre de <span className="text-blue-300">Ressources</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
              Découvrez nos articles, cours, ouvrages, magazine, thèses de doctorat, mémoires de master, et formations sur les aspects juridiques du numérique. 
              Une bibliothèque complète pour les professionnels du droit et du digital.
            </p>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-2xl border border-white/15 bg-white/10 p-6 text-center shadow-lg backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
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
      
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="mb-12 rounded-2xl border border-slate-200/90 bg-white/90 p-8 shadow-techjus backdrop-blur-sm">
          <h2 className="mb-6 flex items-center text-2xl font-bold text-slate-900">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-green-400 rounded-full mr-4"></div>
            Filtrer les ressources
          </h2>
          <FilterSection onFilterChange={setFilters} />
        </div>
        
        {/* Resources Grid */}
        <div className="mb-8">
          <h2 className="mb-2 font-heading text-3xl font-bold tracking-tight text-slate-900">
            {filteredResources.length > 0 ? (
              <>Nos <span className="text-blue-400">ressources</span> ({filteredResources.length})</>
            ) : (
              <>Aucune <span className="text-blue-400">ressource</span> trouvée</>
            )}
          </h2>
        </div>
        
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <div key={`${resource.link}-${index}`} className="transition-all duration-300">
                <ResourceCard {...resource} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucune ressource ne correspond aux filtres sélectionnés.</p>
            <p className="text-gray-400 text-sm mt-2">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-techjus-blue to-techjus-green p-8 text-center text-white shadow-techjus-lg">
          <h3 className="mb-4 text-2xl font-bold text-white">
            Vous ne trouvez pas ce que vous cherchez ?
          </h3>
          <p className="mb-6 text-lg text-white/90">
            Contactez notre équipe pour obtenir des conseils personnalisés
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white font-semibold text-blue-600 hover:bg-gray-100"
            onClick={handleContactClick}
          >
            Nous contacter
          </Button>
          </div>
      </div>
    </div>
  );
};

export default Resources;