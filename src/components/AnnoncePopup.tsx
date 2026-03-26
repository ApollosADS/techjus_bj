import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, ExternalLink, ArrowRight, Sparkles, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { isInscriptionOuverte, libelleInscriptionIndisponible } from '@/utils/annonceInscription';

interface Annonce {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  heure: string;
  dateLabel?: string;
  heureLabel?: string;
  lieu: string;
  type: string;
  organisateur: string;
  tags?: string[];
  lienInscription?: string;
  featured?: boolean;
  imageUrl?: string;
  /** Bannière du popup (prioritaire sur imageUrl) */
  popupBannerUrl?: string;
  statut: 'en_cours' | 'a_venir' | 'termine' | 'annule';
}

interface AnnoncePopupProps {
  annonce: Annonce | null;
  isOpen: boolean;
  onClose: () => void;
}

const AnnoncePopup: React.FC<AnnoncePopupProps> = ({ annonce, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !annonce) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const handleViewAll = () => {
    onClose();
    navigate(`/opportunites?annonce=${encodeURIComponent(annonce.id)}`);
  };

  const handleInscription = () => {
    if (
      annonce.lienInscription &&
      isInscriptionOuverte(annonce.statut)
    ) {
      window.open(annonce.lienInscription, '_blank');
    }
    onClose();
  };

  const inscriptionOuverte =
    Boolean(annonce.lienInscription) && isInscriptionOuverte(annonce.statut);

  const bannerSrc = annonce.popupBannerUrl || annonce.imageUrl;
  const hasBanner = Boolean(bannerSrc);

  const infoTileClass =
    'group flex gap-2 rounded-lg border border-slate-200/90 bg-white p-2.5 shadow-sm transition-all hover:border-techjus-blue/20 hover:shadow-sm sm:gap-2.5 sm:p-3';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-2 backdrop-blur-[2px] sm:p-3 md:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-annonce-title"
    >
      <div
        className={cn(
          'w-full max-w-[min(100%,20rem)] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl ring-1 ring-slate-900/[0.06] transition-all duration-500 sm:max-w-md sm:rounded-2xl md:max-w-lg lg:max-w-xl',
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {hasBanner && (
          <div className="relative h-24 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-28 md:h-32">
            <img
              src={bannerSrc}
              alt={annonce.title}
              className="h-full w-full object-cover object-center"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" aria-hidden />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg border border-white/30 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/50 sm:right-2.5 sm:top-2.5 sm:h-9 sm:w-9"
              aria-label="Fermer"
            >
              <X className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={2} />
            </button>
          </div>
        )}

        <div className="border-b border-slate-200/80 bg-techjus-light/80">
          {!hasBanner && (
            <div className="h-1 w-full bg-techjus-blue" aria-hidden />
          )}
          <div className="relative p-3 sm:p-4 md:p-5">
            {!hasBanner && (
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 sm:h-9 sm:w-9"
                aria-label="Fermer"
              >
                <X className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={2} />
              </button>
            )}

            <div className={cn('flex flex-col gap-2.5 sm:gap-3', !hasBanner && 'pr-10 sm:pr-12')}>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <div className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-techjus-blue/15 bg-white text-techjus-blue shadow-sm sm:h-8 sm:w-8">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} />
                </div>
                <span className="rounded-full border border-techjus-blue/20 bg-techjus-blue/[0.08] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-techjus-blue sm:px-2.5 sm:py-1 sm:text-[10px]">
                  Événement à la une
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <h2
                  id="popup-annonce-title"
                  className="font-heading text-base font-bold leading-snug tracking-tight text-slate-900 sm:text-lg md:text-xl"
                >
                  {annonce.title}
                </h2>
                <p className="text-xs font-normal leading-relaxed text-slate-600 sm:text-sm">
                  {annonce.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-h-[min(58vh,28rem)] overflow-y-auto overscroll-contain bg-gradient-to-b from-slate-50/60 to-white p-3 sm:max-h-[min(62vh,32rem)] sm:p-4 md:p-5">
          <div className="mb-3 grid grid-cols-1 gap-2 sm:mb-4 sm:grid-cols-2 sm:gap-2.5">
            <div className={infoTileClass}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-techjus-light text-techjus-blue ring-1 ring-techjus-blue/10 sm:h-9 sm:w-9">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:text-[10px]">Date</p>
                <p className="text-xs font-semibold leading-snug text-slate-900 sm:text-sm">
                  {annonce.dateLabel ?? formatDate(annonce.date)}
                </p>
              </div>
            </div>

            <div className={infoTileClass}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-techjus-light text-techjus-blue ring-1 ring-techjus-blue/10 sm:h-9 sm:w-9">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:text-[10px]">Heure</p>
                <p className="text-xs font-semibold leading-snug text-slate-900 sm:text-sm">
                  {annonce.heureLabel ?? annonce.heure}
                </p>
              </div>
            </div>

            <div className={infoTileClass}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-techjus-light text-techjus-green ring-1 ring-techjus-green/15 sm:h-9 sm:w-9">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-techjus-green" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:text-[10px]">Lieu</p>
                <p className="text-xs font-semibold leading-snug text-slate-900 sm:text-sm">{annonce.lieu}</p>
              </div>
            </div>

            <div className={infoTileClass}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-techjus-light text-techjus-blue ring-1 ring-techjus-blue/10 sm:h-9 sm:w-9">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:text-[10px]">Organisateur</p>
                <p className="text-xs font-semibold leading-snug text-slate-900 sm:text-sm">{annonce.organisateur}</p>
              </div>
            </div>
          </div>

          <div className="mb-3 sm:mb-4">
            <h3 className="font-heading mb-1.5 text-sm font-bold text-slate-900 sm:mb-2 sm:text-base">Description</h3>
            <div className="rounded-lg border border-slate-200/90 bg-white p-2.5 shadow-sm sm:p-3">
              <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
                {annonce.description.length > 260
                  ? `${annonce.description.substring(0, 260).trim()}…`
                  : annonce.description}
              </p>
            </div>
          </div>

          {annonce.tags && annonce.tags.length > 0 && (
            <div className="mb-3 sm:mb-4">
              <h3 className="font-heading mb-1.5 text-sm font-bold text-slate-900 sm:mb-2 sm:text-base">Tags</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {annonce.tags.slice(0, 6).map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700 sm:px-2.5 sm:py-1 sm:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2.5">
            {annonce.lienInscription && (
              <button
                type="button"
                disabled={!inscriptionOuverte}
                onClick={handleInscription}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold shadow-md transition-all sm:gap-2 sm:py-2.5 sm:text-sm',
                  inscriptionOuverte
                    ? 'bg-techjus-blue text-white hover:bg-[#004d88] hover:shadow-md'
                    : 'cursor-not-allowed bg-slate-300 text-slate-600'
                )}
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />
                {inscriptionOuverte
                  ? "S'inscrire maintenant"
                  : libelleInscriptionIndisponible(annonce.statut)}
              </button>
            )}

            <button
              type="button"
              onClick={handleViewAll}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 sm:gap-2 sm:py-2.5 sm:text-sm"
            >
              <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />
              Voir les détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnoncePopup;
