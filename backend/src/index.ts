// import moduleAlias from 'module-alias';
// import 'module-alias/register';
// moduleAlias.addAliases({ '@': __dirname });
// require('module-alias/register');

import express, { Application } from 'express';
import { AppDataSource } from './data-source';
import { config } from './config';
import { InitializeApp } from './initializeApp';

/* AppDataSource.initialize()
  .then(async () => {})
  .catch(error => console.log(error));

// create and setup express app
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

// start express server
const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`Express server has started on port ${PORT}. Open http://localhost:8000`);
}); */

class Server {
  public app: Application;

  constructor() {
    this.app = express();
  }

  public async start(): Promise<void> {
    console.info(`Starting...`);

    try {
      console.info('Configuring...');
      // console.log(config);

      // logger.info(`Initializing database...`);
      await AppDataSource.initialize();

      console.info(`Configuring routes...`);
      await new InitializeApp({ app: this.app });
      await this.listen();
    } catch (err) {
      console.error('Error: %o', err);
    }
  }

  private async listen(): Promise<void> {
    const PORT = config.app.port;
    this.app.listen(PORT, () => {
      console.log(
        `Express server has started on port ${PORT}. Open http://localhost:8000`,
      );
    });
  }
}

new Server().start();
