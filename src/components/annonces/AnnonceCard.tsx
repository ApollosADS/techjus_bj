import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Info,
  Star,
  PartyPopper,
  Banknote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isInscriptionOuverte, libelleInscriptionIndisponible } from '@/utils/annonceInscription';
import { Annonce } from '../../types/annonce';

interface AnnonceCardProps {
  annonce: Annonce;
  onClick?: () => void;
  onMoreInfo?: () => void;
  isFull?: boolean;
}

const AnnonceCard: React.FC<AnnonceCardProps> = ({ annonce, onClick, onMoreInfo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const defaultImage = '/logo-techjus.png';
  const mainImage =
    annonce.imageUrl && annonce.imageUrl.trim() !== '' ? annonce.imageUrl : defaultImage;
  const imagesArray = Array.isArray(annonce.images)
    ? annonce.images.filter((img) => img && img.trim() !== '')
    : [];
  const allImages = [mainImage, ...imagesArray].filter(Boolean);

  useEffect(() => {
    if (!isPlaying || allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, allImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getStatusStyle = (statut: string) => {
    switch (statut) {
      case 'a_venir':
        return 'bg-techjus-blue text-white shadow-sm';
      case 'en_cours':
        return 'bg-techjus-green text-white shadow-sm';
      case 'termine':
        return 'bg-slate-600 text-white shadow-sm';
      case 'annule':
        return 'bg-techjus-red text-white shadow-sm';
      default:
        return 'bg-slate-600 text-white shadow-sm';
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'a_venir':
        return 'À venir';
      case 'en_cours':
        return 'En cours';
      case 'termine':
        return 'Terminé';
      case 'annule':
        return 'Annulé';
      default:
        return statut;
    }
  };

  const isFull =
    Boolean(annonce.capacite && annonce.inscrits && annonce.inscrits >= annonce.capacite);
  const peutSinscrire =
    Boolean(annonce.lienInscription) &&
    isInscriptionOuverte(annonce.statut) &&
    !isFull;

  return (
    <article
      role="group"
      aria-labelledby={`titre-annonce-${annonce.id}`}
      className="group/card relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-techjus-blue/25 hover:shadow-techjus-lg"
      onClick={onClick}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-techjus-blue via-techjus-green to-techjus-blue opacity-90 transition-opacity duration-500 group-hover/card:opacity-100"
        aria-hidden
      />

      <div
        className="relative aspect-[16/10] max-h-[14rem] overflow-hidden sm:aspect-[16/9] sm:max-h-none"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <img
          src={allImages[currentImageIndex]}
          alt={`${annonce.title} - Image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />

        {allImages.length > 1 && (
          <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 gap-1.5 px-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300 ease-out',
                  index === currentImageIndex
                    ? 'w-7 bg-white shadow-md'
                    : 'w-1.5 bg-white/45 hover:w-2 hover:bg-white/75'
                )}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {allImages.length > 1 && showControls && (
          <div className="absolute inset-0 flex items-center justify-between bg-slate-950/25 p-3 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/card:opacity-100">
            <button
              type="button"
              aria-label="Image précédente"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="rounded-full bg-white/20 p-2 text-white shadow-lg backdrop-blur-md transition-transform hover:scale-110 hover:bg-white/30"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>

            <button
              type="button"
              aria-label={isPlaying ? 'Mettre en pause le diaporama' : 'Lancer le diaporama'}
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              className="rounded-full bg-white/20 p-2 text-white shadow-lg backdrop-blur-md transition-transform hover:scale-110 hover:bg-white/30"
            >
              {isPlaying ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
            </button>

            <button
              type="button"
              aria-label="Image suivante"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="rounded-full bg-white/20 p-2 text-white shadow-lg backdrop-blur-md transition-transform hover:scale-110 hover:bg-white/30"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        )}

        <div className="absolute left-3 top-3 z-[1] flex max-w-[calc(100%-5rem)] flex-wrap gap-1.5">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-[6px]',
              getStatusStyle(annonce.statut)
            )}
          >
            {getStatusText(annonce.statut)}
          </span>
          {annonce.urgent && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-techjus-red px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md ring-2 ring-white/40">
              Urgent
            </span>
          )}
          {annonce.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
              <Star className="h-3 w-3 fill-white text-white" strokeWidth={0} aria-hidden />
              À la une
            </span>
          )}
        </div>

        {allImages.length > 1 && (
          <div className="absolute right-3 top-3 z-[1] rounded-full bg-slate-950/65 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white shadow-lg backdrop-blur-sm">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 p-6 sm:p-7">
        <div className="space-y-2.5">
          <h3
            id={`titre-annonce-${annonce.id}`}
            className="font-heading text-balance text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover/card:text-techjus-blue sm:text-xl"
          >
            {annonce.title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
            {annonce.excerpt}
          </p>
        </div>

        {annonce.tags && annonce.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {annonce.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-techjus-blue/15 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-200 group-hover/card:border-techjus-blue/30 group-hover/card:bg-techjus-light/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-2.5">
          <div className="flex items-start gap-3 text-sm text-slate-600">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-techjus-blue/10 text-techjus-blue">
              <Calendar className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1 font-medium leading-snug">
              {annonce.dateLabel ??
                new Date(annonce.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-techjus-green/10 text-techjus-green">
              <Clock className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-medium">{annonce.heureLabel ?? annonce.heure}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-techjus-red/10 text-techjus-red">
              <MapPin className="h-4 w-4" aria-hidden />
            </span>
            <span className="truncate font-medium">{annonce.lieu}</span>
          </div>

          {annonce.capacite && (
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <Users className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-medium">
                {annonce.inscrits || 0} / {annonce.capacite} inscrits
                {isFull && (
                  <span className="ml-1.5 font-semibold text-techjus-red">
                    (Complet)
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {annonce.prix && (
          <div className="flex items-center">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200',
                annonce.prix === 'Gratuit'
                  ? 'border border-techjus-green/25 bg-techjus-green/10 text-techjus-green'
                  : 'border border-techjus-blue/25 bg-techjus-blue/10 text-techjus-blue'
              )}
            >
              {annonce.prix === 'Gratuit' ? (
                <PartyPopper className="h-4 w-4 shrink-0" aria-hidden />
              ) : (
                <Banknote className="h-4 w-4 shrink-0" aria-hidden />
              )}
              {annonce.prix}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
          {annonce.lienInscription && (
            <Button
              type="button"
              disabled={!peutSinscrire}
              className="flex-1 rounded-xl font-semibold shadow-md transition-transform duration-200 enabled:hover:scale-[1.02] enabled:hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                if (!peutSinscrire || !annonce.lienInscription) return;
                window.open(annonce.lienInscription, '_blank');
              }}
            >
              <ExternalLink size={14} />
              {peutSinscrire
                ? 'S\u2019inscrire'
                : isFull
                  ? 'Complet'
                  : libelleInscriptionIndisponible(annonce.statut)}
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-xl border-slate-200 bg-slate-50/80 font-semibold transition-all duration-200 hover:scale-[1.02] hover:border-techjus-blue/25 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onMoreInfo?.();
            }}
          >
            <Info size={14} />
            Plus d&apos;infos
          </Button>
        </div>
      </div>
    </article>
  );
};

export default AnnonceCard;
