import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const RECORD_NOT_FOUND_CODE = 'P2025';

export function rethrowNotFound(entity: string, id: number) {
  return (error: Error): never => {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === RECORD_NOT_FOUND_CODE
    ) {
      throw new NotFoundException(`${entity} with id ${id} not found`);
    }
    throw error;
  };
}
