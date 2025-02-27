import { Movie } from "../Movie";

export interface List{
    id: string;
    name: string;
    description?: string;
    movies: Movie[] | [];
    created_at: string;
}