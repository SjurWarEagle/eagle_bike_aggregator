import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Start} from "./start";
import {config} from 'dotenv';

config();

async function bootstrap() {
    new Start().start();

    const port =42544;

    const app = await NestFactory.create(AppModule);
    app.enableCors({origin: '*'});

    await app.listen(port);

}

bootstrap().then(()=>{
});
