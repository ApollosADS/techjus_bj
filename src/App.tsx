import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Import direct des composants (sans lazy loading)
import Landing from './pages/Landing';
import Contact from './pages/Contact';
import LaCommunaute from './pages/LaCommunaute';

// Groupe Contenus
import Thematiques from './pages/Thematiques';
import ActualitesPage from './pages/ActualitesPage';

// Groupe Opportunités
import AnnoncesPage from './pages/AnnoncesPage';
import Recrutements from './pages/RecrutementsPage';

// Groupe Ressources & Aide
import Formations from './pages/Formations';
import Resources from './pages/Resources';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header optimisé */}
        <Header />
        
        {/* Contenu principal */}
        <main className="flex-grow pt-16 md:pt-20">
          <Routes>
            {/* Pages principales (sans dropdown) */}
            <Route path="/" element={<Landing />} />
            <Route path="/communaute" element={<LaCommunaute />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Groupe Contenus */}
            <Route path="/thematiques" element={<Thematiques />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:slug" element={<ActualitesPage />} />
            
            {/* Groupe Opportunités */}
            <Route path="/annonces" element={<AnnoncesPage />} />
            <Route path="/recrutements" element={<Recrutements />} />
            
            {/* Groupe Ressources & Aide */}
            <Route path="/formations" element={<Formations />} />
            <Route path="/resources" element={<Resources />} />
            
            {/* Gestion des routes non trouvées */}
            <Route path="*" element={
              <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Page non trouvée</h1>
                <p className="text-xl text-gray-600 mb-8">
                  La page que vous recherchez semble introuvable.
                </p>
                <a 
                  href="/" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Retour à l'accueil
                </a>
              </div>
            } />
          </Routes>
        </main>
        
        {/* Footer optimisé */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;