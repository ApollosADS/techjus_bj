import React, { useState } from 'react';

interface MemberCardProps {
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  fallbackUrl?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  role,
  quote,
  imageUrl,
  fallbackUrl,
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError && fallbackUrl) {
      setImgSrc(fallbackUrl);
      setHasError(true);
    } else if (!hasError) {
      setImgSrc(
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&crop=face'
      );
      setHasError(true);
    }
  };

  return (
    <article className="group flex min-h-[340px] flex-col rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-techjus-blue/20 hover:shadow-techjus-lg">
      <div className="text-center">
        <div className="relative mx-auto mb-6 w-fit">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-techjus-blue/30 via-techjus-green/20 to-transparent opacity-70 blur-md transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
          <img
            src={imgSrc}
            alt={`Portrait de ${name}`}
            className="relative mx-auto h-32 w-32 rounded-full border-[3px] border-white object-cover shadow-md ring-2 ring-techjus-blue/25"
            onError={handleImageError}
            loading="lazy"
          />
          {hasError && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-900">
              Image temporaire
            </div>
          )}
        </div>

        <h3 className="mb-2 font-heading text-xl font-bold text-slate-900">{name}</h3>
        <p className="mb-4 inline-block rounded-full bg-techjus-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-techjus-blue">
          {role}
        </p>
        <p className="text-sm leading-relaxed text-slate-600">{quote}</p>
      </div>
    </article>
  );
};

export default MemberCard;
