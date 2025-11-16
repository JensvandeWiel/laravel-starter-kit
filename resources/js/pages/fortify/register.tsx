import { useForm } from '@inertiajs/react';
import React from "react";
import { Card, CardBody } from '@/components/card';
import { Input } from '@/components/input';
import { Fieldset } from '@/components/fieldset';
import { Label } from '@/components/label';
import { Checkbox } from '@/components/checkbox';
import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { Link } from '@/components/link';
import CardLayout from "@/layouts/CardLayout";

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <CardBody>
            <h1 className="text-xl font-bold">
                Create your account
            </h1>
            <p className="text-base-content/70">
                Enter your details below to create a new account
            </p>
            <form onSubmit={handleSubmit}>
                <Fieldset className="w-full">
                    <Label>Name</Label>
                    <Input
                        type="text"
                        placeholder="John Doe"
                        colorVariant={errors.name ? 'error' : 'default'}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        required
                    />
                    {errors.name && (
                        <Label variant="error">
                            {errors.name}
                        </Label>
                    )}

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
                    {errors.email && (
                        <Label variant="error">
                            {errors.email}
                        </Label>
                    )}

                    <Label>Password</Label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        colorVariant={errors.password ? 'error' : 'default'}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        required
                    />
                    {errors.password && (
                        <Label variant="error">
                            {errors.password}
                        </Label>
                    )}

                    <Label>Confirm Password</Label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        colorVariant={errors.password_confirmation ? 'error' : 'default'}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                        required
                    />
                    {errors.password_confirmation && (
                        <Label variant="error">
                            {errors.password_confirmation}
                        </Label>
                    )}

                    <Label className={"mt-2"}>
                        <Checkbox
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            disabled={processing}
                            color="primary"
                        />
                        <span className="label-text">
                                        I agree to the{' '}
                            <Link
                                href="/terms"
                                color="primary"
                                hover="onHover"
                                className="font-semibold"
                            >
                                            terms and conditions
                                        </Link>
                                    </span>
                    </Label>
                    {errors.terms && (
                        <Label variant="error">
                            {errors.terms}
                        </Label>
                    )}
                </Fieldset>

                <Button
                    type="submit"
                    color="primary"
                    shape="block"
                    isLoading={processing}
                    disabled={processing}
                    className="mt-6"
                >
                    {processing ? 'Creating account...' : 'Sign Up'}
                </Button>
            </form>

            <Divider>OR</Divider>

            <div className="space-y-2 text-center text-sm">
                <p className="text-base-content/70">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        color="primary"
                        hover="onHover"
                        className="font-semibold"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </CardBody>
    );
};

Register.layout = (page: React.ReactNode) => <CardLayout>{page}</CardLayout>;

export default Register;
