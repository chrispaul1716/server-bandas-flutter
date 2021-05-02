const { io } = require('../index');

const Banda = require('../models/band');
const Bandas = require('../models/bands');

const bandas = new Bandas();

bandas.agregarBanda(new Banda('Queen'));
bandas.agregarBanda(new Banda('Dors'));
bandas.agregarBanda(new Banda('Mchael Jackson'));
bandas.agregarBanda(new Banda('Nirvana'));

// console.log(bandas);

/* Mensajes de Sockets (client - dispositivo que se conecta)*/
/* Emitiendo y escuchando eventos desde el servidor */
/* on (escucha) - emit (emite) */
io.on('connection', client => {

    console.log('Cliente conectado');

    /* Emitir bandas al cliente */
    client.emit('bandas-activas', bandas.listarBandas());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    // client.on('emitir-mensaje', (payload) => {
    // console.log(payload);
    // io.emit('nuevo-mensaje', payload); //Emite a todos
    // client.broadcast.emit('nuevo-mensaje', payload); //Emite a todos menos el que emitio
    // });

    /* Incrementar votos */
    client.on('voto-banda', (payload) => {
        // console.log(payload);
        bandas.votoBanda(payload.id);

        io.emit('bandas-activas', bandas.listarBandas());
    });

    /* Crear banda */
    client.on('crear-banda', (payload) => {
        // console.log(payload);
        const nuevaBanda = new Banda(payload.nombre);
        bandas.agregarBanda(nuevaBanda);

        io.emit('bandas-activas', bandas.listarBandas());
    });

    /* Eliminar banda */
    client.on('eliminar-banda', (payload) => {
        // console.log(payload);
        bandas.eliminarBanda(payload.id);

        io.emit('bandas-activas', bandas.listarBandas());
    });
});