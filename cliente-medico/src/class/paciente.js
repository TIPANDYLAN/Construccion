class Paciente {
    constructor(pac_id, pac_nombre, pac_apellido, pac_cedula, pac_nacimiento, pac_telefono = null, pac_email = null, pac_direccion = null) {
        this.pac_id = pac_id;
        this.pac_nombre = pac_nombre;
        this.pac_apellido = pac_apellido;
        this.pac_cedula = pac_cedula;
        this.pac_nacimiento = pac_nacimiento;
        this.pac_telefono = pac_telefono;
        this.pac_email = pac_email;
        this.pac_direccion = pac_direccion;
    }

    getFullName() {
        return `${this.pac_nombre} ${this.pac_apellido}`;
    }

    isContactable() {
        return this.pac_telefono || this.pac_email;
    }
}

export default Paciente;
