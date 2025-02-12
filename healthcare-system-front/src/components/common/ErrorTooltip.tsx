import { ErrorState } from '@/hooks';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export const ErrorTooltip: React.FC<{ error: ErrorState; onClose: () => void }> = ({
  error,
  onClose,
}) => {
  if (!error.visible) return null;

  return (
    <div className="animate-in fade-in slide-in-from-top-5 text-start">
      <Alert className=" border-red-500 text-red-500 bg-transparent">
        <AlertDescription className="flex items-start gap-2">
          {error.message}
          <button onClick={onClose} className="p-1 hover:bg-red-100 rounded-full transition-colors">
            <X size={16} />
          </button>
        </AlertDescription>
      </Alert>
    </div>
  );
};
