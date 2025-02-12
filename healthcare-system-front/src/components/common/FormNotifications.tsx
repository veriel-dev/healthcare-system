import { IUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '../ui/switch';

export const FormNotifications = ({ user }: { user: IUser | null | undefined }) => {
  const notificationsFormSchema = z.object({
    type: z.enum(['all', 'mentions', 'none'], {
      required_error: 'You need to select a notification type.',
    }),
    email: z.boolean().default(false).optional(),
    sms: z.boolean().default(false).optional(),
    pushNotifications: z.boolean().default(false).optional(),
  });

  type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

  const defaultValues: Partial<NotificationsFormValues> = {
    email: user?.data.notificationPreferences.email,
    sms: user?.data.notificationPreferences.sms,
    pushNotifications: user?.data.notificationPreferences.pushNotifications,
  };

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    alert({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border-none p-3 ">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Email</FormLabel>
                <FormDescription>Activar/desactivar Email</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="sms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border-none p-3">
              <div className="space-y-0.5">
                <FormLabel className="text-base">SMS</FormLabel>
                <FormDescription>Activar/Desactivar Messages</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="pushNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border-none p-3">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Push Notifications</FormLabel>
                <FormDescription>Activar/Desactivar Push</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
