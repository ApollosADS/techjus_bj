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
    <div className="min-h-screen bg-gradient-to-br from-techjus-light to-white">
      {/* Section Héros */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-techjus-blue mb-6">
              Bienvenue dans la communauté
              <div className="inline-block align-middle ml-2">
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
            <div className="w-24 h-1 bg-techjus-blue mx-auto mb-8"></div>
          </div>

          {/* Message de bienvenue */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border-l-4 border-techjus-yellow">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-techjus-light p-4 rounded-full">
                <MessageSquare className="text-techjus-blue" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-techjus-blue mb-6 text-center">
              Message de bienvenue
            </h2>
            <div className="prose prose-xl mx-auto text-gray-700 leading-relaxed">
              <p className="text-xl font-medium text-techjus-blue mb-6">
                Chers Membres,
              </p>
              <p className="mb-6 text-lg text-justify">
                Nous avons l'immense plaisir de vous présenter <strong className="text-techjus-blue">"TechJus"</strong>, une plateforme entièrement dédiée au droit du numérique au Bénin.
              </p>
              <p className="mb-6 text-lg text-justify">
                Elle vise à rassembler les juristes experts, et passionnés des thématiques en rapport avec les nouvelles technologies pour ainsi créer un espace de travail, un incubateur de solution juridique et d'innovation technologique.
              </p>
              <p className="mb-0 text-lg text-justify">
                Notre ambition est de créer une communauté scientifique pour faciliter le partage de connaissances, analyser l'ensemble des évolutions législatives actuelles, et stimuler des discussions enrichissantes sur les enjeux juridiques du numérique.
              </p>
            </div>
          </div>

          {/* Objectifs de la communauté */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-b-4 border-techjus-yellow">
              <div className="bg-techjus-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-techjus-yellow" size={24} />
              </div>
              <h3 className="text-xl font-bold text-techjus-blue mb-3">Ressources éducatives</h3>
              <p className="text-gray-600">
                Accédez à des articles, guides et formations sur les aspects juridiques du numérique.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-b-4 border-techjus-yellow">
              <div className="bg-techjus-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="text-techjus-yellow" size={24} />
              </div>
              <h3 className="text-xl font-bold text-techjus-blue mb-3">Veille juridique</h3>
              <p className="text-gray-600">
                Suivez l'évolution de la législation et de la jurisprudence dans le domaine numérique.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-b-4 border-techjus-yellow">
              <div className="bg-techjus-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-techjus-yellow" size={24} />
              </div>
              <h3 className="text-xl font-bold text-techjus-blue mb-3">Communauté d'experts</h3>
              <p className="text-gray-600">
                Échangez avec des professionnels du droit et des experts du numérique.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-b-4 border-techjus-yellow">
              <div className="bg-techjus-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-techjus-yellow" size={24} />
              </div>
              <h3 className="text-xl font-bold text-techjus-blue mb-3">Événements</h3>
              <p className="text-gray-600">
                Participez à nos conférences, Webinaires, ateliers et tables rondes sur les enjeux juridiques actuels.
              </p>
            </div>
          </div>

          {/* Public cible */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-techjus-blue">
            <div className="text-center mb-8">
              <div className="bg-techjus-light p-4 rounded-full inline-block mb-4">
                <Heart className="text-techjus-red" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-techjus-blue mb-4">
                Une communauté pour tous
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                TechJus s'adresse à tous les professionnels passionnés par l'intersection entre le droit et la technologie
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center bg-techjus-light p-3 rounded-lg">
                    <div className="w-2 h-2 bg-techjus-blue rounded-full mr-3"></div>
                    Avocats spécialisés en droit du numérique
                  </li>
                  <li className="flex items-center bg-techjus-light p-3 rounded-lg">
                    <div className="w-2 h-2 bg-techjus-blue rounded-full mr-3"></div>
                    Magistrats et conseillers juridiques
                  </li>
                  <li className="flex items-center bg-techjus-light p-3 rounded-lg">
                    <div className="w-2 h-2 bg-techjus-blue rounded-full mr-3"></div>
                    Professeurs et chercheurs en droit
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center bg-techjus-light p-3 rounded-lg">
                    <div className="w-2 h-2 bg-techjus-green rounded-full mr-3"></div>
                    Responsables de la conformité juridique
                  </li>
                  <li className="flex items-center bg-techjus-light p-3 rounded-lg">
                    <div className="w-2 h-2 bg-techjus-green rounded-full mr-3"></div>
                    Consultants en transformation numérique
                  </li>
                  <li className="flex items-center bg-techjus-light p-3 rounded-lg">
                    <div className="w-2 h-2 bg-techjus-green rounded-full mr-3"></div>
                    Étudiants en droit du numérique
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Appel à l'action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-techjus-blue to-techjus-green rounded-2xl p-8 text-white shadow-2xl">
              <Globe className="mx-auto mb-4 text-white" size={48} />
              <h2 className="text-2xl font-bold mb-4 text-white">
                Rejoignez notre communauté dès aujourd'hui
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Participez aux discussions, partagez vos expertises et contribuez au développement du droit du numérique au Bénin
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleJoinClick}
                  className="bg-white text-techjus-blue px-8 py-3 rounded-lg font-semibold hover:bg-techjus-yellow hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Rejoindre WhatsApp
                </button>
                <Link
                  to="/contact"
                  className="bg-techjus-yellow text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-techjus-yellow transition-all duration-300 shadow-md hover:shadow-lg"
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
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-2xl w-full text-center relative">
            <AlertCircle className="w-12 h-12 text-techjus-blue mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold mb-4 text-techjus-blue">Avant de continuer</h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              <strong>TechJus ne collecte aucune de vos données.</strong><br />
              En cliquant sur ce lien vous consentez à rejoindre la communauté TechJus sur WhatsApp et à respecter le code de bonne conduite de ladite communauté. <br />
              <span className="text-techjus-blue font-semibold">Bienvenue dans l'univers TechJus.</span>
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Annuler
              </button>
              <button
                onClick={confirmJoin}
                className="bg-techjus-blue text-white px-5 py-2 rounded-lg hover:bg-techjus-dark transition font-medium"
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