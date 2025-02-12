import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}

export const Pagination = ({ currentPage, onPageChange, hasNextPage }: PaginationProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8"
      >
        Anterior
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="h-8"
      >
        Siguiente
      </Button>
    </div>
  );
};
