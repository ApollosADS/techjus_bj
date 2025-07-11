import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy loading de toutes les pages
const Landing = lazy(() => import('./pages/Landing'));
const Contact = lazy(() => import('./pages/Contact'));
const LaCommunaute = lazy(() => import('./pages/LaCommunaute'));
const Thematiques = lazy(() => import('./pages/Thematiques'));
const ActualitesPage = lazy(() => import('./pages/ActualitesPage'));
const AnnoncesPage = lazy(() => import('./pages/AnnoncesPage'));
const RecrutementsPage = lazy(() => import('./pages/RecrutementsPage'));
const Formations = lazy(() => import('./pages/Formations'));
const Resources = lazy(() => import('./pages/Resources'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/communaute" element={<LaCommunaute />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/thematiques" element={<Thematiques />} />
              <Route path="/actualites" element={<ActualitesPage />} />
              <Route path="/actualites/:slug" element={<ActualitesPage />} />
              <Route path="/annonces" element={<AnnoncesPage />} />
              <Route path="/recrutements" element={<RecrutementsPage />} />
              <Route path="/formations" element={<Formations />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="*" element={
                <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-6">Page non trouvée</h1>
                  <p className="text-xl text-gray-600 mb-8">
                    La page que vous recherchez semble introuvable.
                  </p>
                  <a 
                    href="/" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Retour à l'accueil
                  </a>
                </div>
              } />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;