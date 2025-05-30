// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; // Import OBLIGATOIRE de la configuration i18n
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Contact from './pages/Contact';
import Formations from './pages/Formations';
import Resources from './pages/Resources';
import Thematiques from './pages/Thematiques';
import Presentation from './components/Presentation';

// Composant de chargement avec traduction
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    // Suspense pour gérer le chargement des traductions
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/presentation" element={<Presentation />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/thematiques" element={<Thematiques />} />
              <Route path="/formations" element={<Formations />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
};

export default App;