import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  text: string | undefined;
  className?: string;
  classIcon?: string;
}

export const CardItem = ({ icon: Icon, text, className, classIcon }: Props) => {
  return (
    <div className={cn('card-layout__item', className)}>
      <Icon className={cn('card-layout__icon', classIcon)} />
      <span className="">{text}</span>
    </div>
  );
};
