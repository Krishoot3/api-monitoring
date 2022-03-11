import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { HealthcheckModule } from './api/healthcheck/healthcheck.module';
import { ApiProjectModule } from './api/api-project/api-project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found.filter';
import { AuthService } from './api/auth/auth.service';
import { ApiProjectController } from './api/api-project/api-project.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    HealthcheckModule,
    ApiProjectModule,
    RavenModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor(),
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthService)
      .exclude({ path: 'api/project/(.*)', method: RequestMethod.GET })
      .forRoutes(ApiProjectController);
  }
}
