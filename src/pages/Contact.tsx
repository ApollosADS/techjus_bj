import React from 'react';
// Components
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';

const Contact: React.FC = () => {
  return (
    <>
      <Header />
      
      <main>
        <ContactForm />
      </main>
    </>
  );
};

export default Contact;