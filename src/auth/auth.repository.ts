import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return !!user;
  }

  async checkNickname(nickname: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { nickname },
    });
    return !!user;
  }
}
