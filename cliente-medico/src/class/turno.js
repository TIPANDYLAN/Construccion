class Turno {
    constructor(tur_id, pac_id, tur_fecha, tur_motivo, tur_estado) {
        this.tur_id = tur_id;
        this.pac_id = pac_id;
        this.tur_fecha = tur_fecha;
        this.tur_motivo = tur_motivo;
        this.tur_estado = tur_estado; // true = confirmado, false = cancelado
    }

    isConfirmed() {
        return this.tur_estado;
    }

    changeStatus(status) {
        this.tur_estado = status;
    }

    formatTurnDate() {
        const date = new Date(this.tur_fecha);
        return date.toLocaleString();
    }
}

export default Turno;
