import { Exclude, Expose } from 'class-transformer';

export class UserTagDto {
  @Expose()
  readonly name: string;

  @Exclude()
  readonly userId: string;
}
