import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import AuthShell from '../features/auth/components/auth-shell';
import Button from '../components/button';
import Seo from '../components/seo';
import { register as registerApi } from '../api';
import { toast } from '../components/toast';
import { useTranslation } from 'react-i18next';


const schema = z.object({
     email: z.email(),
     password: z.string().min(8),
     confirmPassword: z.string().min(8),
     firstName: z.string().min(1),
     lastName: z.string().min(1),
     phone: z.string().min(7),
     birthdayDate: z.string().min(1),
     gender: z.enum(['MALE', 'FEMALE', 'PREFER_NOT_TO_SAY'])
});
type Form = z.infer<typeof schema>;


export default function Register() {
     const nav = useNavigate();
     const { t } = useTranslation();
     const { register, handleSubmit } = useForm<Form>({
          resolver: zodResolver(schema), defaultValues:
          {
               gender: 'PREFER_NOT_TO_SAY',
               email: '',
               password: '',
               confirmPassword: '',
               firstName: '',
               lastName: '',
               phone: '',
               birthdayDate: ''
          }
     });


     const m = useMutation({
          mutationFn: registerApi, onSuccess: () => {
               toast(t('auth.activationSent'));
               nav('/login')
          }, onError: () => toast(t('auth.registerError'))
     });
     return <>
          <Seo title={t('auth.register')} />
          <AuthShell title={t('auth.register')}>
               <p className="text-sm text-muted">{t('auth.registerBody')}</p>
               <form onSubmit={handleSubmit(({ confirmPassword, ...registerData }) => m.mutate(registerData))} className="grid grid-cols-2 gap-3 mt-8">
                    <input placeholder={t('auth.firstName')} {...register('firstName')} className="h-12 border thin-border bg-white px-4 outline-none" />
                    <input placeholder={t('auth.lastName')} {...register('lastName')} className="h-12 border thin-border bg-white px-4 outline-none" />
                    <input placeholder={t('auth.email')} type="email" {...register('email')} className="h-12 border thin-border bg-white px-4 outline-none col-span-2" />
                    <input placeholder={t('auth.password')} type="password" {...register('password')} className="h-12 border thin-border bg-white px-4 outline-none col-span-2" />
                    <input placeholder={t('auth.confirmPassword')} type="password" {...register('confirmPassword')} className="h-12 border thin-border bg-white px-4 outline-none col-span-2" />
                    <input placeholder={t('auth.phone')} {...register('phone')} className="h-12 border thin-border bg-white px-4 outline-none col-span-2" />
                    <input aria-label={t('auth.birthday')} type="date" {...register('birthdayDate')} className="h-12 border thin-border bg-white px-4 outline-none col-span-2" />
                    <select {...register('gender')} aria-label={t('auth.gender')} className="h-12 border thin-border bg-white px-4 outline-none col-span-2">
                         <option value="PREFER_NOT_TO_SAY">{t('auth.prefer')}</option>
                         <option value="FEMALE">{t('auth.female')}</option>
                         <option value="MALE">{t('auth.male')}</option>
                    </select>
                    <Button type="submit" className="w-full col-span-2">{m.isPending ? t('auth.creating') : t('auth.register')}</Button>
               </form>
               <p className="text-sm text-muted mt-8">
                    {t('auth.already')} <Link to="/login" className="underline text-ink">{t('auth.signIn')}</Link>
               </p>
          </AuthShell>
     </>
}
