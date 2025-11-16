import { PageProps } from '@/types/global';
import {router} from "@inertiajs/react";

export default function Welcome({ auth }: PageProps) {
    return <>Welcome {auth ? auth.user?.name : 'Guest'}

        {
            auth ? <button onClick={() => router.post('logout')}>logout</button> : null
        }
    </>;
}
