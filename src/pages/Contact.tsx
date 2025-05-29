import React from 'react';

// Components
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  return (
    <>
      <Header />
      
      <main className="pt-24"> {/* Ajustement pour le header fixe */}
        <ContactForm />
        
        {/* Conteneur pour le footer avec espacement supplémentaire */}
        <div className="pt-24">
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Contact;