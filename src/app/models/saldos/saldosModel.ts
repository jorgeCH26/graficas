export interface Saldos{
    id: number;
    mes: string;
    postivos: number;
    negativos: number;
}

export interface IngresosRetiros{
    id: number;
    trimestre: string;
    ingreso: number;
    retiros: number;
}