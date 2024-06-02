import { Inmuebles } from "./inmuebles.interface";
import { Usuario } from "./usarios.interface";

export interface UsersResponse {
    data: Usuario[];
    id: string;
    displayName?: string | null;
    version: number;
}

export interface InmueblesResponse {
    data: Inmuebles[];
    id: string;
    displayName: string | null;
    version: number;
}