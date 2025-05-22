import React from 'react';
import { FileText, MessageSquare, Users, CheckCircle } from 'lucide-react';

const StepsSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Soumettez votre demande",
      description: "Décrivez votre problématique juridique en détail via notre formulaire sécurisé.",
      icon: <FileText className="text-white" size={24} />,
      color: "bg-techjus-blue"
    },
    {
      number: 2,
      title: "Évaluation préliminaire",
      description: "Nos experts analysent votre demande et vous proposent une approche adaptée.",
      icon: <MessageSquare className="text-white" size={24} />,
      color: "bg-techjus-green"
    },
    {
      number: 3,
      title: "Consultation personnalisée",
      description: "Rendez-vous avec nos spécialistes pour une consultation approfondie.",
      icon: <Users className="text-white" size={24} />,
      color: "bg-techjus-yellow"
    },
    {
      number: 4,
      title: "Solutions & suivi",
      description: "Recevez des recommandations concrètes et un suivi personnalisé de votre dossier.",
      icon: <CheckCircle className="text-white" size={24} />,
      color: "bg-techjus-red"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-techjus-blue mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Un processus simple et transparent pour obtenir les conseils juridiques dont vous avez besoin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Flèche de connexion */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gray-300 z-0">
                  <div className="absolute right-0 top-[-3px] w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              )}
              
              {/* Carte d'étape */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 relative z-10">
                {/* Icône */}
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {step.icon}
                </div>
                
                {/* Numéro d'étape */}
                <div className="bg-gray-100 text-techjus-blue font-bold text-sm px-3 py-1 rounded-full inline-block mb-3">
                  Étape {step.number}
                </div>
                
                {/* Contenu */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;