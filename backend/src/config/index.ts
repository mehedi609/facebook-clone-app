import 'dotenv/config';

const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(`Couldn't find environment variable: ${environmentVariable}`);
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  app: {
    appName: 'thx-api',
    debug: false,
    env: getEnvironmentVariable('NODE_ENV'),
    production: getEnvironmentVariable('NODE_ENV') === 'production',
    port: getEnvironmentVariable('APP_PORT'),
  },
  logger: {
    level: 'silly',
  },
  jwt: {
    secret: getEnvironmentVariable('JWT_SECRET'),
    defaultExpiresIn: '3d',
  },
  database: {
    host: getEnvironmentVariable('DB_HOST'),
    port: parseInt(getEnvironmentVariable('DB_PORT'), 10),
    username: getEnvironmentVariable('DB_USER'),
    password: getEnvironmentVariable('DB_PASSWORD'),
    database: getEnvironmentVariable('DB_NAME'),
  },
  oAuth: {
    baseUrl: getEnvironmentVariable('BASE_URL'),
    senderEmail: getEnvironmentVariable('SENDER_EMAIL'),
    oAuthClientId: getEnvironmentVariable('OAUTH_CLIENT_ID'),
    oAuthClientSecret: getEnvironmentVariable('OAUTH_CLIENT_SECRET'),
  },
  mailer: {
    baseUrl: getEnvironmentVariable('BASE_URL'),
    EMAIL: getEnvironmentVariable('MAILER_EMAIL'),
    host: getEnvironmentVariable('MAILER_HOST'),
    port: getEnvironmentVariable('MAILER_PORT'),
    user: getEnvironmentVariable('MAILER_USER'),
    pass: getEnvironmentVariable('MAILER_PASSWORD'),
  },
};
