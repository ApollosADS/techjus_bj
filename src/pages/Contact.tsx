import React from 'react';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';

const Contact: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-24"> {/* Ajustement de l'espace pour le header fixe */}
        <ContactForm />
        <div className="max-w-6xl mx-auto px-4 mt-16">
          <ContactForm />
        </div>
      </main>
    </>
  );
};

export default Contact;
