import { type HeadersFunction, type LoaderFunctionArgs, json } from '@remix-run/node';

export const headers: HeadersFunction = () => ({
    'Cache-Control': 'public, max-age=60, s-maxage=3600',
    'No-Way': 'wesp',
});

export async function loader({ params }: LoaderFunctionArgs) {
    const response = await fetch(`https://swapi.py4e.com/api/films/${params.filmId}/`);
    return json(await response.json());
}
