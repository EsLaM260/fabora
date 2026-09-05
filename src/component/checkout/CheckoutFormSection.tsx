import { useEffect } from 'react';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, MapPin, Mail } from 'lucide-react';
import Button from '../common/Button';
import { CheckoutInput, CheckoutSelect } from './CheckoutField';
import { toast } from '../common/Toast';
import { useTranslation } from 'react-i18next';

const schema = z.object({
  email: z.string().email(),
  emailOffers: z.boolean().default(false),
  country: z.string().min(1),
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  address: z.string().trim().min(5),
  apartment: z.string().trim().optional(),
  city: z.string().trim().min(2),
  postalCode: z.string().trim().min(2),
  saveInfo: z.boolean().default(false),
  smsOffers: z.boolean().default(false),
  payment: z.enum(['card', 'cash']),
  cardholderName: z.string().trim().optional(),
  cardNumber: z.string().trim().optional(),
  cardExpiry: z.string().trim().optional(),
  cardCvc: z.string().trim().optional(),
}).superRefine((value, ctx) => {
  if (value.payment !== 'card') return;
  if (!value.cardholderName || value.cardholderName.length < 2) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cardholderName'], message: 'cardholder' });
  if (!value.cardNumber || value.cardNumber.replace(/\s/g, '').length < 12) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cardNumber'], message: 'cardNumber' });
  if (!value.cardExpiry || value.cardExpiry.length < 4) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cardExpiry'], message: 'cardExpiry' });
  if (!value.cardCvc || value.cardCvc.length < 3) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cardCvc'], message: 'cardCvc' });
});

type CheckoutValues = z.infer<typeof schema>;
const initialValues: CheckoutValues = {
  email: '', emailOffers: false, country: 'EG', firstName: '', lastName: '', address: '', apartment: '', city: '', postalCode: '', saveInfo: false, smsOffers: false,
  payment: 'card', cardholderName: '', cardNumber: '', cardExpiry: '', cardCvc: '',
};

export default function CheckoutFormSection({ disabled = false }: { disabled?: boolean }) {
  const { t } = useTranslation();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, clearErrors } = useForm<CheckoutValues>({ resolver: zodResolver(schema), defaultValues: initialValues, mode: 'onBlur' });
  const payment = watch('payment');

  useEffect(() => {
    if (payment === 'cash') clearErrors(['cardholderName', 'cardNumber', 'cardExpiry', 'cardCvc']);
  }, [payment, clearErrors]);

  const submit = async (_values: CheckoutValues) => { await new Promise((resolve) => setTimeout(resolve, 250)); toast(t('checkout.ready')); };
  const errorKey = (field: keyof CheckoutValues, fallback: string) => errors[field] ? t(`checkout.errors.${fallback}`) : undefined;

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-12">
      <CheckoutSection icon={<Mail size={17} />} eyebrow="01" title={t('checkout.contact')}>
        <div className="space-y-5">
          <CheckoutInput {...register('email')} label={t('checkout.email')} type="email" autoComplete="email" placeholder="you@example.com" error={errorKey('email', 'emailError')} />
          <CheckboxField register={register} name="emailOffers" label={t('checkout.emailOffers')} />
        </div>
      </CheckoutSection>

      <CheckoutSection icon={<MapPin size={17} />} eyebrow="02" title={t('checkout.deliveryAddress')}>
        <div className="grid sm:grid-cols-2 gap-5">
          <CheckoutSelect {...register('country')} label={t('checkout.country')} autoComplete="country" error={errorKey('country', 'countryError')} as="select">
            <option value="EG">Egypt</option><option value="AE">United Arab Emirates</option>
          </CheckoutSelect>
          <div className="hidden sm:block" />
          <CheckoutInput {...register('firstName')} label={t('checkout.firstName')} autoComplete="given-name" placeholder={t('checkout.firstName')} error={errorKey('firstName', 'firstNameError')} />
          <CheckoutInput {...register('lastName')} label={t('checkout.lastName')} autoComplete="family-name" placeholder={t('checkout.lastName')} error={errorKey('lastName', 'lastNameError')} />
          <div className="sm:col-span-2"><CheckoutInput {...register('address')} label={t('checkout.address')} autoComplete="street-address" placeholder={t('checkout.address')} error={errorKey('address', 'addressError')} /></div>
          <div className="sm:col-span-2"><CheckoutInput {...register('apartment')} label={t('checkout.apartment')} autoComplete="address-line2" placeholder={t('checkout.apartmentPlaceholder')} /></div>
          <CheckoutInput {...register('city')} label={t('checkout.city')} autoComplete="address-level2" placeholder={t('checkout.city')} error={errorKey('city', 'cityError')} />
          <CheckoutInput {...register('postalCode')} label={t('checkout.postal')} autoComplete="postal-code" placeholder={t('checkout.postal')} error={errorKey('postalCode', 'postalError')} />
        </div>
        <div className="mt-6 space-y-4 pt-5 border-t thin-border">
          <CheckboxField register={register} name="saveInfo" label={t('checkout.saveInfo')} />
          <CheckboxField register={register} name="smsOffers" label={t('checkout.smsOffers')} />
        </div>
      </CheckoutSection>

      <CheckoutSection icon={<CreditCard size={17} />} eyebrow="03" title={t('checkout.paymentMethod')}>
        <div className="grid gap-3">
          <PaymentOption value="card" title={t('checkout.card')} description={t('checkout.cardText')} register={register} selected={payment === 'card'} />
          {payment === 'card' && (
            <div className="border-x border-b thin-border bg-[#faf8f4] p-5 md:p-6 -mt-3 rounded-b-xl">
              <div className="grid gap-5">
                <CheckoutInput {...register('cardholderName')} label={t('checkout.cardholderName')} autoComplete="cc-name" placeholder={t('checkout.cardholderPlaceholder')} error={errors.cardholderName ? t('checkout.errors.cardholderError') : undefined} />
                <CheckoutInput {...register('cardNumber')} label={t('checkout.cardNumber')} inputMode="numeric" autoComplete="cc-number" placeholder="•••• •••• •••• ••••" error={errors.cardNumber ? t('checkout.errors.cardNumberError') : undefined} />
                <div className="grid grid-cols-2 gap-5">
                  <CheckoutInput {...register('cardExpiry')} label={t('checkout.cardExpiry')} autoComplete="cc-exp" placeholder="MM / YY" error={errors.cardExpiry ? t('checkout.errors.cardExpiryError') : undefined} />
                  <CheckoutInput {...register('cardCvc')} label={t('checkout.cardCvc')} inputMode="numeric" autoComplete="cc-csc" placeholder="•••" error={errors.cardCvc ? t('checkout.errors.cardCvcError') : undefined} />
                </div>
              </div>
            </div>
          )}
          <PaymentOption value="cash" title={t('checkout.payOnDelivery')} description={t('checkout.codText')} register={register} selected={payment === 'cash'} />
        </div>
      </CheckoutSection>

      <div className="border-t thin-border pt-7"><Button type="submit" className="w-full h-14" disabled={disabled || isSubmitting}>{isSubmitting ? t('checkout.processing') : t('checkout.placeOrder')}</Button><p className="text-[10px] text-muted text-center mt-4 leading-5">{t('checkout.agreement')}</p></div>
    </form>
  );
}

function CheckoutSection({ icon, eyebrow, title, children }: { icon: React.ReactNode; eyebrow: string; title: string; children: React.ReactNode }) {
  return <section><div className="flex items-center gap-4 mb-6"><div className="w-10 h-10 border thin-border grid place-items-center bg-white rounded-xl">{icon}</div><div><p className="text-[10px] uppercase tracking-[.2em] text-muted">{eyebrow}</p><h2 className="serif text-2xl mt-1">{title}</h2></div></div>{children}</section>;
}

function CheckboxField<TField extends string>({ register, name, label }: { register: UseFormRegister<any>; name: TField; label: string }) {
  return <label className="flex items-start gap-3 cursor-pointer text-sm leading-6"><input {...register(name)} type="checkbox" className="mt-1.5 h-4 w-4 accent-black rounded" /><span>{label}</span></label>;
}

function PaymentOption({ value, title, description, register, selected }: { value: CheckoutValues['payment']; title: string; description: string; register: UseFormRegister<CheckoutValues>; selected: boolean }) {
  return <label className={`border thin-border p-5 flex items-start gap-4 cursor-pointer bg-white transition-colors rounded-xl ${selected ? 'border-ink shadow-sm' : 'hover:border-ink/50'}`}><input {...register('payment')} value={value} type="radio" className="mt-1 accent-black" /><span><span className="block text-sm font-medium">{title}</span><span className="block text-xs text-muted leading-5 mt-1">{description}</span></span></label>;
}
