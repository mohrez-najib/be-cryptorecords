import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContractDto, UpdateContractDto, GetContractDto } from './dto';
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
                  email: true,
                  username: true,
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
                  email: true,
                  username: true,
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
    const contracts = this.prisma.contract.findMany({
      where: {
        creatorId: userId,
      },
    });
    return contracts;
  }
  async getAllPartiesContract(userId: string) {
    const contracts = this.prisma.party.findMany({
      where: {
        personId: userId,
      },
      include: {
        contract: true,
      },
    });
    return contracts;
  }
  async getAllWitnessContract(userId: string) {
    const contracts = this.prisma.witness.findMany({
      where: {
        personId: userId,
      },
      include: {
        contract: true,
      },
    });
    return contracts;
  }
  async update(dto: UpdateContractDto, updaterId: string) {
    const { id, body, parties, witnesses, isActive } = dto;
    if (parties.length === 0) {
      throw new ForbiddenException('Contract must have at least one party');
    }
    const {
      creatorId,
      status,
      isActive: currentActivationStatus,
    } = await this.prisma.contract.findUnique({
      where: {
        id,
      },
    });
    if (creatorId !== updaterId) {
      throw new UnauthorizedException(
        'Only the contract creator has permission to update',
      );
    }
    if (status !== EContractStatus.PENDING_SIGN) {
      throw new ForbiddenException('This contract cannot be updated');
    }
    const contract = await this.prisma.contract
      .update({
        where: {
          id,
        },

        data: {
          isActive: isActive ?? currentActivationStatus,
          parties: {
            deleteMany: {
              personId: { in: parties.map(({ personId }) => personId) },
            },
            createMany: {
              data: parties.map((each) => {
                return { ...each, signedAt: each.signedAt || null };
              }),
            },
          },
          witnesses: {
            deleteMany: {
              personId: { in: witnesses.map(({ personId }) => personId) },
            },
            createMany: {
              data: witnesses.map((each) => {
                return { ...each, signedAt: each.signedAt || null };
              }),
            },
          },
          body: JSON.stringify(body),
        },
        include: {
          parties: {
            select: {
              personId: true,
              person: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                  username: true,
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
                  email: true,
                  username: true,
                },
              },
              signedAt: true,
              signRequired: true,
            },
          },
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
