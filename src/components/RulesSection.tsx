import React from 'react';
import { Check } from 'lucide-react';

const rules = [
  'Respect et bienveillance envers tous les membres de la communauté',
  'Partage d\'informations vérifiées et fiables sur le droit numérique',
  'Participation active aux discussions et aux événements',
  'Promotion des valeurs de transparence et d\'équité numérique',
  'Respect de la confidentialité et des données personnelles'
];

const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos valeurs</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            TechJus s'appuie sur des principes forts qui guident notre communauté et nos actions quotidiennes.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-6">
            {rules.map((rule, index) => (
              <li 
                key={index} 
                className="flex items-start group transition-transform duration-300 transform hover:translate-x-2"
              >
                <div className="bg-techjus-yellow p-2 rounded-full mr-4 group-hover:bg-techjus-red transition-colors duration-300">
                  <Check className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="text-lg pt-1">{rule}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;