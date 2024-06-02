import { Usuario } from "./usarios.interface";

export interface ApiResponse {
    data: Usuario[];
    id: string;
    displayName?: string | null;
    version: number;
}