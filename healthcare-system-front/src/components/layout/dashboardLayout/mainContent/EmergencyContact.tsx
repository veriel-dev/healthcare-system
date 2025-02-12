import { Phone, AlertCircle, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  name?: string | undefined;
  phone?: string | undefined;
  relationship?: string | undefined;
}
export const EmergencyContact = ({ name, phone, relationship }: Props) => {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-emerald-400" />
        <h4 className="font-medium">Contacto de Emergencia</h4>
      </div>

      <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-700">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-2 bg-zinc-700/50 rounded-lg">
            <UserCircle className="h-8 w-8 text-emerald-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <h5 className="text-lg font-medium text-emerald-400 truncate">{name}</h5>
              <p className="text-sm text-gray-400 capitalize">{relationship}</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-md">
              <Phone className="h-4 w-4 text-emerald-400" />
              <Link to={`tel:${phone}`} className="text-sm font-medium">
                {phone}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
