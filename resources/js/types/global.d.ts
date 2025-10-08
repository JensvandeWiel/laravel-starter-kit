import { PageProps as InertiaPageProps } from '@inertiajs/core';

export type PageProps<
    T extends Record<string, unknown> | unknown[] =
        | Record<string, unknown>
        | unknown[],
> = App.Data.Inertia.InertiaSharedData & T;

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
