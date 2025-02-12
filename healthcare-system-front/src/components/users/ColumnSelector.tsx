import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ColumnSelectorProps {
  visibleColumns: Record<string, boolean>;
  onColumnChange: (key: string, checked: boolean) => void;
}

export const ColumnSelector = ({ visibleColumns, onColumnChange }: ColumnSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          Columnas <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {Object.entries(visibleColumns).map(([key, visible]) => (
          <DropdownMenuCheckboxItem
            key={key}
            className="capitalize"
            checked={visible}
            onCheckedChange={checked => onColumnChange(key, checked)}
          >
            {key}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
