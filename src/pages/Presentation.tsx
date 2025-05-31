import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Globe, MessageSquare, Target, Heart, Scale, Lightbulb, AlertCircle } from 'lucide-react';

const Presentation: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleJoinClick = () => {
    setShowModal(true);
  };

  const confirmJoin = () => {
    window.open("https://chat.whatsapp.com/LWSxo3cWM0X7BJacOfXBw7", "_blank");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-techjus-light to-white animate-fade-in">
      {/* Section Héros */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-techjus-blue mb-6 font-heading text-balance">
              Bienvenue dans la communauté
              <div className="inline-block align-middle ml-2 animate-pulse-slow">
                <span className="text-techjus-blue font-black">T</span>
                <span className="text-techjus-blue font-black">e</span>
                <span className="text-techjus-blue font-black">c</span>
                <span className="text-techjus-blue font-black">h</span>
                <span className="text-techjus-blue font-black">J</span>
                <span className="text-techjus-blue font-black">u</span>
                <span className="text-techjus-blue font-black">s</span>
                <span className="text-techjus-green font-black">.</span>
                <span className="text-techjus-yellow font-black">b</span>
                <span className="text-techjus-red font-black">j</span>
              </div>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-techjus-blue to-techjus-green mx-auto mb-8 rounded-full"></div>
          </div>

          {/* Message de bienvenue */}
          <div className="bg-white rounded-2xl shadow-techjus-lg p-8 md:p-12 mb-16 border-l-4 border-techjus-yellow animate-slide-up">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-techjus-light p-4 rounded-full shadow-inner">
                <MessageSquare className="text-techjus-blue" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-techjus-blue mb-6 text-center font-heading">
              Message de bienvenue
            </h2>
            <div className="prose prose-xl mx-auto text-gray-700 leading-relaxed font-body">
              <p className="text-xl font-medium text-techjus-blue mb-6">
                Chers Membres,
              </p>
              <p className="mb-6 text-lg text-justify">
                Nous avons l'immense plaisir de vous présenter <strong className="text-techjus-blue bg-techjus-light/50 px-1 rounded">"TechJus"</strong>, une plateforme entièrement dédiée au droit du numérique.
              </p>
              <p className="mb-6 text-lg text-justify">
                Elle vise à rassembler les juristes experts et passionnés des thématiques en rapport avec les nouvelles technologies pour ainsi créer un espace de travail, un incubateur de solutions juridiques et d'innovation technologique.
              </p>
              <p className="mb-0 text-lg text-justify">
                Notre ambition est de créer une communauté scientifique pour faciliter le partage de connaissances, analyser ensemble les évolutions législatives, jurisprudentielles, doctrinales et stimuler des discussions enrichissantes sur les enjeux juridiques du numérique.
              </p>
            </div>
          </div>

          {/* Objectifs de la communauté */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <BookOpen className="text-techjus-yellow" size={24} />,
                title: "Ressources éducatives",
                description: "Accédez à des articles, guides et formations sur les aspects juridiques du numérique."
              },
              {
                icon: <Scale className="text-techjus-yellow" size={24} />,
                title: "Veille juridique",
                description: "Suivez l'évolution de la législation et de la jurisprudence dans le domaine des nouvelles technologies."
              },
              {
                icon: <Users className="text-techjus-yellow" size={24} />,
                title: "Communauté d'experts",
                description: "Échangez avec des professionnels du droit et des experts du numérique."
              },
              {
                icon: <Lightbulb className="text-techjus-yellow" size={24} />,
                title: "Événements",
                description: "Participez à nos conférences, Webinaires, ateliers et tables rondes sur les enjeux juridiques actuels."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-techjus p-6 text-center hover:shadow-techjus-lg transition-all duration-300 hover:transform hover:scale-105 border-b-4 border-techjus-yellow"
              >
                <div className="bg-techjus-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-techjus-blue mb-3 font-heading">{item.title}</h3>
                <p className="text-gray-600 font-body">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Public cible */}
          <div className="bg-white rounded-2xl shadow-techjus-lg p-8 md:p-12 border-l-4 border-techjus-blue">
            <div className="text-center mb-8">
              <div className="bg-techjus-light p-4 rounded-full inline-block mb-4 shadow-inner">
                <Heart className="text-techjus-red" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-techjus-blue mb-4 font-heading">
                Une communauté pour tous
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-body">
                TechJus s'adresse à tous les professionnels passionnés par l'intersection entre le droit et la technologie
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <ul className="space-y-3 text-gray-700 font-body">
                  {['Avocats spécialisés en droit du numérique', 'Magistrats et conseillers juridiques', 'Professeurs et chercheurs en droit'].map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-center bg-techjus-light p-3 rounded-lg border border-gray-100"
                    >
                      <div className="w-2 h-2 bg-techjus-blue rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <ul className="space-y-3 text-gray-700 font-body">
                  {['Responsables de la conformité', 'Consultants en transformation numérique', 'Étudiants en droit du numérique, etc...'].map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-center bg-techjus-light p-3 rounded-lg border border-gray-100"
                    >
                      <div className="w-2 h-2 bg-techjus-green rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Appel à l'action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-techjus-blue to-techjus-green rounded-2xl p-8 text-white shadow-techjus-lg">
              <Globe className="mx-auto mb-4 text-white" size={48} />
              <h2 className="text-2xl font-bold mb-4 text-white font-heading">
                Rejoignez notre communauté dès aujourd'hui
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto font-body">
                Participez aux discussions, partagez votre expertise et contribuez au développement du droit du numérique au Bénin
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleJoinClick}
                  className="bg-white text-techjus-blue px-8 py-3 rounded-lg font-semibold hover:bg-techjus-yellow hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Rejoindre WhatsApp
                </button>
                <Link
                  to="/contact"
                  className="bg-techjus-yellow text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-techjus-yellow transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-2xl w-full text-center relative">
            <AlertCircle className="w-12 h-12 text-techjus-blue mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold mb-4 text-techjus-blue font-heading">Avant de continuer</h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg font-body">
              <strong className="text-techjus-blue">TechJus ne collecte aucune de vos données.</strong><br />
              En cliquant sur ce lien vous consentez à rejoindre la communauté TechJus sur WhatsApp et à respecter le code de bonne conduite de ladite communauté. <br />
              <span className="text-techjus-blue font-semibold">Bienvenue dans l'univers TechJus.</span>
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition font-medium font-body"
              >
                Annuler
              </button>
              <button
                onClick={confirmJoin}
                className="bg-techjus-blue text-white px-5 py-2 rounded-lg hover:bg-techjus-dark transition font-medium font-body shadow-techjus hover:shadow-techjus-lg"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Presentation;