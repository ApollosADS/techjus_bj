import React from 'react';
import { Users, BookOpen, Globe, MessageSquare, Target, Heart } from 'lucide-react';

const Presentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-techjus-light to-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-techjus-blue mb-6">
              Bienvenue dans la communauté 
              <div className="inline-block align-middle ml-2">
                <span className="text-techjus-blue font-black">TechJus</span>
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
                Nous avons l'immense plaisir de vous annoncer la création d'un espace de discussion 
                via la communauté nommée <strong className="text-techjus-blue">"TechJusBénin"</strong>, 
                entièrement dédié au droit du numérique au Bénin.
              </p>
              
              <p className="mb-6 text-lg text-justify">
                Cette initiative stratégique vise à rassembler des juristes experts, praticiens et 
                passionnés du secteur pour créer un espace d'échange dynamique et collaboratif.
              </p>
              
              <p className="mb-0 text-lg text-justify">
                Notre ambition est de créer une communauté scientifique pour faciliter le partage de 
                connaissances, analyser ensemble les évolutions législatives actuelles, et stimuler 
                des discussions enrichissantes sur les enjeux juridiques du numérique dans notre 
                contexte béninois et international.
              </p>
            </div>
          </div>

          {/* Objectifs de la communauté */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-b-4 border-techjus-green">
              <div className="bg-techjus-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-techjus-green" size={24} />
              </div>
              <h3 className="text-xl font-bold text-techjus-blue mb-3">Partage de Connaissances</h3>
              <p className="text-gray-600">
                Faciliter l'échange d'expertises et de savoir-faire entre professionnels du droit numérique
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-b-4 border-techjus-yellow">
              <div className="bg-techjus-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-techjus-yellow" size={24} />
              </div>
              <h3 className="text-xl font-bold text-techjus-blue mb-3">Analyse Législative</h3>
              <p className="text-gray-600">
                Analyser ensemble les évolutions du cadre juridique numérique au Bénin et à l'international
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-b-4 border-techjus-red">
              <div className="bg-techjus-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-techjus-red" size={24} />
              </div>
              <h3 className="text-xl font-bold text-techjus-blue mb-3">Réseau Professionnel</h3>
              <p className="text-gray-600">
                Créer un réseau solide de juristes spécialisés dans les technologies numériques
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
                TechJusBénin s'adresse à tous les professionnels passionnés par l'intersection 
                entre le droit et la technologie
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-techjus-blue mb-4 flex items-center">
                  <div className="w-3 h-3 bg-techjus-blue rounded-full mr-3"></div>
                  Juristes Experts
                </h3>
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
                <h3 className="text-xl font-bold text-techjus-blue mb-4 flex items-center">
                  <div className="w-3 h-3 bg-techjus-green rounded-full mr-3"></div>
                  Praticiens & Passionnés
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center bg-techjus-light p-3 rounded-lg">
                    <div className="w-2 h-2 bg-techjus-green rounded-full mr-3"></div>
                    Entrepreneurs du secteur tech
                  </li>
                  <li className="flex items-center bg-techjus-light p-3 rounded-lg">
                    <div className="w-2 h-2 bg-techjus-green rounded-full mr-3"></div>
                    Consultants en transformation digitale
                  </li>
                  <li className="flex items-center bg-techjus-light p-3 rounded-lg">
                    <div className="w-2 h-2 bg-techjus-green rounded-full mr-3"></div>
                    Étudiants en droit du numérique
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-techjus-blue to-techjus-green rounded-2xl p-8 text-white shadow-2xl">
              <Globe className="mx-auto mb-4 text-techjus-yellow" size={48} />
              <h2 className="text-2xl font-bold mb-4 text-white">
                Rejoignez notre communauté dès aujourd'hui
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Participez aux discussions, partagez vos expertises et contribuez au développement 
                du droit numérique au Bénin
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://chat.whatsapp.com/D5pdYuXAnTB9MaXDZO9cOc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-techjus-blue px-8 py-3 rounded-lg font-semibold hover:bg-techjus-yellow hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Rejoindre WhatsApp
                </a>
                <button className="bg-techjus-yellow text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-techjus-yellow transition-all duration-300 shadow-md hover:shadow-lg">
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Presentation;