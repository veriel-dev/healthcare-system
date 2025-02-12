import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth, useErrorTooltip } from '@/hooks';
import { config } from '@/config';
import { AuthLayout, DecoratedInput, ErrorTooltip } from '@/components';
import { CardContent, CardFooter } from '@/components/ui/card';
import { User, Lock, Activity } from 'lucide-react';
import { wrongLogin } from '@/data';
import { GoogleLogin } from '@/components/auth/login/GoogleLogin';

const schema = z.object({
  email: z
    .string()
    .nonempty(wrongLogin.emailField.emptyEmail)
    .email(wrongLogin.emailField.invalidEmail),
  password: z
    .string()
    .nonempty(wrongLogin.passwordField.emptyPassword)
    .min(6, wrongLogin.passwordField.invalidPassword),
});
type LoginForm = z.infer<typeof schema>;

export const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const { error, showError, hideError } = useErrorTooltip();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await handleLogin(data);
      navigate(config.auth.front.profile);
    } catch (error) {
      showError(error);
    }
  };
  return (
    <AuthLayout title="Veriel Health System" description="SISTEMA DE DIAGNÓSTICO AVANZADO">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CardContent className="space-y-4">
          <ErrorTooltip error={error} onClose={hideError} />
          <DecoratedInput
            icon={User}
            placeholder="Identificación de Usuario"
            type="email"
            autocomplete="email"
            message={errors.email?.message}
            {...register('email', { required: true })}
          />
          <DecoratedInput
            icon={Lock}
            placeholder="*******************"
            type="password"
            autocomplete="current-password"
            message={errors.password?.message}
            {...register('password', { required: true, maxLength: 20 })}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4" style={{ marginTop: 0 }}>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg font-medium relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center justify-center font-mono tracking-wider">
              INICIAR SESIÓN
              <Activity className="w-5 h-5 ml-2 group-hover:animate-pulse" />
            </span>
          </button>
          {/* <p className="text-sm text-center text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Button variant="link" className="p-0 h-auto font-semibold">
              Regístrate
            </Button>
          </p> */}
        </CardFooter>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">O continua con</span>
        </div>
      </div>
      <GoogleLogin />
    </AuthLayout>
  );
};
