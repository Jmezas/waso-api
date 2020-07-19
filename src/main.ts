import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

// import * as csurf from 'csurf';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;
  app.setGlobalPrefix('/api/v1');
  const options = new DocumentBuilder()
    .setTitle('Work and Service Orders - WASO')
    .setDescription(
      'We are the solution for your company, taking into account the cost-benefit, the latest in implementation technology and the trained personnel to offer you the necessary consulting.',
    )
    .setVersion('1.0')
    .addTag('Orders', 'Everything related users.')
    .addTag('Users', 'Everything related users.')
    .addTag('Administration', 'Everything related users.')
    .addTag('Authentication', 'Everything related users.')
    .setTermsOfService('https://www.realsoft.dev/terms/')
    .setExternalDoc('Full documentation', 'https://waso.realsoft.dev/api/docs/')
    .setContact(
      'Real Software Solutions',
      'https://waso.realsoft.dev/api/v1/',
      'support@realsoft.dev',
    )
    .build();
  let css: string;
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/v1/docs', app, document, {
    explorer: false,
    // customCss: css,
    customfavIcon: '../../images/favicon.ico',
    customSiteTitle: 'WASO - Real Software Solutions',
  });

  app.use(compression());
  app.use(helmet());
  app.enableCors();
  // app.use(csurf());
  /* app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  ); */

  await app.listen(port);
  Logger.log(
    `Server started running on http://localhost:${port}/api/v1/`,
    'Bootstrap',
  );
  Logger.log(
    `If you want to test, go to the docs. of our REST API http://localhost:${port}/api/v1/docs/`,
    'BootstrapDocs',
  );
}
bootstrap();
