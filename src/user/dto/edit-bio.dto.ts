import { ApiProperty } from '@nestjs/swagger';

export class EditBioDto {
  @ApiProperty()
  bio: string;
}
