import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}
export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <div className="serch-bar__container">
        <Search className="serch-bar__icon" />
        <Input
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px] bg-transparent"
        />
      </div>
    </div>
  );
};
