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
import {useLaravelReactI18n} from "laravel-react-internationalization";
import {useAlert} from "@/composables/use-alert";

const ForgotPassword = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const {t, loading} = useLaravelReactI18n();
    const alert = useAlert();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/forgot-password', {
            onSuccess: () => {
                alert.success(t('auth.reset-link-sent'));
            }
        });
    };

    return (
        <CardBody>
            <h1 className="text-xl font-bold">
                {t('auth.reset-password' )}
            </h1>
            <p className="text-base-content/70">
                {t('auth.reset-enter-credentials' )}
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
                </Fieldset>

                <Button
                    type="submit"
                    color="primary"
                    shape="block"
                    isLoading={processing}
                    disabled={processing}
                    className="mt-6"
                >
                    {processing ? t('auth.sending') : t('auth.send-reset-link')}
                </Button>
            </form>

            <Divider>{t('auth.or').toUpperCase()}</Divider>

            <div className="space-y-2 text-center text-sm">
                <p className="text-base-content/70">
                    {t('auth.remembered-password') +' '}
                    <Link
                        href="/login"
                        color="primary"
                        hover="onHover"
                        className="font-semibold"
                    >
                        {t('auth.return-to-login')}
                    </Link>
                </p>
                <p className="text-base-content/70">
                    {t('auth.dont-have-account') +' '}
                    <Link
                        href="/register"
                        color="primary"
                        hover="onHover"
                        className="font-semibold"
                    >
                        {t('auth.create-account')}
                    </Link>
                </p>
            </div>
        </CardBody>
    );
}

ForgotPassword.layout = (page: React.ReactNode) => <CardLayout>{page}</CardLayout>;

export default ForgotPassword;

