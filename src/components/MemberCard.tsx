import React from 'react';

interface MemberCardProps {
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ name, role, quote, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
      <div className="w-30 h-30 rounded-full overflow-hidden mb-6 border-4 border-techjus-light">
        <img 
          src={imageUrl} 
          alt={`Photo de ${name}`} 
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-bold text-techjus-blue mb-2">{name}</h3>
      <p className="text-techjus-green font-medium text-lg mb-3 uppercase">{role}</p>
      {quote && <p className="text-gray-700 italic text-center">{quote}</p>}
    </div>
  );
};

export default MemberCard;