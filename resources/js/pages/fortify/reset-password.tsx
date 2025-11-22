import { useForm } from '@inertiajs/react';
import React from "react";
import { CardBody } from '@/components/card';
import { Input } from '@/components/input';
import { Fieldset } from '@/components/fieldset';
import { Label } from '@/components/label';
import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { Link } from '@/components/link';
import CardLayout from "@/layouts/CardLayout";
import { useLaravelReactI18n } from "laravel-react-internationalization";

interface ResetPasswordProps {
    email: string;
    token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ email, token }) => {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const { t } = useLaravelReactI18n();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <CardBody>
            <h1 className="text-xl font-bold">
                {t('auth.reset-password')}
            </h1>
            <p className="text-base-content/70">
                {t('auth.reset-enter-new-password')}
            </p>

            <form onSubmit={handleSubmit}>
                <Fieldset className="w-full">
                    <Label>{t('auth.email')}</Label>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        colorVariant={errors.email ? 'error' : 'default'}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        required
                    />
                    {errors.email && (<Label variant="error">
                        {errors.email}
                    </Label>)}

                    <Label>{t('auth.password-name')}</Label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        colorVariant={errors.password ? 'error' : 'default'}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        required
                    />
                    {errors.password && (<Label variant="error">
                        {errors.password}
                    </Label>)}

                    <Label>{t('auth.confirm-password')}</Label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        colorVariant={errors.password_confirmation ? 'error' : 'default'}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                        required
                    />
                    {errors.password_confirmation && (<Label variant="error">
                        {errors.password_confirmation}
                    </Label>)}
                </Fieldset>

                <Button
                    type="submit"
                    color="primary"
                    shape="block"
                    isLoading={processing}
                    disabled={processing}
                    className="mt-6"
                >
                    {processing ? t('auth.resetting-password') : t('auth.reset-password-button')}
                </Button>
            </form>

            <Divider>{t('auth.or').toUpperCase()}</Divider>

            <div className="space-y-2 text-center text-sm">
                <p className="text-base-content/70">
                    {t('auth.remembered-password') + ' '}
                    <Link
                        href="/login"
                        color="primary"
                        hover="onHover"
                        className="font-semibold"
                    >
                        {t('auth.return-to-login')}
                    </Link>
                </p>
            </div>
        </CardBody>
    );
}

// @ts-expect-error Layout property does exist
ResetPassword.layout = (page: React.ReactNode) => <CardLayout>{page}</CardLayout>;

export default ResetPassword;

