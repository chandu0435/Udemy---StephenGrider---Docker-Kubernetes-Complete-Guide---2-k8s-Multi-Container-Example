import express, { Application, Request, Response, Send } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Pool, QueryResult } from 'pg';
import { pgUser, pgHost, pgDatabase, pgPort, pgPassword, redisHost, redisPort } from './keys';
import { createClient } from 'redis';

// Express App Setup

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

// Postgres Setup

const pgClient = new Pool({
    user: pgUser,
    host: pgHost,
    database: pgDatabase,
    password: pgPassword,
    port: pgPort
});

pgClient.on(
    'error',
    () => console.log('Lost PG connection')
);

pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err));

// Redis Client Setupp

const redisClient = createClient({
    host: redisHost,
    port: redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// Express route handlers

app.get(
    '/',
    (req: Request, res: Response): void => {
        res.send('Hi');
    }
);

app.get(
    '/values/all',
    async (req: Request, res: Response): Promise<void> => {
        const values: QueryResult = await pgClient.query('SELECT * from values');
        res.send(values.rows);
    }
);

app.get(
    '/values/current',
    async (req: Request, res: Response): Promise<void> => {
        redisClient.hgetall('values', (err, values) => {
            res.send(values);
        });
    }
);

app.post(
    '/values',
    async (req: Request, res: Response): Promise<Response | void> => {
        const index = req.body.index;

        if (parseInt(index) > 40) {
            return res.status(422).send('Index too high');
        }

        redisClient.hset('values', index, 'Nothing yet!');
        redisPublisher.publish('insert', index);
        pgClient.query('INSERT INTO values(number) VALUES($1))', [index]);

        res.send({ working: true });
    }
);

app.listen(5000, (err: Error) => {
    console.log('Listening on port 5000');
    if (err) {
        throw err;
    }
});
