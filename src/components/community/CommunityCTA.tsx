import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunityCTA: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleJoinClick = () => {
    setShowModal(true);
  };

  const confirmJoin = () => {
    window.open("https://whatsapp.com/channel/0029VbBaMuj1SWt7W5dhYx2C", "_blank");
    setShowModal(false);
  };

  return (
    <>
      <section className="border-t border-slate-200/80 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-techjus-blue via-[#004a8a] to-techjus-green p-8 text-white shadow-techjus-lg ring-1 ring-black/5 md:p-12">
              <div className="bg-opportunites-mesh absolute inset-0 opacity-20" aria-hidden />
              <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                <Globe className="text-white" size={36} strokeWidth={1.75} aria-hidden />
              </div>
              <h2 className="relative mb-4 font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
                Rejoignez notre communauté dès aujourd&apos;hui
              </h2>
              <p className="relative mx-auto mb-8 max-w-2xl font-body text-base text-white/90 md:text-lg">
                Participez aux discussions, partagez votre expertise et contribuez au développement du droit du numérique au Bénin.
              </p>
              <div className="relative flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  className="bg-white font-semibold text-techjus-blue shadow-md transition-transform hover:scale-[1.02] hover:bg-slate-50"
                  onClick={handleJoinClick}
                >
                  Rejoindre WhatsApp
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/80 bg-transparent font-semibold text-white shadow-none backdrop-blur-sm hover:scale-[1.02] hover:bg-white/15 hover:text-white"
                >
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-2xl md:p-10">
            <AlertCircle className="w-12 h-12 text-techjus-blue mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold mb-4 text-techjus-blue font-heading">Avant de continuer</h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg font-body">
              <strong className="text-techjus-blue">TechJus ne collecte aucune de vos données.</strong><br />
              En cliquant sur ce lien vous consentez à rejoindre la communauté TechJus sur WhatsApp et à respecter le code de bonne conduite de ladite communauté. <br />
              <span className="text-techjus-blue font-semibold">Bienvenue dans l'univers TechJus.</span>
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
              <Button
                type="button"
                className="bg-techjus-blue font-semibold hover:bg-techjus-blue/90"
                onClick={confirmJoin}
              >
                Rejoindre la communauté
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityCTA;
