import { Loader2 } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="loading">
      <Loader2 className="loading__spinner" />
      <span className="loading__text">Loading...</span>
    </div>
  );
};
