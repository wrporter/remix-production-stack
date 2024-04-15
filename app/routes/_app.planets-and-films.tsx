import {
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import { type HeadersFunction, type LoaderFunctionArgs, defer } from '@remix-run/node';
import { Await, useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
import { Suspense } from 'react';
import {
    type FilmData,
    type PlanetResponse,
    filmCache,
    planetCache,
} from '~/lib/planets-and-films.cache.ts';

export const headers: HeadersFunction = () => ({
    'Cache-Control': 'public, max-age=60, s-maxage=3600',
});

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') ?? '1';

    let planetResponse:
        | { planetResponse: PlanetResponse; filmCache: typeof filmCache }
        | Promise<{ planetResponse: PlanetResponse; filmCache: typeof filmCache }>;

    if (planetCache[page]) {
        planetResponse = { planetResponse: planetCache[page], filmCache };
    } else {
        planetResponse = fetch(`https://swapi.py4e.com/api/planets?page=${page}`).then((response) =>
            response.json().then(async (data) => {
                const planetResponse = data as PlanetResponse;

                await Promise.all(
                    [
                        ...planetResponse.results
                            .reduce((filmUrls, planet) => {
                                if (planet.films.length > 0) {
                                    filmUrls.add(planet.films[0]);
                                }
                                return filmUrls;
                            }, new Set<string>())
                            .keys(),
                    ].map(async (filmUrl) => {
                        if (filmCache[filmUrl]) {
                            return filmCache[filmUrl];
                        }
                        const response = await fetch(filmUrl);
                        filmCache[filmUrl] = (await response.json()) as FilmData;
                        return filmCache[filmUrl];
                    }),
                );

                planetCache[page] = planetResponse;
                return { planetResponse: planetCache[page], filmCache };
            }),
        );
    }

    return defer(
        { data: planetResponse },
        {
            headers: {
                'Cache-Control': 'public, max-age=60, s-maxage=3600',
            },
        },
    );
}

export default function Index() {
    const { data } = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const page = Number.parseInt(searchParams.get('page') || '1', 10);

    return (
        <div className="w-96 m-4">
            <Suspense fallback={<Spinner />}>
                <Await resolve={data}>
                    {({
                        planetResponse: { results: planets, next, previous, count },
                        filmCache,
                    }) => (
                        <Table
                            bottomContent={
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        showControls
                                        page={page}
                                        total={Math.ceil(count / 10)}
                                        onChange={(page) => navigate(`?page=${page}`)}
                                    />
                                </div>
                            }
                        >
                            <TableHeader>
                                <TableColumn>Planet</TableColumn>
                                <TableColumn>First Film Appearance</TableColumn>
                            </TableHeader>

                            <TableBody>
                                {planets.map(({ url, name, films }) => (
                                    <TableRow key={url}>
                                        <TableCell>{name}</TableCell>
                                        <TableCell>
                                            <Film film={filmCache[films[0]]} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Await>
            </Suspense>
        </div>
    );
}

export function Film({ film }: { film: FilmData }) {
    return <div>{film?.title ? film.title : 'N/A'}</div>;
}
