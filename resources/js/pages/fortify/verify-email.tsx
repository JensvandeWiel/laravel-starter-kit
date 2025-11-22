import { useForm } from '@inertiajs/react';
import React from "react";
import { CardBody } from '@/components/card';
import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { Link } from '@/components/link';
import CardLayout from "@/layouts/CardLayout";
import { useLaravelReactI18n } from "laravel-react-internationalization";

interface VerifyEmailProps {
    status?: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ status }) => {
    const { post, processing } = useForm({});
    const { t } = useLaravelReactI18n();

    const handleResend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <CardBody>
            <h1 className="text-xl font-bold">
                {t('auth.verify-email')}
            </h1>
            <p className="text-base-content/70">
                {t('auth.verify-email-description')}
            </p>

            {status === 'verification-link-sent' && (
                <div className="alert alert-success mb-4">
                    <span>{t('auth.verification-link-sent')}</span>
                </div>
            )}

            <form onSubmit={handleResend}>
                <Button
                    type="submit"
                    color="primary"
                    shape="block"
                    isLoading={processing}
                    disabled={processing}
                    className="mt-6"
                >
                    {processing ? t('auth.sending') : t('auth.resend-verification-email')}
                </Button>
            </form>

            <Divider>{t('auth.or').toUpperCase()}</Divider>

            <div className="space-y-2 text-center text-sm">
                <p className="text-base-content/70">
                    {t('auth.need-new-email') + ' '}
                    <Link
                        href="/login"
                        method="post"
                        as="button"
                        color="primary"
                        hover="onHover"
                        className="font-semibold"
                    >
                        {t('auth.logout')}
                    </Link>
                </p>
            </div>
        </CardBody>
    );
}

// @ts-expect-error Layout property does exist
VerifyEmail.layout = (page: React.ReactNode) => <CardLayout>{page}</CardLayout>;

export default VerifyEmail;

