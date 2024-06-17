import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
    SESSION_SECRET: str(),
});
