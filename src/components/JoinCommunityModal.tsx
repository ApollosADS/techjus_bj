import React from 'react';

interface JoinCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const JoinCommunityModal: React.FC<JoinCommunityModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-rubik">
      <div className="bg-white rounded-2xl shadow-custom max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Information importante</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          TechJus ne collecte aucune de vos données.
          <br /><br />
          En cliquant sur ce lien, vous consentez à rejoindre la communauté TechJus sur WhatsApp
          et à respecter le code de bonne conduite de ladite communauté.
          <br /><br />
          <strong>Bienvenue dans l'univers TechJus.</strong>
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-accent transition-colors"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunityModal;
