import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Digitalisation Auto-Écoles Gabon')
    .setDescription(
      'API de gestion nationale des auto-écoles, candidats et examens.',
    )
    .setVersion('2.0')
    .addTag('Candidats')
    .addTag('AutoEcoles')
    .addTag('Auth')
    .addTag('Utilisateurs')
    .addTag('Paiements')
    .addTag('Examens')
    .addTag('Stats')
    .addTag('Moniteurs')
    .addTag('Vehicules')
    .addTag('Inspections')
    .addTag('Audit')
    .addBearerAuth() // Support du token JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => console.error(err));
