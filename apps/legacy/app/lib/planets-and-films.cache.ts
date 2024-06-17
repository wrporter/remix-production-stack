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

export interface Planet {
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

export interface PlanetResponse {
    previous: string;
    next: string;
    count: number;
    results: Planet[];
}

export const planetCache: Record<string, PlanetResponse> = {};
export const filmCache: Record<string, FilmData> = {};
