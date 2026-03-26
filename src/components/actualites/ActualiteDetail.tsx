// src/components/actualites/ActualiteDetail.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Tag from '../shared/Tag';
import { Actualite } from './types';

const ActualiteDetail: React.FC<{ actualite: Actualite }> = ({ actualite }) => {
  if (!actualite) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph: string, index: number) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link to="/" className="hover:text-blue-600">Accueil</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to="/actualites" className="hover:text-blue-600">Actualités</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-900 truncate">{actualite.titre}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {actualite.tags?.map((tag, index) => (
            <Tag key={index} variant={tag}>
              {tag}
            </Tag>
          )) || null}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {actualite.titre}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center">
            <span className="font-medium">{actualite.auteur}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{formatDate(actualite.date)}</span>
            <span>•</span>
            <span>{actualite.tempsLecture} min de lecture</span>
          </div>
        </div>

        <p className="text-xl text-gray-600 leading-relaxed font-light">
          {actualite.extrait}
        </p>
      </header>

      {/* Image principale */}
      <div className="mb-8">
        <img
          src={actualite.image}
          alt={actualite.titre}
          className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Contenu */}
      <div className="prose prose-lg max-w-none">
        <div className="text-gray-700 leading-relaxed">
          {formatContent(actualite.contenu)}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            to="/actualites"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux actualités
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Partager :</span>
            <button className="text-gray-400 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>
            <button className="text-gray-400 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ActualiteDetail;