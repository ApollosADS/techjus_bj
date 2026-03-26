import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact: React.FC = () => {
  return (
    <div className="page-canvas">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;