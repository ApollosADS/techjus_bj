import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User, Tag, ExternalLink, Phone, Mail, Globe, Users, Award, Star, AlertCircle, CheckCircle, XCircle, Pause, Sparkles } from 'lucide-react';
import { Annonce } from '../../types/annonce';

interface AnnonceMoreInfoProps {
  annonce: Annonce;
  isOpen: boolean;
  onClose: () => void;
}

const AnnonceMoreInfo: React.FC<AnnonceMoreInfoProps> = ({ annonce, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'contact' | 'programme'>('details');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
      setIsVisible(false);
    }
  }, [isOpen]);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getStatusConfig = (statut: string) => {
    switch (statut) {
      case 'a_venir':
        return {
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'À venir'
        };
      case 'en_cours':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <Clock className="w-4 h-4" />,
          text: 'En cours'
        };
      case 'termine':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: <XCircle className="w-4 h-4" />,
          text: 'Terminé'
        };
      case 'annule':
        return {
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: <AlertCircle className="w-4 h-4" />,
          text: 'Annulé'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: <Pause className="w-4 h-4" />,
          text: statut
        };
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'conference':
        return {
          icon: <Users className="w-6 h-6" />,
          color: 'from-blue-600 to-indigo-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        };
      case 'webinaire':
        return {
          icon: <Globe className="w-6 h-6" />,
          color: 'from-purple-600 to-pink-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700'
        };
      case 'formation':
        return {
          icon: <Award className="w-6 h-6" />,
          color: 'from-green-600 to-teal-600',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'partenariat':
        return {
          icon: <Star className="w-6 h-6" />,
          color: 'from-orange-600 to-red-600',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700'
        };
      default:
        return {
          icon: <Calendar className="w-6 h-6" />,
          color: 'from-blue-600 to-indigo-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        };
    }
  };

  const typeConfig = getTypeConfig(annonce.type);
  const statusConfig = getStatusConfig(annonce.statut);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300"
      onClick={onClose}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-modal="true"
    >
      <div 
        className={`bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-500 ease-out ${
          isVisible 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header modernisé */}
        <div className={`relative bg-gradient-to-r ${typeConfig.color} text-white overflow-hidden`}>
          {/* Éléments décoratifs */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full"></div>
          
          <div className="relative p-6 sm:p-8">
            {/* Bouton de fermeture amélioré */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-white/20 rounded-full transition-all duration-200 group backdrop-blur-sm"
              aria-label="Fermer les détails"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>
            
            {/* En-tête avec icône et badges */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                {typeConfig.icon}
              </div>
              <div className="flex-1">
                {/* Badges de statut */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border flex items-center gap-1.5 ${statusConfig.color}`}>
                    {statusConfig.icon}
                    {statusConfig.text}
                  </span>
                  {annonce.urgent && (
                    <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-red-100 text-red-800 border border-red-300 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      Urgent
                    </span>
                  )}
                  {annonce.featured && (
                    <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Mis en avant
                    </span>
                  )}
                </div>
                
                {/* Titre et sous-titre hiérarchisés */}
                <div className="space-y-2">
                  <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold leading-tight">
                    {annonce.title}
                  </h2>
                  <p id="modal-description" className="text-lg text-white/90 leading-relaxed">
                    {annonce.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation par onglets modernisée */}
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="flex overflow-x-auto">
            {[
              { id: 'details', label: 'Détails', icon: Calendar },
              { id: 'contact', label: 'Contact', icon: User },
              { id: 'programme', label: 'Programme', icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'details' | 'contact' | 'programme')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-white'
                    : 'text-gray-500 hover:text-gray-700 border-transparent hover:bg-white/50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(95vh-280px)]">
          {activeTab === 'details' && (
            <div className="space-y-8">
              {/* Informations principales dans des cartes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Date</p>
                        <p className="font-semibold text-gray-900">{formatDate(annonce.date)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-xl">
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Heure</p>
                        <p className="font-semibold text-gray-900">{formatTime(annonce.heure)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-2xl border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-xl">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Lieu</p>
                        <p className="font-semibold text-gray-900">{annonce.lieu}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-2xl border border-orange-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-xl">
                        <User className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Organisateur</p>
                        <p className="font-semibold text-gray-900">{annonce.organisateur}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-2xl border border-yellow-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-xl">
                        <Tag className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Prix</p>
                        <p className="font-semibold text-gray-900">{annonce.prix}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`bg-gradient-to-br ${typeConfig.bgColor} p-5 rounded-2xl border border-gray-100`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl">
                        {typeConfig.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Type</p>
                        <p className={`font-semibold capitalize ${typeConfig.textColor}`}>{annonce.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description avec meilleure mise en page */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  Description
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">{annonce.description}</p>
                </div>
              </div>

              {/* Tags améliorés */}
              {annonce.tags && annonce.tags.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {annonce.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium hover:shadow-md transition-all duration-200 border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA d'inscription modernisé */}
              {annonce.lienInscription && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2">Prêt à participer ?</h3>
                      <p className="text-blue-100">Inscrivez-vous dès maintenant pour réserver votre place</p>
                    </div>
                    <a
                      href={annonce.lienInscription}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
                    >
                      <ExternalLink size={18} />
                      S'inscrire maintenant
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-600 rounded-full"></div>
                  Informations de contact
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Organisateur</p>
                        <p className="font-semibold text-gray-900">{annonce.organisateur}</p>
                      </div>
                    </div>
                  </div>
                  
                  {annonce.contact && (
                    <>
                      {annonce.contact.telephone && (
                        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-xl">
                              <Phone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Téléphone</p>
                              <a href={`tel:${annonce.contact.telephone}`} className="font-semibold text-green-600 hover:underline">
                                {annonce.contact.telephone}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {annonce.contact.email && (
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-xl">
                              <Mail className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                              <a href={`mailto:${annonce.contact.email}`} className="font-semibold text-purple-600 hover:underline">
                                {annonce.contact.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {annonce.contact.website && (
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-xl">
                              <Globe className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Site web</p>
                              <a 
                                href={annonce.contact.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-semibold text-orange-600 hover:underline flex items-center gap-2"
                              >
                                {annonce.contact.website}
                                <ExternalLink size={16} />
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3">Besoin d'aide ?</h3>
                <p className="text-blue-100 mb-4 leading-relaxed">
                  Si vous avez des questions concernant cet événement, notre équipe est là pour vous aider.
                </p>
                <a
                  href="/contact"
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Mail size={18} />
                  Nous contacter
                </a>
              </div>
            </div>
          )}

          {activeTab === 'programme' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                  Programme de l'événement
                </h3>
                
                {annonce.programme ? (
                  <div className="space-y-4">
                    {annonce.programme.map((item, index) => (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 px-3 py-2 rounded-lg text-sm font-bold min-w-fit">
                            {item.heure}
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="font-semibold text-gray-900 text-lg">{item.titre}</h4>
                            {item.description && (
                              <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            )}
                            {item.intervenant && (
                              <p className="text-indigo-600 font-medium flex items-center gap-1">
                                <User size={16} />
                                {item.intervenant}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Programme en préparation</h4>
                    <p className="text-gray-500">Le programme détaillé sera disponible prochainement</p>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6">
                <h3 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Informations pratiques
                </h3>
                <ul className="text-yellow-800 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-yellow-600" />
                    Arrivez 15 minutes avant le début de l'événement
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-yellow-600" />
                    Apportez de quoi prendre des notes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-yellow-600" />
                    Les questions sont encouragées pendant l'événement
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnonceMoreInfo;