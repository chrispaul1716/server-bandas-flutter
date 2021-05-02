const Banda = require("./band");

class Bandas {

    constructor() {
        this.bandas = [];
    }

    agregarBanda(banda = new Banda()) {
        this.bandas.push(banda);
    }

    listarBandas() {
        return this.bandas;
    }

    eliminarBanda(id = '') {
        this.bandas = this.bandas.filter(banda => banda.id !== id);
        return this.bandas;
    }

    votoBanda(id = '') {
        this.bandas = this.bandas.map(banda => {

            if (banda.id === id) {
                banda.votos++;
                return banda;
            } else {
                return banda;
            }
        });
    }

}

module.exports = Bandas;