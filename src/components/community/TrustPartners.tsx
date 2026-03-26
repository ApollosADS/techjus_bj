import React from 'react';
import { cn } from '@/lib/utils';

const PARTENAIRES: { src: string; alt: string; href?: string }[] = [
  { src: '/partenaire/CNIN.webp', alt: 'CNIN', href: 'https://cnin.bj/' },
  { src: '/partenaire/CRIET.png', alt: 'CRIET', href: 'https://criet.justice.bj/' },
  {
    src: '/partenaire/institut_nationale_de_la_femme.jpg',
    alt: 'Institut national de la femme (INF)',
    href: 'https://inf.bj/',
  },
  { src: '/partenaire/Offe.jpg', alt: 'OFFE', href: 'https://sidoffe-ng.social.gouv.bj/' },
  { src: '/partenaire/OpenGovLab.png', alt: 'OpenGovLab' },
  { src: '/partenaire/THEMIS.svg', alt: 'THEMIS' },
];

const TrustPartners: React.FC = () => {
  return (
    <section
      className="border-t border-slate-200/80 bg-gradient-to-b from-white via-techjus-light/40 to-white py-11 md:py-16"
      aria-labelledby="trust-partners-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-techjus-blue">
            Partenaires
          </p>
          <h2
            id="trust-partners-heading"
            className="font-heading text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Ils nous font confiance
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-techjus-blue to-techjus-green"
            aria-hidden
          />
        </div>

        <ul className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 sm:gap-7 lg:grid-cols-6 lg:gap-8">
          {PARTENAIRES.map(({ src, alt, href }) => (
            <li
              key={src}
              className={cn(
                'flex h-28 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 px-4 py-4 shadow-sm ring-1 ring-slate-900/[0.03] transition-all duration-300 sm:h-32 sm:px-5',
                'hover:border-techjus-blue/25 hover:shadow-techjus motion-safe:hover:-translate-y-0.5'
              )}
            >
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-techjus-blue focus-visible:ring-offset-2"
                  aria-label={`${alt} — ouvrir le site partenaire (nouvel onglet)`}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-[4.25rem] w-full max-w-[11rem] object-contain grayscale-[0.15] transition-[filter] duration-300 hover:grayscale-0 sm:max-h-20 sm:max-w-[13.5rem]"
                  />
                </a>
              ) : (
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[4.25rem] w-full max-w-[11rem] object-contain grayscale-[0.15] transition-[filter] duration-300 hover:grayscale-0 sm:max-h-20 sm:max-w-[13.5rem]"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustPartners;
