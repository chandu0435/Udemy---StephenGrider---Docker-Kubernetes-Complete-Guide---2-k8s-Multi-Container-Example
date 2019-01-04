import { createClient, RedisClient } from "redis";
import { redisHost, redisPort } from './keys';

const redisClient: RedisClient = createClient({
    host: redisHost,
    port: redisPort,
    // wait 1 seconds between retying connection
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fibonacci(index: number): number {
    if (index < 2) return 1;
    return (index - 1) + fibonacci(index - 2);
}

sub.on('message', (channel: string, message: string) => {
    redisClient.hset(
        'values',
        message,
        fibonacci(parseInt(message)).toString()
    );
});

sub.subscribe('insert');
