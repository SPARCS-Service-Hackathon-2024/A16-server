import { ApiProperty } from '@nestjs/swagger';
import { Place } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

export class PlaceDto implements Place {
  @ApiProperty()
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  readonly region: string;

  @ApiProperty()
  @Expose()
  readonly name: string;

  @ApiProperty()
  @Expose()
  readonly categoryName: string;

  @ApiProperty()
  @Expose()
  readonly categoryGroupName: string;

  @ApiProperty()
  @Expose()
  readonly categoryGroupCode: string;

  @ApiProperty()
  @Expose()
  readonly phone: string;

  @ApiProperty()
  @Expose()
  readonly addressName: string;

  @ApiProperty()
  @Expose()
  readonly roadAddressName: string;

  @ApiProperty()
  @Expose()
  readonly lat: number;

  @ApiProperty()
  @Expose()
  readonly lng: number;

  @ApiProperty()
  @Expose()
  readonly placeUrl: string;

  readonly oid: string;
}

export class PlaceListDto {
  @ApiProperty({ type: [PlaceDto] })
  @Type(() => PlaceDto)
  @Expose()
  readonly list: PlaceDto[];

  @ApiProperty()
  @Expose()
  readonly count: number;
}
