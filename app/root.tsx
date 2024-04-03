import { NextUIProvider } from '@nextui-org/react';
import { type LinksFunction, type MetaFunction } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useNavigate,
} from '@remix-run/react';
import tailwindStyleSheetUrl from '~/tailwind.css?url';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: tailwindStyleSheetUrl }];
};

export const meta: MetaFunction = () => [
    { charset: 'utf-8' },
    { title: 'Remix' },
    { viewport: 'width=device-width,initial-scale=1' },
];

export default function App() {
    const navigate = useNavigate();

    return (
        <html lang="en" className="h-full">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                <NextUIProvider className="h-full" navigate={navigate}>
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </NextUIProvider>
            </body>
        </html>
    );
}
