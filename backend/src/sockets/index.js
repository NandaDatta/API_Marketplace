let io;

const initializeSocket = (server) => {
    const { Server } = require('socket.io');

    io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log(`Connected: ${socket.id}`);

        require('./chat.socket')(
            io,
            socket
        );

        require('./usage.socket')(
            io,
            socket
        );

        socket.on('disconnect', () => {
            console.log(`Disconnectes: ${socket.id}`);
        });
    });

    return io;
};

const getIO = () => io;

module.exports = {
    initializeSocket,
    getIO
}