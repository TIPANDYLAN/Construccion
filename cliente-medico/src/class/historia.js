class Historia {
    constructor(his_id, pac_id, his_fecha, his_descripcion, his_observacion = null) {
        this.his_id = his_id;
        this.pac_id = pac_id;
        this.his_fecha = his_fecha;
        this.his_descripcion = his_descripcion;
        this.his_observacion = his_observacion;
    }

    getSummary() {
        return `${this.his_fecha}: ${this.his_descripcion.substring(0, 50)}...`;
    }

    addObservation(observation) {
        this.his_observacion = observation;
    }
}

export default Historia;
