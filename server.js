const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const cors = require('cors');
const cookieParser = require('cookie-parser');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser()); // Enable cookie parsing
    app.use(cors()); // Enable CORS
    // Additional server configurations can be done here

    await app.listen(3800);
}
bootstrap();