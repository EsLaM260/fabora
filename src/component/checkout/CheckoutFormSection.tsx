import { useForm, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, MapPin, Truck, UserRound } from 'lucide-react';
import Button from '../common/Button';
import { CheckoutInput, CheckoutSelect } from './CheckoutField';
import { toast } from '../common/Toast';
import { useTranslation } from 'react-i18next';

const schema = z.object({
  email: z.string().email(), firstName: z.string().trim().min(2), lastName: z.string().trim().min(2), phone: z.string().trim().min(7), address: z.string().trim().min(5), city: z.string().trim().min(2), country: z.string().min(1), postalCode: z.string().trim().min(2), payment: z.enum(['card', 'cash']),
});
type CheckoutValues = z.infer<typeof schema>;
const initialValues: CheckoutValues = { email: '', firstName: '', lastName: '', phone: '', address: '', city: '', country: 'EG', postalCode: '', payment: 'card' };

export default function CheckoutFormSection({ disabled = false }: { disabled?: boolean }) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutValues>({ resolver: zodResolver(schema), defaultValues: initialValues, mode: 'onBlur' });
  const submit = async (_values: CheckoutValues) => { await new Promise((resolve) => setTimeout(resolve, 250)); toast(t('checkout.ready')); };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-10">
      <CheckoutSection icon={<UserRound size={17} />} eyebrow="01" title={t('checkout.contact')}>
        <div className="grid sm:grid-cols-2 gap-5"><div className="sm:col-span-2"><CheckoutInput {...register('email')} label={t('checkout.email')} type="email" autoComplete="email" placeholder="you@example.com" error={errors.email ? t('checkout.errors.emailError') : undefined} /></div><CheckoutInput {...register('phone')} label={t('checkout.phone')} type="tel" autoComplete="tel" placeholder="+20 1XX XXX XXXX" error={errors.phone ? t('checkout.errors.phoneError') : undefined} /></div>
      </CheckoutSection>

      <CheckoutSection icon={<MapPin size={17} />} eyebrow="02" title={t('checkout.deliveryAddress')}>
        <div className="grid sm:grid-cols-2 gap-5">
          <CheckoutInput {...register('firstName')} label={t('checkout.firstName')} autoComplete="given-name" placeholder={t('checkout.firstName')} error={errors.firstName ? t('checkout.errors.firstNameError') : undefined} />
          <CheckoutInput {...register('lastName')} label={t('checkout.lastName')} autoComplete="family-name" placeholder={t('checkout.lastName')} error={errors.lastName ? t('checkout.errors.lastNameError') : undefined} />
          <div className="sm:col-span-2"><CheckoutInput {...register('address')} label={t('checkout.address')} autoComplete="street-address" placeholder={t('checkout.address')} error={errors.address ? t('checkout.errors.addressError') : undefined} /></div>
          <CheckoutInput {...register('city')} label={t('checkout.city')} autoComplete="address-level2" placeholder="Cairo" error={errors.city ? t('checkout.errors.cityError') : undefined} />
          <CheckoutSelect {...register('country')} label={t('checkout.country')} autoComplete="country" error={errors.country ? t('checkout.errors.countryError') : undefined} as="select"><option value="EG">Egypt</option><option value="AE">United Arab Emirates</option></CheckoutSelect>
          <CheckoutInput {...register('postalCode')} label={t('checkout.postal')} autoComplete="postal-code" placeholder={t('checkout.postal')} error={errors.postalCode ? t('checkout.errors.postalError') : undefined} />
        </div>
      </CheckoutSection>

      <CheckoutSection icon={<Truck size={17} />} eyebrow="03" title={t('checkout.shippingMethod')}>
        <div className="space-y-3"><label className="border border-ink bg-[#f8f5f0] p-5 flex items-start gap-4 cursor-pointer"><span className="mt-1 w-4 h-4 border-4 border-ink rounded-full shrink-0" /><span className="flex-1"><span className="flex items-center justify-between gap-4 text-sm font-medium"><span>{t('checkout.shippingStandard')}</span><span>{t('common.calculated')}</span></span><span className="block text-xs text-muted mt-2 leading-5">{t('checkout.shippingText')}</span></span></label></div>
      </CheckoutSection>

      <CheckoutSection icon={<CreditCard size={17} />} eyebrow="04" title={t('checkout.paymentMethod')}>
        <div className="grid gap-3"><PaymentOption value="card" title={t('checkout.card')} description={t('checkout.cardText')} register={register} /><PaymentOption value="cash" title={t('checkout.payOnDelivery')} description={t('checkout.codText')} register={register} /></div>
      </CheckoutSection>

      <div className="border-t thin-border pt-7"><Button type="submit" className="w-full h-14" disabled={disabled || isSubmitting}>{isSubmitting ? t('checkout.processing') : t('checkout.placeOrder')}</Button><p className="text-[10px] text-muted text-center mt-4 leading-5">{t('checkout.agreement')}</p></div>
    </form>
  );
}

function CheckoutSection({ icon, eyebrow, title, children }: { icon: React.ReactNode; eyebrow: string; title: string; children: React.ReactNode }) { return <section><div className="flex items-center gap-4 mb-6"><div className="w-10 h-10 border thin-border grid place-items-center bg-white">{icon}</div><div><p className="text-[10px] uppercase tracking-[.2em] text-muted">{eyebrow}</p><h2 className="serif text-2xl mt-1">{title}</h2></div></div>{children}</section>; }
function PaymentOption({ value, title, description, register }: { value: CheckoutValues['payment']; title: string; description: string; register: UseFormRegister<CheckoutValues> }) { return <label className="border thin-border p-5 flex items-start gap-4 cursor-pointer bg-white hover:border-ink transition-colors"><input {...register('payment')} value={value} type="radio" className="mt-1 accent-black" /><span><span className="block text-sm font-medium">{title}</span><span className="block text-xs text-muted leading-5 mt-1">{description}</span></span></label>; }
