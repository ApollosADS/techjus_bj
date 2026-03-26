import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Button } from '@/components/ui/button';

// Import direct des composants (sans lazy loading)
import Landing from './pages/Landing';
import Contact from './pages/Contact';

// Groupe Contenus
import ActualitesPage from './pages/ActualitesPage';

// Groupe Opportunités
import OpportunitesPage from './pages/OpportunitesPage';

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
        <main className="flex-grow scroll-smooth pt-16 md:pt-20">
          <Routes>
            {/* Pages principales (sans dropdown) */}
            <Route path="/" element={<Landing />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Groupe Contenus */}
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:slug" element={<ActualitesPage />} />
            
            {/* Groupe Opportunités */}
            <Route path="/opportunites" element={<OpportunitesPage />} />
            <Route path="/annonces" element={<Navigate to="/opportunites" replace />} />
            
            {/* Groupe Ressources & Aide */}
            <Route path="/formations" element={<Formations />} />
            <Route path="/resources" element={<Resources />} />
            
            {/* Gestion des routes non trouvées */}
            <Route path="*" element={
              <div className="page-canvas flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-techjus-blue">
                  Erreur 404
                </p>
                <h1 className="mb-4 max-w-lg font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                  Page non trouvée
                </h1>
                <p className="mb-10 max-w-md text-lg text-slate-600">
                  La page demandée n&apos;existe pas ou a été déplacée.
                </p>
                <Button asChild size="lg" className="font-semibold shadow-techjus">
                  <Link to="/">Retour à l&apos;accueil</Link>
                </Button>
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