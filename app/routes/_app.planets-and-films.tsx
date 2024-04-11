import { type LoaderFunctionArgs, defer } from '@remix-run/node';
import { Await, NavLink, useFetcher, useLoaderData, useSearchParams } from '@remix-run/react';
import { Suspense, useEffect } from 'react';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    const response = fetch(`https://swapi.py4e.com/api/planets${page ? `?page=${page}` : ''}`).then(
        (response) => response.json(),
    );
    return defer({ planetResponse: response as Promise<PlanetResponse> });
}

export default function Index() {
    const { planetResponse } = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;

    return (
        <div className="w-96 m-4">
            <Suspense fallback="Loading...">
                <Await resolve={planetResponse}>
                    {({ results: planets, next, previous }) => {
                        return (
                            <>
                                <table className="border-collapse table-auto w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                Planet
                                            </th>
                                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                First Film Appearance
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white dark:bg-slate-800">
                                        {planets.map(({ url, name, films }) => (
                                            <tr key={url}>
                                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                                    {name}
                                                </td>
                                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                                    {films.length === 0 ? (
                                                        <div>N/A</div>
                                                    ) : (
                                                        <Film url={films[0]} />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="flex justify-between items-center mt-2">
                                    {previous ? (
                                        <NavLink to={`?page=${getPage(previous)}`}>
                                            {'< Previous'}
                                        </NavLink>
                                    ) : (
                                        'N/A'
                                    )}

                                    <div>{page}</div>

                                    {next ? (
                                        <NavLink to={`?page=${getPage(next)}`}>{'Next >'}</NavLink>
                                    ) : (
                                        'N/A'
                                    )}
                                </div>
                            </>
                        );
                    }}
                </Await>
            </Suspense>
        </div>
    );
}

function getPage(url: string) {
    return new URL(url).searchParams.get('page');
}

export interface FilmData {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[]; // urls
    planets: string[]; // urls
    starships: string[]; // urls
    vehicles: string[]; // urls
    species: string[]; // urls
    created: string;
    edited: string;
    url: string;
}

interface Planet {
    name: string;
    films: string[]; // urls

    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[]; // urls
    created: string;
    edited: string;
    url: string;
}

interface PlanetResponse {
    previous: string;
    next: string;
    count: number;
    results: Planet[];
}

const filmUrlRegex = /https:\/\/swapi\.py4e\.com\/api\/films\/(\d+)\//;

export function Film({ url }: { url: string }) {
    const fetcher = useFetcher<FilmData>();

    useEffect(() => {
        const match = filmUrlRegex.exec(url);
        const filmId = match?.[1];
        fetcher.load(filmId as string);
    }, []);

    return <div>{fetcher.data ? fetcher.data.title : 'Loading...'}</div>;
}
