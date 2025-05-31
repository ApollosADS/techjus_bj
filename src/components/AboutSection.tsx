import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, FolderOpen, GraduationCap } from 'lucide-react';

interface FeatureItem {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
}

const features: FeatureItem[] = [
  {
    icon: <Users className="h-12 w-12 text-techjus-yellow" />,
    title: 'Présentation',
    description: 'Découvrez notre communauté, notre mission et nos objectifs pour le développement du droit du numérique au Bénin.',
    link: '/presentation'
  },
  {
    icon: <BookOpen className="h-12 w-12 text-techjus-yellow" />,
    title: 'Ressources',
    description: 'Accédez à des articles, cours, ouvrages, magazines, thèses de doctorat, mémoires de master, et formations sur les aspects juridiques du numérique.',
    link: '/resources'
  },
  {
    icon: <FolderOpen className="h-12 w-12 text-techjus-yellow" />,
    title: 'Thématiques',
    description: 'Explorez nos différentes thématiques spécialisées dans le droit du numérique et les technologies émergentes.',
    link: '/thematiques'
  },
  {
    icon: <GraduationCap className="h-12 w-12 text-techjus-yellow" />,
    title: 'Formations',
    description: 'Participez à nos conférences, ateliers, formations et tables rondes sur les enjeux juridiques actuels.',
    link: '/formations'
  }
];

const AboutSection: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(link);
  };
  return (
    <section id="about" className="section bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-techjus-blue mb-6">
            Explorez TechJus.bj
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez toutes les facettes de notre plateforme dédiée au droit du numérique
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              onClick={() => handleNavigation(feature.link)}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">{feature.description}</p>
              
              {/* Indicateur de clic */}
              <div className="mt-4 text-center">
                <span className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                  En savoir plus →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;