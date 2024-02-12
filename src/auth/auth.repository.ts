import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

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

  async createUserByEmail({
    email,
    password,
    nickname,
  }: {
    email: string;
    password: string;
    nickname: string;
  }) {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
        provider: 'EMAIL',
      },
    });
    return user;
  }

  async findUserByEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.prismaService.user.findUnique({
      where: { email, provider: 'EMAIL' },
    });
    if (!user) return null;
    const result = await bcrypt.compare(password, user.password);
    if (!result) return null;
    return user;
  }

  async findUserById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user;
  }
}
