import React from 'react';

interface JoinCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const JoinCommunityModal: React.FC<JoinCommunityModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4 text-techjus-blue">Information importante</h2>
        <p className="text-gray-700 mb-4">
          TechJus ne collecte aucune de vos données.
          <br /><br />
          En cliquant sur ce lien vous consentez à rejoindre la communauté TechJus sur WhatsApp et à respecter le code de bonne conduite de ladite communauté.
          <br /><br />
          <strong>Bienvenue dans l'univers TechJus.</strong>
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-techjus-blue text-white hover:bg-techjus-green"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunityModal;
