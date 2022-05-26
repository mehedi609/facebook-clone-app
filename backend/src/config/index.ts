// import dotenv from 'dotenv';
//
// dotenv.config();
import 'dotenv/config';

const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`,
    );
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
};
