import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class SameNameDto {
  @ApiProperty()
  @Expose()
  readonly region: string[];

  @ApiProperty()
  @Expose()
  readonly keyword: string;

  @ApiProperty()
  @Expose()
  readonly selectedRegion: string;
}

export class MetaDto {
  @ApiProperty()
  @Expose()
  readonly totalCount: number;

  @ApiProperty()
  @Expose()
  readonly pageableCount: number;

  @ApiProperty()
  @Expose()
  readonly isEnd: boolean;

  @ApiProperty()
  @Type(() => SameNameDto)
  @Expose()
  readonly sameName: SameNameDto;
}

export class DocumentDto {
  @ApiProperty()
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  readonly placeName: string;

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
  readonly x: string;

  @ApiProperty()
  @Expose()
  readonly y: string;

  @ApiProperty()
  @Expose()
  readonly placeUrl: string;
  readonly distance: string;
}

export class SearchResultDto {
  @ApiProperty()
  @Expose()
  @Type(() => MetaDto)
  readonly meta: MetaDto;

  @ApiProperty()
  @Expose()
  @Type(() => DocumentDto)
  readonly documents: DocumentDto[];
}
