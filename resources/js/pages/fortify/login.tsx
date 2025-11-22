import {useForm} from '@inertiajs/react';
import React from "react";
import {CardBody} from '@/components/card';
import {Input} from '@/components/input';
import {Fieldset} from '@/components/fieldset';
import {Label} from '@/components/label';
import {Checkbox} from '@/components/checkbox';
import {Button} from '@/components/button';
import {Divider} from '@/components/divider';
import {Link} from '@/components/link';
import CardLayout from "@/layouts/CardLayout";
import {useLaravelReactI18n} from "laravel-react-internationalization";

const Login = () => {
    const {data, setData, post, processing, errors} = useForm({
        email: '', password: '', remember: false,
    });

    const {t,} = useLaravelReactI18n();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/login');
    };

    return (<CardBody>
        <h1 className="text-xl font-bold">
            {t('auth.login-to-your-account')}
        </h1>
        <p className="text-base-content/70">
            {t('auth.login-enter-credentials')}
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
                <Label className={"mt-2"}>
                    <Checkbox
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        disabled={processing}
                        color="primary"
                    />
                    <span className="label-text">
                            {t('auth.remember-me')}
                        </span>
                </Label>
            </Fieldset>

            <Button
                type="submit"
                color="primary"
                shape="block"
                isLoading={processing}
                disabled={processing}
                className="mt-6"
            >
                {processing ? t('auth.signing-in') : t('auth.sign-in')}
            </Button>
        </form>

        <Divider>{t('auth.or').toUpperCase()}</Divider>

        <div className="space-y-2 text-center text-sm">
            <p className="text-base-content/70">
                {t('auth.dont-have-account') + ' '}
                <Link
                    href="/register"
                    color="primary"
                    hover="onHover"
                    className="font-semibold"
                >
                    {t('auth.create-account')}
                </Link>
            </p>
            <p>
                <Link
                    href="/forgot-password"
                    color="primary"
                    hover="onHover"
                    className="text-xs font-semibold"
                >
                    {t('auth.forgot-your-password')}
                </Link>
            </p>
        </div>
    </CardBody>);
}

Login.layout = (page: React.ReactNode) => <CardLayout>{page}</CardLayout>;

export default Login;
