// src/components/recrutements/RecrutementCard.tsx
import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import Tag from '../shared/Tag';
import { Recrutement } from '../../types/recrutement';



interface RecrutementCardProps {
  recrutement: Recrutement;
}

const RecrutementCard: React.FC<RecrutementCardProps> = ({ recrutement }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Styles pour les badges de statut
  const getStatusBadge = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: 'Expiré',
        variant: 'danger',
        tooltip: 'Cette offre a expiré'
      };
    }
    if (diffDays <= 7) {
      return {
        text: 'Urgent',
        variant: 'warning',
        tooltip: 'Moins de 7 jours avant la date limite'
      };
    }
    return {
      text: `Jusqu'au ${formatDate(deadline)}`,
      variant: 'default',
      tooltip: 'Date limite de candidature'
    };
  };

  return (
    <Card hover={true} className="h-full flex flex-col relative bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 p-6">
      {/* Badge urgent */}
      {recrutement.urgent && !getStatusBadge(recrutement.deadline).variant.includes('danger') && (
        <div className="absolute top-3 right-3 z-10">
          <Tag variant="danger" size="xs">
            Urgent
          </Tag>
        </div>
      )}

      {/* Image */}
      {recrutement.files?.image && (
        <div className="mb-6">
          <img 
            src={recrutement.files?.image} 
            alt={recrutement.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-gray-900 mb-2 font-heading">
                <Link 
                  to={`/recrutements/${recrutement.id}`}
                  className="hover:text-techjus-blue transition-colors duration-200"
                >
                  {recrutement.title}
                </Link>
              </h3>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-techjus-blue font-medium">{recrutement.organization}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{recrutement.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {/* Statut deadline */}
            <Tag 
              variant={getStatusBadge(recrutement.deadline).variant} 
              size="xs"
              title={getStatusBadge(recrutement.deadline).tooltip}
              className="px-2 py-1"
            >
              {getStatusBadge(recrutement.deadline).text}
            </Tag>
          </div>
        </div>

        {/* Tags catégories */}
        <div className="flex flex-wrap gap-3 mt-4">
          {recrutement.categories.slice(0, 3).map((category, index) => (
            <Tag key={index} variant={category} size="xs" className="px-2 py-1">
              {category}
            </Tag>
          ))}
          {recrutement.categories.length > 3 && (
            <Tag variant="default" size="xs" className="px-2 py-1">
              +{recrutement.categories.length - 3}
            </Tag>
          )}
        </div>
      </div>

      {/* Détails du poste */}
      <div className="space-y-4 mb-6 flex-1">
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6v10a2 2 0 002 2h4a2 2 0 002-2V6" />
            </svg>
            <div className="flex items-center gap-2">
              <span className="font-medium">{recrutement.type}</span>
              <span className="text-gray-400">•</span>
              <span>{recrutement.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{recrutement.salary}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm line-clamp-3 font-body">
          {recrutement.description}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Publié le {formatDate(recrutement.datePublication)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Statut deadline */}
            <Tag 
              variant={getStatusBadge(recrutement.deadline).variant} 
              size="xs"
              title={getStatusBadge(recrutement.deadline).tooltip}
            >
              {getStatusBadge(recrutement.deadline).text}
            </Tag>
            
            <div className="flex items-center gap-6">
              {/* Bouton Voir détails */}
              <button
                onClick={() => window.open(recrutement.files?.pdf || '', '_blank')}
                className="px-6 py-2.5 bg-techjus-blue/10 hover:bg-techjus-blue/20 text-techjus-blue rounded-md transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                title="Ouvrir le PDF dans un nouvel onglet"
              >
                Voir détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecrutementCard;