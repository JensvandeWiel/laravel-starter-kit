import { PageProps } from '@/types/global';

export default function Welcome({ auth }: PageProps) {
    return <>Welcome {auth ? auth.user?.name : 'Guest'}</>;
}
