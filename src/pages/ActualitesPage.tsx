import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileX, Search } from 'lucide-react';
import { Actualite } from '../components/actualites/types';
import ActualiteCard from '../components/actualites/ActualiteCard';
import ActualiteDetail from '../components/actualites/ActualiteDetail';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import Tag from '../components/shared/Tag';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Import des données (à remplacer par un appel API)
import actualitesData from '../data/actualites.json';

const ActualitesPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug || '';
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Simulation d'un appel API
    setTimeout(() => {
      // Convertir les données pour correspondre au type Actualite
      const formattedData = actualitesData.map(item => ({
        ...item,
        tempsLecture: item.tempsLecture.toString(),
        extrait: item.extrait || '',
        auteur: item.auteur || '',
        tags: item.tags || []
      }));
      
      setActualites(formattedData);
      setLoading(false);
    }, 500);
  }, []);

  // Si on a un slug, afficher le détail de l'article
  if (slug) {
    const actualite = actualites.find(a => a.id.toString() === slug);
    
    if (loading) {
      return (
        <div className="page-canvas flex min-h-[50vh] items-center justify-center py-16">
          <div className="max-w-4xl px-4">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      );
    }

    if (!actualite) {
      return (
        <div className="page-canvas py-16">
          <div className="mx-auto max-w-4xl px-4">
            <EmptyState
              title="Article non trouvé"
              description="L'article que vous cherchez n'existe pas ou a été supprimé."
              icon={FileX}
              iconClassName="text-destructive"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="page-canvas py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ActualiteDetail actualite={actualite} />
        </div>
      </div>
    );
  }

  // Page de liste des actualités
  const allTags = [...new Set(actualites.flatMap(a => a.tags))];
  
  const filteredActualites = actualites.filter(actualite => {
    const matchesTag = !selectedTag || (actualite.tags?.includes(selectedTag) || false);
    const matchesSearch = !searchTerm || 
      actualite.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (actualite.extrait?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (actualite.auteur?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    return matchesTag && matchesSearch;
  });

  if (loading) {
    return (
      <div className="page-canvas flex min-h-[50vh] items-center justify-center py-16">
        <div className="max-w-7xl px-4">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-canvas py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-techjus-blue">
            Veille &amp; analyses
          </p>
          <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Actualités TechJus
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
            Restez informé des dernières évolutions en matière de droit, technologie et éthique numérique
          </p>
        </div>

        {/* Filtres */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-techjus-blue">
              Filtrer les articles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value || '')}
                className="pl-9"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-foreground">
                Filtrer par catégorie
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={!selectedTag ? 'default' : 'outline'}
                  className="rounded-full"
                  onClick={() => setSelectedTag('')}
                >
                  Tous
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    size="sm"
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    className="rounded-full"
                    onClick={() => setSelectedTag(tag === selectedTag ? '' : tag || '')}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {(selectedTag || searchTerm) && (
              <div className="border-t border-border pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Filtres actifs :
                  </span>
                  {searchTerm && (
                    <Tag variant="primary" size="sm">
                      &quot;{searchTerm}&quot;
                    </Tag>
                  )}
                  {selectedTag && (
                    <Tag variant={selectedTag} size="sm">
                      {selectedTag}
                    </Tag>
                  )}
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 text-primary"
                    onClick={() => {
                      setSelectedTag('');
                      setSearchTerm('');
                    }}
                  >
                    Effacer tous
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="mb-8">
          <p className="text-gray-600">
            {filteredActualites.length} article{filteredActualites.length !== 1 ? 's' : ''} trouvé{filteredActualites.length !== 1 ? 's' : ''}
            {selectedTag && ` dans la catégorie "${selectedTag}"`}
          </p>
        </div>

        {/* Grille d'articles */}
        {filteredActualites.length === 0 ? (
          <EmptyState
            title="Aucun article trouvé"
            description="Essayez d'ajuster vos filtres ou votre recherche."
            icon={Search}
            iconClassName="text-techjus-blue"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActualites.map(actualite => (
              <ActualiteCard key={actualite.id} actualite={actualite} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActualitesPage;
