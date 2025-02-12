import { CardItem, EmergencyContact, FormNotifications } from '@/components';
import { CardLayout } from '@/components';
import {
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Flag,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  RefreshCcw,
  Rss,
  School,
  Shield,
  User,
} from 'lucide-react';
import { useAuth } from '@/hooks';
import { formatDate } from '@/utils';

export const ProfileProfile = () => {
  const { user } = useAuth();
  return (
    <>
      <CardLayout title="Avatar">
        <div className="flex items-start justify-center flex-col">
          <div className="">
            <img
              src={user?.data.profileImage?.url}
              alt="Avatar"
              height={100}
              width={100}
              loading="lazy"
            />
          </div>
        </div>
        <CardItem
          icon={User}
          text={`${user?.data.firstName} ${user?.data.lastName}`}
          classIcon="text-white"
        />
        <CardItem
          icon={Rss}
          text={`Último acceso: ${formatDate(user?.data.lastLogin as string)}`}
          classIcon="text-emerald-500"
        />
        <CardItem
          icon={RefreshCcw}
          text={`Última actualización: ${formatDate(user?.data.updatedAt as string)}`}
          classIcon="text-yellow-500 animate-spin"
        />
        <CardItem
          icon={RefreshCcw}
          text={`Creación de los datos: ${formatDate(user?.data.createdAt as string)}`}
          classIcon="text-blue-500 animate-spin"
        />
      </CardLayout>
      <CardLayout title={'Información Personal'} status={user?.data.status}>
        <CardItem icon={Mail} text={user?.data.email} />
        <CardItem
          icon={Shield}
          text={user?.data.role}
          className="capitalize text-emerald-500 font-bold"
        />
        <CardItem icon={FileText} text={user?.data.licenseNumber} />
        <CardItem icon={Briefcase} text={user?.data.speciality} />
      </CardLayout>
      <CardLayout title="Educación">
        <CardItem icon={School} text={user?.data.education.institution} />
        <CardItem icon={GraduationCap} text={user?.data.education.degree} />
        <CardItem icon={Flag} text={user?.data.education.country} />
        <CardItem icon={Clock} text={user?.data.education.year} />
      </CardLayout>
      <CardLayout title="Información de Contacto">
        <CardItem icon={Phone} text={user?.data.contactInfo.phone} />
        <CardItem icon={MapPin} text={user?.data.contactInfo.address} />
        <EmergencyContact {...user?.data.contactInfo.emergencyContact} />
      </CardLayout>
      <CardLayout title="Horario Laboral">
        {user?.data.schedule.map(schedule => (
          <div key={schedule._id} className="bg-zinc-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-400">{schedule.day}</span>
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-sm text-gray-400">
              {schedule.startTime} - {schedule.endTime}
            </p>
          </div>
        ))}
      </CardLayout>
      <CardLayout title="Preferencias de las notificaciones">
        <FormNotifications user={user} />
      </CardLayout>
    </>
  );
};
