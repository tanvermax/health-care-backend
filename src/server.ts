import { Server } from 'http';
import app from './app';
import config from './config';

let server: Server;

async function bootstrap() {
    try {
        server = app.listen(config.port, () => {
            console.log(`🚀 Server is running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error('Error during server startup:', error);
        process.exit(1);
    }

    // Graceful shutdown
    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log('Server closed gracefully.');
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    const unexpectedErrorHandler = (error: Error) => {
        console.log('Unexpected error:', error);
        exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    // SIGTERM handling
    process.on('SIGTERM', () => {
        console.log('SIGTERM received');
        if (server) {
            server.close(() => {
                console.log('Server closed due to SIGTERM');
            });
        }
    });
}

bootstrap();