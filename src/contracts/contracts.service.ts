import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateContractDto,
  UpdateDraftDto,
  DeleteDraftDto,
  GetContractDto,
} from './dto';
import { EContractStatus } from './types';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContractDto, userId: string) {
    const { body, parties, witnesses } = dto;
    const needAnySign = parties.filter((each) => each.signRequired).length > 0;
    const contract = await this.prisma.contract
      .create({
        data: {
          parties: {
            createMany: {
              data: parties.map((each) => {
                return { ...each, signedAt: null };
              }),
            },
          },
          witnesses: {
            createMany: {
              data: witnesses.map((each) => {
                return { ...each, signedAt: null };
              }),
            },
          },
          body: JSON.stringify(body),
          status: needAnySign
            ? EContractStatus.PENDING_SIGN
            : EContractStatus.PENDING_BLOCKCHAIN_CONFIRMATION,
          creator: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          parties: {
            select: {
              personId: true,
              person: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
              signedAt: true,
              signRequired: true,
            },
          },
          witnesses: {
            select: {
              personId: true,
              person: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
              signedAt: true,
              signRequired: true,
            },
          },
        },
      })

      .catch((error) => {
        console.log('error', error);

        throw error;
      });
    return contract;
  }

  async getOne(dto: GetContractDto) {
    const { id } = dto;
    const contract = await this.prisma.contract
      .findUnique({
        where: {
          id,
        },
        include: {
          parties: {
            include: {
              person: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          witnesses: {
            include: {
              person: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
        },
      })
      .catch((error) => {
        throw error;
      });
    if (!contract) {
      throw new NotFoundException();
    }
    return contract;
  }

  async getAllCreatedContract(userId: string) {
    const drafts = this.prisma.contract.findMany({
      where: {
        creatorId: userId,
      },
    });
    return drafts;
  }
  async getAllPartiesContract(userId: string) {
    const drafts = this.prisma.party.findMany({
      where: {
        personId: userId,
      },
      include: {
        contract: true,
      },
    });
    return drafts;
  }
  update(dto: UpdateDraftDto) {
    const { id, body } = dto;
    const contract = this.prisma.contract
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
    if (!contract) {
      throw new NotFoundException();
    }
    return contract;
  }

  async delete(dto: DeleteDraftDto) {
    const { id } = dto;
    const contract = await this.prisma.contract
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
    if (!contract) {
      throw new NotFoundException();
    }
    return contract;
  }
}
