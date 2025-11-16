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

const ForgotPassword = () => {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        email: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <CardBody>
            <h1 className="text-xl font-bold">
                Reset your password
            </h1>
            <p className="text-base-content/70">
                Enter your email address and we'll send you a link to reset your password
            </p>

            {recentlySuccessful && (
                <div className="alert alert-success mb-4">
                    <span>Password reset link sent! Check your email.</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <Fieldset className="w-full">
                    <Label>Email</Label>
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
                    {processing ? 'Sending...' : 'Send Reset Link'}
                </Button>
            </form>

            <Divider>OR</Divider>

            <div className="space-y-2 text-center text-sm">
                <p className="text-base-content/70">
                    Remember your password?{' '}
                    <Link
                        href="/login"
                        color="primary"
                        hover="onHover"
                        className="font-semibold"
                    >
                        Back to login
                    </Link>
                </p>
                <p className="text-base-content/70">
                    Don't have an account?{' '}
                    <Link
                        href="/register"
                        color="primary"
                        hover="onHover"
                        className="font-semibold"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </CardBody>
    );
}

ForgotPassword.layout = (page: React.ReactNode) => <CardLayout>{page}</CardLayout>;

export default ForgotPassword;

