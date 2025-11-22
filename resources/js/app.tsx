import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { LaravelReactI18nProvider } from 'laravel-react-internationalization';

const appName =
    globalThis.document.getElementsByTagName('title')[0].innerText || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // @ts-expect-error Strict typing issue with Inertia props
        root.render(<ProviderChain locale={props.initialPage.props.locale} fallbackLocale={props.initialPage.props.fallbackLocale}>
            <App {...props} />
        </ProviderChain>);
    },
    progress: {
        color: '#4B5563',
    },
});


const ProviderChain = ({ children, locale, fallbackLocale }: { children: React.ReactNode, locale: string, fallbackLocale: string }) => {
    return <React.StrictMode>
        <LaravelReactI18nProvider locale={locale} fallbackLocale={fallbackLocale} files={import.meta.glob('/lang/*.json', { eager: true })}>
            {children}
        </LaravelReactI18nProvider>
    </React.StrictMode>;
}
