import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  /** Classes Tailwind pour l’icône (ex. text-green-600) */
  iconClassName?: string;
  className?: string;
}

export function EmptyState({
  title = 'Aucun résultat',
  description = 'Aucun élément trouvé pour le moment.',
  icon: Icon = Inbox,
  iconClassName,
  className,
}: EmptyStateProps) {
  return (
    <Card
      className={cn('border-dashed bg-muted/40 shadow-none', className)}
    >
      <CardContent className="flex flex-col items-center justify-center px-6 pb-12 pt-12 text-center">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted"
          aria-hidden
        >
          <Icon
            className={cn('h-7 w-7 text-muted-foreground', iconClassName)}
          />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default EmptyState;
