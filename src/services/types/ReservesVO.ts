
export type ReserveVO = {
    id_reserva: string,
    fk_livro: string,
    fk_membro: string,
    data_reserva: string,
    data_retirada: string,
    status_reserva: boolean,
    status_retirada: boolean,
}