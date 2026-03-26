import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FormationsFAQAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "Qui peut participer aux formations TechJus ?",
      answer: "Nos formations sont ouvertes à tous les professionnels du droit et des technologies : avocats, juristes, magistrats, consultants, étudiants en droit, DPO, ainsi qu'aux professionnels des secteurs public et privé intéressés par le droit du numérique."
    },
    {
      question: "Quelle est la durée des formations ?",
      answer: "La durée varie selon la formation : de 1 jour pour les masterclasses intensives à 3 mois pour les formations complètes. Chaque formation précise sa durée dans sa description."
    },
    {
      question: "Les formations sont-elles certifiantes ?",
      answer: "Oui, toutes nos formations délivrent une attestation de participation. Certaines formations spécifiques délivrent également une certification reconnue par les organismes professionnels du secteur juridique."
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les paiements par carte bancaire, virement bancaire, ainsi que les paiements mobiles (Moov Money, Flooz). Les entreprises peuvent également nous contacter pour des arrangements de paiement spécifiques."
    },
    {
      question: "Puis-je annuler ou reporter ma participation ?",
      answer: "Vous pouvez annuler votre inscription jusqu'à 7 jours avant le début de la formation pour un remboursement complet. Les reports sont possibles sous réserve de disponibilité des places dans les sessions ultérieures."
    },
    {
      question: "Quel matériel est nécessaire pour suivre les formations en ligne ?",
      answer: "Pour nos formations à distance, vous aurez besoin d'un ordinateur avec connexion internet stable, d'un micro et d'une webcam. Tous les documents nécessaires vous seront fournis au format numérique avant la session."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Foire Aux Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Réponses aux questions fréquemment posées sur nos formations
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                className={`w-full flex justify-between items-center p-6 text-left ${
                  activeIndex === index ? 'bg-blue-50' : ''
                }`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="ml-4 text-blue-600">
                  {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={activeIndex !== index}
              >
                <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationsFAQAccordion;