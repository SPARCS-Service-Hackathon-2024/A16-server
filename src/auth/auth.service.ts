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

  async registerByEmail() {
    return 'registerByEmail';
  }
}
