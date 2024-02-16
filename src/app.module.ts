import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { envs } from './config/plugins/envs.plugin';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [envs] }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      path: 'api/v1/graphql',
      context: ({ req }) => {
        const token = req.headers.authorization?.replace(/[Bb]earer\s?/g, '');
        if (!token) throw Error('Token needed');
      },
      formatError: (error: any) => {
        const { message, path, extensions } = error;
        const formattedError = {
          message,
          path,
          error: extensions.originalError || extensions.exception,
          timestamp: new Date().toISOString(),
        };
        return formattedError;
      },
    }),

    PrismaModule,

    UsersModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
