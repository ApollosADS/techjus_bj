import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Phone } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FormationsFAQAccordion: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      question: "Comment s'inscrire à une formation ?",
      answer: "L'inscription se fait en ligne via notre plateforme. Sélectionnez votre formation, remplissez le formulaire d'inscription et procédez au paiement. Vous recevrez une confirmation par email avec tous les détails pratiques."
    },
    {
      question: "Quels sont les prérequis pour participer aux formations ?",
      answer: "Les prérequis varient selon le niveau de la formation. Les formations 'Débutant' ne nécessitent aucun prérequis particulier. Pour les niveaux 'Intermédiaire' à 'Expert', une expérience juridique ou technique est recommandée. Consultez la description de chaque formation pour plus de détails."
    },
    {
      question: "Les formations sont-elles certifiantes ?",
      answer: "Oui, toutes nos formations délivrent un certificat de participation reconnu par les professionnels du secteur. Pour les formations avancées, nous proposons également des certifications avec évaluation finale."
    },
    {
      question: "Peut-on suivre les formations à distance ?",
      answer: "Absolument ! Nous proposons un format hybride avec des sessions en présentiel à Cotonou et des formations 100% en ligne via notre plateforme sécurisée. Les supports de cours et enregistrements sont accessibles pendant 6 mois."
    },
    {
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons les virements bancaires, les paiements mobile money (MTN Mobile Money, Moov Money), et les cartes bancaires. Des facilités de paiement en plusieurs échéances sont possibles pour les formations longues."
    },
    {
      question: "Y a-t-il des réductions pour les groupes ?",
      answer: "Oui, nous offrons des tarifs préférentiels pour les inscriptions groupées : 10% de réduction pour 3-5 participants, 15% pour 6-10 participants, et 20% pour plus de 10 participants d'une même organisation."
    },
    {
      question: "Que se passe-t-il si je ne peux pas assister à une session ?",
      answer: "Toutes les sessions sont enregistrées et accessibles en replay. En cas d'absence justifiée, vous pouvez également reporter votre participation à la session suivante sans frais supplémentaires."
    },
    {
      question: "Les supports de cours sont-ils inclus ?",
      answer: "Oui, tous les supports de formation sont inclus : documents PDF, présentations, cas pratiques, modèles de contrats, et accès à notre bibliothèque juridique numérique pendant 6 mois après la formation."
    },
    {
      question: "Proposez-vous des formations sur mesure pour les entreprises ?",
      answer: "Oui, nous concevons des programmes de formation personnalisés selon les besoins spécifiques de votre organisation. Contactez-nous pour discuter de vos besoins et obtenir un devis sur mesure."
    },
    {
      question: "Comment se déroule l'évaluation finale ?",
      answer: "L'évaluation comprend un QCM en ligne et/ou un cas pratique à résoudre selon le niveau de la formation. Les participants doivent obtenir 70% minimum pour valider leur certification. Deux tentatives sont autorisées."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-techjus-light">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-techjus-blue mb-4">
            Questions Fréquentes sur nos Formations
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur nos programmes de formation en droit du numérique
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-techjus-blue focus:ring-opacity-50"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-techjus-blue pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronUp className="text-techjus-blue" size={24} />
                    ) : (
                      <ChevronDown className="text-techjus-blue" size={24} />
                    )}
                  </div>
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-6 border-t border-techjus-light bg-gray-50">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section Contact pour plus d'informations */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-techjus-yellow">
            <h3 className="text-2xl font-bold text-techjus-blue mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Notre équipe d'experts est là pour vous accompagner dans le choix de votre formation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-techjus-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-techjus-red transition-colors duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <MessageCircle size={20} />
                Nous contacter
              </button>
              <button className="border-2 border-techjus-yellow bg-techjus-yellow text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-techjus-yellow transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <Phone size={20} />
                Demander un conseil
              </button>
            </div>

            {/* Informations de contact supplémentaires */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">
                Vous pouvez également nous joindre directement :
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-techjus-blue">
                <span className="font-medium">📧 formations@techjus.org</span>
                <span className="hidden sm:block">•</span>
                <span className="font-medium">📱 +229 XX XX XX XX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormationsFAQAccordion;