import { useState } from 'react';
import { AxiosError } from 'axios';

export type ErrorState = {
  message: string;
  visible: boolean;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message;
    if (message) return message;

    const typoMessage = error.response?.data?.mesage;
    if (typoMessage) return typoMessage;

    if (error.message) return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Error inesperado';
};

export const useErrorTooltip = (initialMessage = '') => {
  const [error, setError] = useState<ErrorState>({
    message: initialMessage,
    visible: false,
  });
  const showError = (error: unknown) => {
    const message = getErrorMessage(error);
    setError({ message, visible: true });
    setTimeout(() => {
      setError(prev => ({ ...prev, visible: false }));
    }, 5000);
  };
  const hideError = () => {
    setError(prev => ({ ...prev, visible: false }));
  };

  return { error, showError, hideError };
};
