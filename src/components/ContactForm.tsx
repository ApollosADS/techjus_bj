import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const handleEmailClick = () => {
    const subject = encodeURIComponent('Contact depuis TechJus.bj');
    const body = encodeURIComponent('Bonjour,\n\nJe vous contacte depuis le site TechJus.bj.\n\n');
    window.location.href = `mailto:contact@techjus.bj?subject=${subject}&body=${body}`;
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />, title: 'Email', value: 'contact@techjus.bj',
      action: () => handleEmailClick(), color: 'text-techjus-blue'
    },
    {
      icon: <Phone className="w-6 h-6" />, title: 'Téléphone', value: '+229 66 72 95 88',
      action: () => window.location.href = 'tel:+229 66 72 95 88', color: 'text-techjus-green'
    },
    {
      icon: <MapPin className="w-6 h-6" />, title: 'Localisation', value: 'Cotonou, Bénin',
      action: null, color: 'text-gray-600'
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      {/* Container principal avec marges uniformes */}
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-techjus-blue mb-6">
              Contactez-nous
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Avez-vous une préoccupation ? 
              Notre équipe est disponible pour vous accompagner.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="bg-techjus-light rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-heading font-bold text-techjus-blue mb-8">
                  Nos coordonnées
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div 
                      key={index}
                      className={`flex items-center p-4 rounded-xl bg-white border border-gray-200 transition duration-300 ${
                        info.action ? 'hover:shadow-md cursor-pointer hover:border-gray-300' : ''
                      }`}
                      onClick={info.action || undefined}
                    >
                      <div className={`mr-4 p-3 rounded-lg bg-techjus-light ${info.color}`}>
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">{info.title}</div>
                        <div className="text-gray-800 font-medium text-lg">{info.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-techjus-light rounded-2xl p-12 border border-gray-200 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-techjus-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-techjus-blue mb-4">
                  Contactez-nous maintenant
                </h3>
                <p className="text-gray-700 text-lg mb-8">
                  Cliquez sur le bouton ci-dessous pour nous envoyer un email depuis votre boîte mail.
                </p>
              </div>
              <button
                onClick={handleEmailClick}
                className="bg-techjus-blue hover:bg-blue-700 text-white font-bold text-xl px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center mx-auto"
              >
                <Mail className="w-6 h-6 mr-3" />
                Envoyer un email
              </button>
              <p className="text-gray-500 text-sm mt-6">
                Cela ouvrira votre client mail avec notre adresse pré-remplie.
              </p>
              <div className="mt-8 p-4 bg-yellow-100 border border-yellow-300 rounded-xl">
                <p className="text-yellow-700 font-medium">
                  💡 <strong>Conseil :</strong> Précisez votre domaine d'activité et votre besoin juridique.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-4 bg-techjus-green/10 rounded-full px-8 py-4 border border-techjus-green">
              <div className="w-3 h-3 bg-techjus-green rounded-full"></div>
              <span className="text-techjus-green font-medium">Réponse garantie sous 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;