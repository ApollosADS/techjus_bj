import React from 'react';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
const Contact: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-24"> {/* Ajustement de l'espace pour le header fixe */}
        <ContactForm />
        <div className="pt-24">
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Contact;
