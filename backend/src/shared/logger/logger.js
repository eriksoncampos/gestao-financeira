const pino = require('pino');
const pinoHttp = require('pino-http');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const logLevel = process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug');

// Aponta para a pasta 'logs' na RAIZ do backend (ex: backend/logs)
const logsDir = path.join(process.cwd(), 'logs');

const targets = [];

if (!isProduction) {
  // Desenvolvimento: mostra no terminal colorido
  targets.push({
    target: require.resolve('pino-pretty'),
    level: 'debug',
    options: {
      colorize: true,
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
    },
  });
} else {
  // Produção 1: Todos os logs (info, warn, error, fatal) com rotação diária
  targets.push({
    target: require.resolve('pino-roll'),
    level: 'info',
    options: {
      file: path.join(logsDir, 'app'), // Gera app.2026-11-15.1.log
      frequency: 'daily',              // Cria um arquivo novo todo dia
      mkdir: true,                     // Cria a pasta 'logs' automaticamente
      limit: {
        count: 14,                     // Mantém apenas os últimos 14 dias de log
      },
    },
  });

  // Produção 2: Apenas erros (error e fatal) em arquivo separado
  targets.push({
    target: require.resolve('pino-roll'),
    level: 'error',
    options: {
      file: path.join(logsDir, 'error'), // Gera error.2026-11-15.1.log
      frequency: 'daily',
      mkdir: true,
      limit: {
        count: 30,                       // Mantém erros por 30 dias
      },
    },
  });
}

const logger = pino({
  level: logLevel,
  transport: {
    targets,
  },
});

const httpLogger = pinoHttp({
  logger,
  customSuccessMessage: (req, res) => `${req.method} ${req.url} - Status ${res.statusCode}`,
  customErrorMessage: (req, res, err) => `${req.method} ${req.url} - Erro ${res.statusCode}: ${err.message}`,
});

module.exports = { logger, httpLogger };
