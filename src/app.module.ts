import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { databaseConfig, jwtConfig, userConfig } from './common/configs';

@Module({
  imports: [
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req })
    }),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
      load: [
        databaseConfig,
        userConfig,
        jwtConfig,
      ]
    })
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
