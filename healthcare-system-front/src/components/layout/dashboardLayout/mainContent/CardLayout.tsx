import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  status?: string;
}
export const CardLayout = ({ title, children, status }: Props) => {
  return (
    <Card className="card-layout">
      <CardContent className="p-6">
        {status ? (
          <div className="card-layout__status">
            <h3 className="card-layout__status-title">{title}</h3>
            <div
              className={`card-layout__status-element ${
                status === 'active'
                  ? 'bg-emerald-400/10 text-emerald-400'
                  : 'bg-red-400/10 text-red-400'
              }`}
            >
              {status}
            </div>
          </div>
        ) : (
          <h3 className="card-layout__status-title-no">{title}</h3>
        )}

        <div className="space-y-4">{children}</div>
      </CardContent>
    </Card>
  );
};
