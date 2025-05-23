import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const handleEmailClick = () => {
    const subject = encodeURIComponent('Contact depuis TechJus.bj');
    const body = encodeURIComponent('Bonjour,\n\nJe vous contacte depuis le site TechJus.bj.\n\n');
    window.location.href = `mailto:benintechjus@gmail.com?subject=${subject}&body=${body}`;
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />, title: 'Email', value: 'benintechjus@gmail.com',
      action: () => handleEmailClick(), color: 'text-techjus-blue'
    },
    {
      icon: <Phone className="w-6 h-6" />, title: 'Téléphone', value: '+229 XX XX XX XX XX',
      action: () => window.location.href = 'tel:+229XXXXXXXXXX', color: 'text-techjus-green'
    },
    {
      icon: <MapPin className="w-6 h-6" />, title: 'Localisation', value: 'Cotonou, Bénin',
      action: null, color: 'text-gray-600'
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-techjus-blue mb-6">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Une question sur le droit du numérique ? Besoin d'accompagnement juridique ? 
            Notre équipe est là pour vous aider.
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

            <div className="bg-techjus-light rounded-2xl p-8 border border-gray-200">
              <h4 className="text-xl font-heading font-bold text-techjus-blue mb-4">
                Horaires d'ouverture
              </h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="text-gray-900 font-medium">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-gray-900 font-medium">9h00 - 15h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-techjus-red font-medium">Fermé</span>
                </div>
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
    </section>
  );
};

export default ContactSection;