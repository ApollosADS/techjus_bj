import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Contact from './pages/Contact';
import Formations from './pages/Formations';
import Resources from './pages/Resources';
import Thematiques from './pages/Thematiques';
import Presentation from './components/Presentation';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="pt-20"> {/* Espace pour le header fixe */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/thematiques" element={<Thematiques />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/contact" element={<Contact />} /> {/* Correction de la casse */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;