const { v4: uuidV4 } = require('uuid');

class Banda {

    constructor(nombre = 'sin-nombre') {
        this.id = uuidV4(); // identificador unico
        this.nombre = nombre;
        this.votos = 0;
    }
}

module.exports = Banda;