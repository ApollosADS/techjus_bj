import React from 'react';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Contenu principal */}
      <main className="flex-grow">
        {/* Section de contact */}
        <section className="pt-28 pb-16 bg-techjus-light"> {/* Ajustement de l'espace pour le header fixe */}
          <div className="container-custom">
            {/* Section équipe (à compléter) */}
            {/* Description mission + carte (à compléter) */}
            
            {/* Intégration du formulaire */}
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;