import type { ReactNode } from 'react';

import { Card as ShadCard, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: string;
  shadow?: string;
  rounded?: string;
}

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'p-6',
  shadow = '',
  rounded = '',
}: CardProps) => {
  return (
    <ShadCard
      className={cn(shadow, rounded, hover && 'cursor-pointer transition-shadow hover:shadow-md', className)}
    >
      <CardContent className={cn('p-6', padding)}>{children}</CardContent>
    </ShadCard>
  );
};

export default Card;
