interface Config {
  port: number;
  corsOrigin: string;
  emailConfig: {
    host: string;
    port: number;
    secure: boolean;
    maxConnections: number;
    maxMessages: number;
    socketTimeout: number;
  };
}

const development: Config = {
  port: 3001,
  corsOrigin: 'http://localhost:5173',
  emailConfig: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    maxConnections: 3,
    maxMessages: 100,
    socketTimeout: 30000
  }
};

const production: Config = {
  port: Number(process.env.PORT) || 3001,
  corsOrigin: process.env.CORS_ORIGIN || 'https://kanandamimos.com.br', // Ajuste para seu domínio
  emailConfig: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    maxConnections: 5,
    maxMessages: 200,
    socketTimeout: 60000
  }
};

const config = process.env.NODE_ENV === 'production' ? production : development;

export default config; 