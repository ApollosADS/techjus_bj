// src/components/recrutements/RecrutementCard.tsx
import { Link } from 'react-router-dom';
import { Briefcase, Clock, Calendar } from 'lucide-react';
import Card from '../shared/Card';
import { Button } from '@/components/ui/button';
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
            <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <div className="flex items-center gap-2">
              <span className="font-medium">{recrutement.type}</span>
              <span className="text-gray-400">•</span>
              <span>{recrutement.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
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
              <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
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
              <Button
                type="button"
                variant="outline"
                className="border-techjus-blue/20 bg-techjus-blue/10 text-techjus-blue hover:bg-techjus-blue/20"
                title="Ouvrir le PDF dans un nouvel onglet"
                onClick={() => window.open(recrutement.files?.pdf || '', '_blank')}
              >
                Voir détails
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecrutementCard;