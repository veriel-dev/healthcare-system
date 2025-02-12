import { Card } from '@/components/ui/card';
import { Radio } from 'lucide-react';

interface Props {
  diagnosticData: number[];
}
export const SideDiagnosticPanel = ({ diagnosticData }: Props) => {
  return (
    <div className="w-96 hidden lg:flex flex-col gap-4">
      <Card className="flex-1 bg-zinc-900/50 backdrop-blur-xl border-zinc-800/50 rounded-2xl overflow-hidden">
        <div className="h-full p-6 relative">
          {/* Visualización de datos de diagnóstico */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-teal-500 font-mono text-sm">DIAGNÓSTICO EN TIEMPO REAL</span>
              <Radio className="w-5 h-5 text-teal-500 animate-pulse" />
            </div>

            {/* Visualización de matriz de datos */}
            <div className="grid grid-cols-8 gap-1 h-48">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-teal-500/20 rounded-sm"
                  style={{
                    height: `${Math.random() * 100}%`,
                    transition: 'height 0.5s ease-out',
                  }}
                />
              ))}
            </div>

            {/* Sección de métricas */}
            <div className="space-y-4">
              {[
                { label: 'INTEGRIDAD DEL SISTEMA', value: '99.9%' },
                { label: 'NIVEL DE ENCRIPTACIÓN', value: 'AES-256' },
                { label: 'ESTADO DE LA RED', value: 'ÓPTIMO' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-zinc-800/30 p-3 rounded-lg">
                  <div className="text-xs text-zinc-400 mb-1">{label}</div>
                  <div className="text-teal-400 font-mono">{value}</div>
                </div>
              ))}
            </div>

            {/* Línea de tiempo de actividad */}
            <div className="h-24 relative">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <path
                  d={diagnosticData
                    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i * 100) / 49},${v}`)
                    .join(' ')}
                  fill="none"
                  stroke="rgb(45, 212, 191)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
