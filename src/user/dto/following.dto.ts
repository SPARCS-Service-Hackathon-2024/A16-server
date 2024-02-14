import { Expose } from 'class-transformer';

export class FollowingDto {
  @Expose()
  id: string;
  @Expose()
  followingId: string;
  @Expose()
  userId: string;
}
