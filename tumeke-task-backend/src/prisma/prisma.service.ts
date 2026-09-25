import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

// Query params may contain personal data, so SQL is not logged in production
const LOG_QUERIES = process.env.NODE_ENV !== 'production';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: LOG_QUERIES ? [{ emit: 'event', level: 'query' }] : [],
    });
  }

  async onModuleInit() {
    await this.$connect();
    if (LOG_QUERIES) {
      this.$on('query', (event: Prisma.QueryEvent) => {
        this.logger.debug(`${event.query} ${event.params}`);
      });
    }
  }
}
