import type { PageProps } from '@/types/global';
import { usePage } from '@inertiajs/react';

export function useTypedPageProps<
    T extends Record<never, never> | unknown[] =
        | Record<never, never>
        | unknown[],
>() {
    // @ts-expect-error TS2322 - We are asserting that the return type is PageProps<T>
    return usePage<PageProps<T>>();
}
