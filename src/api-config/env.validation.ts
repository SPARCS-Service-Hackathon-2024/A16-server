import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  KAKAO_API_KEY: string;

  @IsString()
  @IsUrl({ require_tld: false })
  KAKAO_REDIRECT_URL: string;

  @IsString()
  MAILER_TRANSPORT: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  KAKAO_API_SECRET: string;

  @IsString()
  MINIO_ENDPOINT: string;

  @IsNumberString()
  MINIO_PORT: string;

  @IsString()
  MINIO_ACCESS_KEY: string;

  @IsString()
  MINIO_SECRET_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
