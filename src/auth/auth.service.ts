import { ConflictException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async checkEmail(email: string): Promise<void> {
    if (await this.authRepository.checkEmail(email)) {
      throw new ConflictException('Email already exists');
    }
  }

  async checkNickname(email: string): Promise<void> {
    if (await this.authRepository.checkNickname(email)) {
      throw new ConflictException('Nickname already exists');
    }
  }

  async registerByEmail() {
    return 'registerByEmail';
  }
}
