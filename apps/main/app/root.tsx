import { type LinksFunction, type MetaFunction } from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import tailwindStyleSheetUrl from './styles/tailwind.css?url'

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
	].filter(Boolean)
}

export const meta: MetaFunction = ({ data }) => {
	return [
		{ title: data ? '{App name}' : 'Error | {App name}' },
		{ name: 'description', content: '{App description}' },
	]
}

function Document({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`h-full overflow-x-hidden`}>
			<head>
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Links />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return (
		<Document>
			<div className="flex h-screen flex-col justify-between">
				<Outlet />
			</div>
		</Document>
	)
}

export function ErrorBoundary() {
	// NOTE: you cannot use useLoaderData in an ErrorBoundary because the loader
	// likely failed to run so we have to do the best we can.
	// We could probably do better than this (it's possible the loader did run).
	// This would require a change in Remix.

	// Just make sure your root route never errors out and you'll always be able
	// to give the user a better UX.

	return (
		<Document>
			<GeneralErrorBoundary />
		</Document>
	)
}
