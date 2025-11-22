declare namespace App.Data {
    export type UserData = {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        password: string;
        remember_token: string | null;
        created_at: string;
        updated_at: string;
    };
}
declare namespace App.Data.Inertia {
    export type InertiaAuthData = {
        user: App.Data.UserData | null;
    };
    export type InertiaSharedData = {
        auth: App.Data.Inertia.InertiaAuthData | null;
        errors:
            | object
            | { [key: string]: object }
            | { [key: string]: string }
            | { [key: string]: { [key: string]: string } };
        locale: string;
        fallbackLocale: string;
    };
}
