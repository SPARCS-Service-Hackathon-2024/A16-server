import { ApiProperty } from '@nestjs/swagger';

export class PlaceSearchDto {
  @ApiProperty()
  readonly keyword: string;
}
