import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User, Tag, ExternalLink, Phone, Mail, Globe, Users, Award, Star, AlertCircle, CheckCircle, XCircle, Pause, Sparkles } from 'lucide-react';
import { Annonce } from '../../types/annonce';
import { cn } from '@/lib/utils';
import { isInscriptionOuverte, libelleInscriptionIndisponible } from '@/utils/annonceInscription';

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

  const isFull = Boolean(
    annonce.capacite != null &&
      annonce.inscrits != null &&
      annonce.inscrits >= annonce.capacite
  );
  const lienInscriptionActif =
    Boolean(annonce.lienInscription) &&
    isInscriptionOuverte(annonce.statut) &&
    !isFull;

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
          icon: <CheckCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />,
          text: 'À venir'
        };
      case 'en_cours':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />,
          text: 'En cours'
        };
      case 'termine':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: <XCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />,
          text: 'Terminé'
        };
      case 'annule':
        return {
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />,
          text: 'Annulé'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: <Pause className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />,
          text: statut
        };
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'conference':
        return {
          icon: <Users className="h-5 w-5" strokeWidth={1.75} />,
          bgColor: 'bg-techjus-light/90',
          textColor: 'text-techjus-blue',
          accentLine: 'bg-techjus-blue',
        };
      case 'webinaire':
        return {
          icon: <Globe className="h-5 w-5" strokeWidth={1.75} />,
          bgColor: 'bg-techjus-light/90',
          textColor: 'text-techjus-blue',
          accentLine: 'bg-techjus-green',
        };
      case 'formation':
        return {
          icon: <Award className="h-5 w-5" strokeWidth={1.75} />,
          bgColor: 'bg-emerald-50/80',
          textColor: 'text-emerald-800',
          accentLine: 'bg-techjus-green',
        };
      case 'partenariat':
        return {
          icon: <Star className="h-5 w-5" strokeWidth={1.75} />,
          bgColor: 'bg-slate-50',
          textColor: 'text-slate-800',
          accentLine: 'bg-techjus-blue',
        };
      default:
        return {
          icon: <Calendar className="h-5 w-5" strokeWidth={1.75} />,
          bgColor: 'bg-techjus-light/90',
          textColor: 'text-techjus-blue',
          accentLine: 'bg-techjus-blue',
        };
    }
  };

  const typeConfig = getTypeConfig(annonce.type);
  const statusConfig = getStatusConfig(annonce.statut);

  // Nouvelle fonction pour découper la description en paragraphes si elle est longue
  const renderDescription = (description: string) => {
    if (!description) return null;
    // On considère un retour à la ligne (\n) ou deux sauts de ligne comme séparateur de paragraphe
    // Si pas de \n, on coupe en paragraphes tous les 300 caractères environ (en essayant de couper à la fin d'une phrase)
    if (description.includes('\n')) {
      // On split sur deux sauts de ligne ou un seul
      return description
        .split(/\n{2,}|\r\n{2,}/)
        .map((para, idx) =>
          <p key={idx} className="mb-2 whitespace-pre-line text-sm leading-relaxed text-slate-700 sm:text-base">{para.trim()}</p>
        );
    } else if (description.length > 400) {
      // On coupe en paragraphes tous les ~300 caractères à la fin d'une phrase si possible
      const paragraphs: string[] = [];
      let text = description;
      while (text.length > 0) {
        if (text.length <= 350) {
          paragraphs.push(text);
          break;
        }
        // Cherche le point le plus proche après 250 caractères
        let cut = text.indexOf('.', 250);
        if (cut === -1 || cut > 400) cut = 350;
        else cut += 1; // inclure le point
        paragraphs.push(text.slice(0, cut).trim());
        text = text.slice(cut).trim();
      }
      return paragraphs.map((para, idx) =>
        <p key={idx} className="mb-2 text-sm leading-relaxed text-slate-700 sm:text-base">{para}</p>
      );
    } else {
      // Description courte, un seul paragraphe
      return <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{description}</p>;
    }
  };

  const infoCardClass =
    'group relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm transition-all duration-200 hover:border-techjus-blue/20 hover:shadow-md sm:p-4';
  const infoIconWrap =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-techjus-light text-techjus-blue ring-1 ring-techjus-blue/10 transition-transform duration-200 group-hover:scale-[1.02] sm:h-10 sm:w-10';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-2 backdrop-blur-[2px] transition-all duration-300 sm:p-3 md:p-4"
      onClick={onClose}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-modal="true"
    >
      <div
        className={cn(
          'flex max-h-[min(92vh,44rem)] w-full max-w-[min(100%,36rem)] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl ring-1 ring-slate-900/[0.06] transition-all duration-500 ease-out sm:max-w-xl md:max-w-2xl lg:max-w-3xl',
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0 border-b border-slate-200/90 bg-techjus-light text-slate-900">
          <div className={cn('h-0.5 w-full sm:h-1', typeConfig.accentLine)} aria-hidden />

          <div className="relative p-3 sm:p-4 md:p-5">
            <button
              type="button"
              onClick={onClose}
              className="group absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 sm:right-3 sm:top-3 md:h-10 md:w-10"
              aria-label="Fermer les détails"
            >
              <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={2} />
            </button>

            <div className="flex flex-col gap-3 pr-10 sm:flex-row sm:items-start sm:gap-4 sm:pr-12 md:pr-14">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-techjus-blue shadow-sm ring-1 ring-slate-900/[0.04] sm:h-12 sm:w-12">
                {typeConfig.icon}
              </div>
              <div className="min-w-0 flex-1 space-y-2 sm:space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide sm:px-2.5 sm:py-1 sm:text-xs',
                      statusConfig.color
                    )}
                  >
                    {statusConfig.icon}
                    {statusConfig.text}
                  </span>
                  {annonce.urgent && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-800 sm:px-2.5 sm:py-1 sm:text-xs">
                      <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                      Urgent
                    </span>
                  )}
                  {annonce.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900 sm:px-2.5 sm:py-1 sm:text-xs">
                      <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                      Mis en avant
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <h2
                    id="modal-title"
                    className="font-heading text-lg font-bold leading-snug tracking-tight text-slate-900 sm:text-xl md:text-2xl"
                  >
                    {annonce.title}
                  </h2>
                  <p
                    id="modal-description"
                    className="max-w-2xl text-xs font-normal leading-relaxed text-slate-600 sm:text-sm md:text-base"
                  >
                    {annonce.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-b border-slate-200/80 bg-slate-50/95 backdrop-blur-sm">
          <div className="flex overflow-x-auto">
            {[
              { id: 'details', label: 'Détails', icon: Calendar },
              { id: 'contact', label: 'Contact', icon: User },
              { id: 'programme', label: 'Programme', icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'details' | 'contact' | 'programme')}
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-xs font-semibold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-3 sm:text-sm',
                  activeTab === tab.id
                    ? 'border-techjus-blue bg-white text-techjus-blue shadow-[inset_0_1px_0_0_rgba(255,255,255,1)]'
                    : 'border-transparent text-slate-500 hover:bg-white/70 hover:text-slate-800'
                )}
              >
                <tab.icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-slate-50/50 p-3 sm:p-4 md:p-5">
          {activeTab === 'details' && (
            <div className="space-y-4 sm:space-y-5">
              <div className="overflow-hidden rounded-2xl border border-slate-200/50 bg-slate-100/50 p-px shadow-sm ring-1 ring-slate-900/[0.03]">
                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[0.875rem] sm:grid-cols-2">
                  {(
                    [
                      {
                        Icon: Calendar,
                        label: 'Date',
                        value: annonce.dateLabel ?? formatDate(annonce.date),
                        valueClass: 'text-slate-900',
                      },
                      {
                        Icon: Clock,
                        label: 'Heure',
                        value: annonce.heureLabel ?? formatTime(annonce.heure),
                        valueClass: 'text-slate-900',
                      },
                      {
                        Icon: MapPin,
                        label: 'Lieu',
                        value: annonce.lieu,
                        valueClass: 'text-slate-800',
                      },
                      {
                        Icon: User,
                        label: 'Organisateur',
                        value: annonce.organisateur,
                        valueClass: 'text-slate-800',
                      },
                      {
                        Icon: Tag,
                        label: 'Prix',
                        value: annonce.prix ?? '—',
                        valueClass: 'text-slate-900',
                      },
                      {
                        label: 'Type',
                        value: annonce.type.replace('_', ' '),
                        valueClass: cn('capitalize', typeConfig.textColor),
                        typeIcon: typeConfig.icon,
                      },
                    ] as Array<{
                      Icon?: React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
                      label: string;
                      value: string;
                      valueClass: string;
                      typeIcon?: React.ReactNode;
                    }>
                  ).map((item, idx) => (
                    <div
                      key={`${item.label}-${idx}`}
                      className="flex min-h-[4.25rem] items-start gap-3 bg-white px-4 py-3 sm:min-h-0 sm:gap-3.5 sm:px-5 sm:py-3.5"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-50/90 text-slate-400 sm:h-8 sm:w-8">
                        {item.typeIcon != null ? (
                          <span className="text-techjus-blue [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:shrink-0">
                            {item.typeIcon}
                          </span>
                        ) : item.Icon ? (
                          <item.Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                        ) : null}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                          {item.label}
                        </p>
                        <p
                          className={cn(
                            'mt-0.5 text-sm font-medium leading-snug tracking-tight sm:text-[0.9375rem]',
                            item.valueClass
                          )}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm sm:p-4 md:p-5">
                <h3 className="font-heading mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 sm:mb-4 sm:text-base">
                  <span className={cn('h-6 w-1 shrink-0 rounded-full sm:h-7 sm:w-1.5', typeConfig.accentLine)} />
                  Description
                </h3>
                <div className="prose prose-sm prose-slate max-w-none prose-p:text-slate-700 sm:prose-base">
                  {renderDescription(annonce.description)}
                </div>
              </div>

              {annonce.tags && annonce.tags.length > 0 && (
                <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm sm:p-4 md:p-5">
                  <h3 className="font-heading mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 sm:mb-4 sm:text-base">
                    <span className="h-6 w-1 shrink-0 rounded-full bg-techjus-green sm:h-7 sm:w-1.5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {annonce.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700 transition-all hover:border-techjus-blue/30 hover:bg-techjus-light/80 hover:text-techjus-blue sm:px-2.5 sm:py-1 sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {annonce.lienInscription &&
                (lienInscriptionActif ? (
                  <div className="rounded-xl border border-techjus-blue/25 bg-techjus-blue p-3 text-white shadow-techjus sm:p-4 md:p-5">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-5">
                      <div className="text-center sm:text-left">
                        <h3 className="font-heading text-base font-bold text-white sm:text-lg">Prêt à participer ?</h3>
                        <p className="mt-1 text-xs text-white/95 sm:mt-2 sm:text-sm">
                          Inscrivez-vous dès maintenant pour réserver votre place.
                        </p>
                      </div>
                      <a
                        href={annonce.lienInscription}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-techjus-blue shadow-md transition-all hover:bg-techjus-light hover:shadow-md sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                      >
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                        S&apos;inscrire maintenant
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-100 p-3 text-slate-800 sm:p-4 md:p-5">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-5">
                      <div className="text-center sm:text-left">
                        <h3 className="font-heading text-base font-bold text-slate-900 sm:text-lg">Inscriptions</h3>
                        <p className="mt-1 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                          {isFull
                            ? 'Les places pour cet événement sont toutes réservées.'
                            : 'Les inscriptions ne sont plus ouvertes pour cet événement.'}
                        </p>
                      </div>
                      <span
                        className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-200/80 px-4 py-2 text-xs font-semibold text-slate-500 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                        aria-disabled="true"
                      >
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                        {isFull ? 'Complet' : libelleInscriptionIndisponible(annonce.statut)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4 sm:space-y-5">
              <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm sm:p-4 md:p-5">
                <h3 className="font-heading mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 sm:mb-5 sm:text-base">
                  <span className="h-6 w-1 shrink-0 rounded-full bg-techjus-green sm:h-7 sm:w-1.5" />
                  Informations de contact
                </h3>

                <div className="space-y-3">
                  <div className={infoCardClass}>
                    <div className="flex items-start gap-3">
                      <div className={infoIconWrap}>
                        <User className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">Organisateur</p>
                        <p className="mt-0.5 text-sm font-semibold text-slate-900 sm:text-base">{annonce.organisateur}</p>
                      </div>
                    </div>
                  </div>

                  {annonce.contact && (
                    <>
                      {annonce.contact.telephone && (
                        <div className={infoCardClass}>
                          <div className="flex items-start gap-3">
                            <div className={infoIconWrap}>
                              <Phone className="h-4 w-4" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">Téléphone</p>
                              <a
                                href={`tel:${annonce.contact.telephone}`}
                                className="mt-0.5 inline-block text-sm font-semibold text-techjus-blue hover:underline sm:text-base"
                              >
                                {annonce.contact.telephone}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {annonce.contact.email && (
                        <div className={infoCardClass}>
                          <div className="flex items-start gap-3">
                            <div className={infoIconWrap}>
                              <Mail className="h-4 w-4" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">Email</p>
                              <a
                                href={`mailto:${annonce.contact.email}`}
                                className="mt-0.5 inline-block break-all text-sm font-semibold text-techjus-blue hover:underline sm:text-base"
                              >
                                {annonce.contact.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {annonce.contact.website && (
                        <div className={infoCardClass}>
                          <div className="flex items-start gap-3">
                            <div className={infoIconWrap}>
                              <Globe className="h-4 w-4" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">Site web</p>
                              <a
                                href={annonce.contact.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-0.5 inline-flex items-center gap-1.5 break-all text-sm font-semibold text-techjus-blue hover:underline sm:text-base"
                              >
                                {annonce.contact.website}
                                <ExternalLink className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-techjus-blue/20 bg-techjus-blue p-3 text-white shadow-techjus sm:p-4 md:p-5">
                <div>
                  <h3 className="font-heading text-base font-bold text-white sm:text-lg">Besoin d&apos;aide ?</h3>
                  <p className="mt-1 max-w-xl text-xs text-white/95 sm:mt-2 sm:text-sm">
                    Si vous avez des questions concernant cet événement, notre équipe est là pour vous aider.
                  </p>
                  <a
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-techjus-blue shadow-md transition-all hover:bg-techjus-light sm:mt-4 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                  >
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'programme' && (
            <div className="space-y-4 sm:space-y-5">
              <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm sm:p-4 md:p-5">
                <h3 className="font-heading mb-5 flex items-center gap-2 text-sm font-bold text-slate-900 sm:mb-6 sm:text-base">
                  <span className="h-6 w-1 shrink-0 rounded-full bg-techjus-blue sm:h-7 sm:w-1.5" />
                  Programme de l&apos;événement
                </h3>

                {annonce.programme ? (
                  <div className="relative space-y-0 pl-1.5 before:absolute before:left-[9px] before:top-2.5 before:h-[calc(100%-10px)] before:w-px before:bg-slate-200 sm:pl-2 sm:before:left-[10px]">
                    {annonce.programme.map((item, index) => (
                      <div key={index} className="relative pb-4 last:pb-0 sm:pb-5">
                        <div className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-techjus-light shadow-sm ring-2 ring-techjus-blue/20 sm:top-2 sm:h-6 sm:w-6">
                          <span className="h-1.5 w-1.5 rounded-full bg-techjus-blue sm:h-2 sm:w-2" />
                        </div>
                        <div
                          className={cn(
                            infoCardClass,
                            'ml-6 sm:ml-8',
                            'border-slate-200/90 hover:border-techjus-blue/25'
                          )}
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                            <div className="inline-flex shrink-0 items-center rounded-lg bg-techjus-blue px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm sm:rounded-xl sm:px-2.5 sm:py-1.5 sm:text-xs">
                              {item.heure}
                            </div>
                            <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5">
                              <h4 className="font-heading text-sm font-bold text-slate-900 sm:text-base">{item.titre}</h4>
                              {item.description && (
                                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{item.description}</p>
                              )}
                              {item.intervenant && (
                                <p className="flex items-center gap-1.5 text-xs font-semibold text-techjus-blue sm:gap-2 sm:text-sm">
                                  <User className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />
                                  {item.intervenant}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-10 text-center sm:px-6 sm:py-12">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80 sm:mb-4 sm:h-14 sm:w-14">
                      <Clock className="h-6 w-6 text-slate-400 sm:h-7 sm:w-7" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-heading text-base font-bold text-slate-800 sm:text-lg">Programme en préparation</h4>
                    <p className="mt-1.5 text-sm text-slate-600 sm:text-base">Le programme détaillé sera disponible prochainement.</p>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-amber-200/80 bg-amber-50 p-3 shadow-sm sm:p-4 md:p-5">
                <h3 className="font-heading mb-3 flex items-center gap-2 text-sm font-bold text-amber-950 sm:text-base">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 sm:h-5 sm:w-5" strokeWidth={2} />
                  Informations pratiques
                </h3>
                <ul className="space-y-2 text-xs leading-relaxed text-amber-950/90 sm:space-y-2.5 sm:text-sm">
                  <li className="flex gap-2 sm:gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-techjus-green sm:h-5 sm:w-5" strokeWidth={2} />
                    Arrivez 15 minutes avant le début de l&apos;événement.
                  </li>
                  <li className="flex gap-2 sm:gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-techjus-green sm:h-5 sm:w-5" strokeWidth={2} />
                    Prévoyez de quoi prendre des notes.
                  </li>
                  <li className="flex gap-2 sm:gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-techjus-green sm:h-5 sm:w-5" strokeWidth={2} />
                    Les questions sont encouragées pendant l&apos;événement.
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