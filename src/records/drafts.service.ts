import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDraftDto,
  UpdateDraftDto,
  DeleteDraftDto,
  GetDraftDto,
} from './dto';

@Injectable()
export class DraftsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDraftDto, userId: string) {
    const { body } = dto;
    const userDrafts = await this.prisma.draft.findMany({
      where: {
        creatorId: userId,
      },
    });

    if (userDrafts.length >= 5) {
      throw new NotAcceptableException('You cannot add more than 5 drafts');
    }
    const draft = await this.prisma.draft
      .create({
        data: {
          body: JSON.stringify(body),
          creator: {
            connect: {
              id: userId,
            },
          },
        },
        select: {
          body: true,
          createdAt: true,
          id: true,
          creatorId: true,
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
            },
          },
        },
      })

      .catch((error) => {
        throw error;
      });
    return draft;
  }

  async getOne(dto: GetDraftDto) {
    const { id } = dto;
    const draft = await this.prisma.draft
      .findUnique({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw error;
      });
    if (!draft) {
      throw new NotFoundException();
    }
    return draft;
  }

  async getAll(userId: string) {
    const drafts = this.prisma.draft.findMany({
      where: {
        creatorId: userId,
      },
    });
    return drafts;
  }
  update(dto: UpdateDraftDto) {
    const { id, body } = dto;
    const draft = this.prisma.draft
      .update({
        where: {
          id,
        },
        data: {
          body: JSON.stringify(body),
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new NotFoundException(error.meta.cause);
          }
        }
        throw error;
      });
    if (!draft) {
      throw new NotFoundException();
    }
    return draft;
  }

  async delete(dto: DeleteDraftDto) {
    const { id } = dto;
    const draft = await this.prisma.draft
      .delete({
        where: {
          id,
        },
        select: {
          id: true,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new NotFoundException(error.meta.cause);
          }
        }
        throw error;
      });
    if (!draft) {
      throw new NotFoundException();
    }
    return draft;
  }
}
