import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle, ExternalLink, MousePointerClick } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHoveringName, setIsHoveringName] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinClick = () => {
    setShowModal(true);
  };

  const confirmJoin = () => {
    window.open("https://chat.whatsapp.com/LWSxo3cWM0X7BJacOfXBw7", "_blank");
    setShowModal(false);
  };

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-techjus-light via-white to-slate-50">
        <div
          className="bg-opportunites-mesh pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-techjus-blue/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-techjus-green/10 blur-3xl" aria-hidden />

        <div className="relative z-[1] w-full px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="animate-fade-in space-y-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-techjus-blue/15 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-techjus-blue shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-techjus-green" aria-hidden />
                TechJus · Bénin
              </p>
              <h1 className="font-heading text-balance text-4xl font-bold leading-tight tracking-tight text-techjus-blue md:text-5xl lg:text-6xl">
                Faire du droit du numérique,{' '}
                <span className="bg-gradient-to-r from-techjus-blue to-techjus-green bg-clip-text text-transparent">
                  un levier d&apos;excellence
                </span>
              </h1>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  size="lg"
                  className="bg-techjus-blue font-semibold shadow-techjus transition-all duration-300 hover:scale-[1.02] hover:bg-techjus-blue/90"
                  onClick={handleJoinClick}
                >
                  Rejoindre la communauté
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-techjus-yellow bg-techjus-yellow font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:text-techjus-yellow"
                >
                  <a
                    href="/techjus_presentation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    En savoir plus
                  </a>
                </Button>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-techjus-blue/20 via-transparent to-techjus-green/20 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80" aria-hidden />
              <img
                src="/ezekiel.webp"
                alt="Ezekiel T. SOHOU"
                className="relative aspect-[3/4] w-full rounded-2xl object-cover shadow-techjus-lg ring-1 ring-slate-900/5 transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

              <div className={`absolute bottom-4 left-4 right-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <blockquote className="border-l-4 border-techjus-yellow pl-5 text-sm italic text-white drop-shadow-md md:pl-6 md:text-base">
                  "L'emblématique union entre le droit et le numérique a créé une nouvelle matière dynamique d'essence, parfois volatile mais surtout très subtile. Ensemble, nous pouvons mieux l'appréhender"
                  <footer className="text-sm mt-4 font-bold text-techjus-yellow relative">
                    <div className="flex items-center justify-start gap-2">
                      <a
                        href="https://www.linkedin.com/in/ez%C3%A9kiel-sohou-%F0%9F%87%A7%F0%9F%87%AF%F0%9F%92%AB-059126177/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center gap-1 group"
                        onMouseEnter={() => setIsHoveringName(true)}
                        onMouseLeave={() => setIsHoveringName(false)}
                      >
                        <span className="relative">
                          Ezékiel T. SOHOU
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                          <span className="absolute -inset-1 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                        </span>
                        <ExternalLink 
                          size={14} 
                          className={`transition-all duration-300 ${
                            isHoveringName 
                              ? 'opacity-100 transform translate-x-1 text-white' 
                              : 'opacity-70 text-techjus-yellow'
                          }`}
                        />
                      </a>
                    </div>
                    <div
                      className={`mt-1 flex items-center justify-end gap-1 text-xs text-white/80 transition-all duration-300 ${
                        isHoveringName ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}
                    >
                      <MousePointerClick className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span>Découvrir son profil LinkedIn</span>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute bottom-8 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full text-techjus-blue hover:bg-techjus-blue/10 hover:text-techjus-red"
          onClick={scrollToAbout}
          aria-label="Défiler vers la section À propos"
        >
          <ChevronDown className="h-8 w-8 motion-safe:animate-bounce" />
        </Button>

        {/* Modal avec marges uniformes */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-techjus-lg md:p-10">
              <AlertCircle className="w-12 h-12 text-techjus-blue mx-auto mb-4" />
              <h2 className="text-2xl font-extrabold mb-4 text-techjus-blue">Avant de continuer</h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                <strong>TechJus ne collecte aucune de vos données.</strong><br />
                En cliquant sur ce lien vous consentez à rejoindre la communauté TechJus sur WhatsApp et à respecter le code de bonne conduite de ladite communauté. <br />
                <span className="text-techjus-blue font-semibold">Bienvenue dans l'univers TechJus.</span>
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </Button>
                <Button
                  type="button"
                  className="bg-techjus-blue hover:bg-techjus-blue/90"
                  onClick={confirmJoin}
                >
                  Continuer
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

    </>
  );
};

export default HeroSection;