import { useState, useEffect } from 'react';
import { ScanLines } from '../common';
import { Card } from '@/components/ui/card';
import { Timer } from 'lucide-react';
import { SideDiagnosticPanel } from '../auth';
import { Logo } from '../svg';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, description }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [diagnosticData, setDiagnosticData] = useState<number[]>([]);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanProgress(prev => (prev + 1) % 100);
    }, 100);

    const dataInterval = setInterval(() => {
      setDiagnosticData(prev => {
        const newData = [...prev, Math.random() * 100];
        return newData.slice(-50);
      });
    }, 200);
    return () => {
      clearInterval(scanInterval);
      clearInterval(dataInterval);
    };
  }, []);
  return (
    <div className="auth-layout__container">
      <ScanLines scanProgress={scanProgress} />
      <div className="auth-layout__content-wrapper">
        <SideDiagnosticPanel diagnosticData={diagnosticData} />
        <Card className="auth-layout__card">
          <div className="auth-layout__card-content">
            <div className="auth-layout__header-section">
              <div className="auth-layout__logo-container">
                <div className="auth-layout__logo-wrapper">
                  <Logo className="auth-layout__logo" />
                </div>
              </div>
              <h1 className="auth-layout__title">{title}</h1>
              <div className="auth-layout__description-wrapper">
                <Timer className="w-4 h-4" />
                <span className="auth-layout__description-text">{description}</span>
              </div>
            </div>
            {children}
            <div className="auth-layout__footer">
              <div className="inline-flex items-center space-x-3 text-zinc-500 font-mono text-sm">
                <span>SISTEMA DE ANÁLISIS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <span>v0.0.1</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
