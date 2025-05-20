import React from 'react';
import { BookOpen, Scale, Users, Lightbulb } from 'lucide-react';

interface FeatureItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <BookOpen className="h-12 w-12 text-techjus-yellow" />,
    title: 'Ressources éducatives',
    description: 'Accédez à des articles, guides et formations sur les aspects juridiques du numérique.'
  },
  {
    icon: <Scale className="h-12 w-12 text-techjus-yellow" />,
    title: 'Veille juridique',
    description: 'Suivez l\'évolution de la législation, de la jurisprudence et de la doctrine du numérique.'
  },
  {
    icon: <Users className="h-12 w-12 text-techjus-yellow" />,
    title: 'Communauté d\'experts',
    description: 'Échangez avec des professionnels du droit et des experts du numérique.'
  },
  {
    icon: <Lightbulb className="h-12 w-12 text-techjus-yellow" />,
    title: 'Événements',
    description: 'Participez à nos conférences, ateliers et tables rondes sur les enjeux juridiques actuels.'
  }
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            TechJus vise à rendre le droit du numérique accessible à tous, en créant un pont entre 
            les experts juridiques et les acteurs du numérique pour relever ensemble les défis 
            de la transformation digitale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-techjus-light rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;