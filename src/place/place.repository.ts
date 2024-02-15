import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { objectToCamel } from 'ts-case-convert';
import { SearchResultDto } from './dto/search-result.dto';
import { Region } from 'src/review/enums/review-region.enum';

@Injectable()
export class PlaceRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService,
  ) {}

  async count() {
    return await this.prismaService.place.count();
  }

  async list({ skip, take }: { skip: number; take: number }) {
    return await this.prismaService.place.findMany({
      skip,
      take,
    });
  }

  async search(keyword: string) {
    const $ = this.httpService.get(
      'https://dapi.kakao.com/v2/local/search/keyword',
      {
        params: {
          query: keyword,
          radius: 20000,
          x: 127.3922689,
          y: 36.3407831,
        },
        headers: { Authorization: `KakaoAK ${this.configService.kakaoApiKey}` },
      },
    );
    const { data } = await firstValueFrom($);
    const result = plainToInstance(SearchResultDto, objectToCamel(data));
    await this.prismaService.$transaction(
      result.documents.map(({ id, placeName, x, y, distance: _, ...d }) =>
        this.prismaService.place.upsert({
          where: { oid: id },
          update: {
            ...d,
            name: placeName,
            lat: Number.parseFloat(x),
            lng: Number.parseFloat(y),
          },
          create: {
            ...d,
            region: Object.values(Region).filter((r) =>
              d.addressName.includes(r),
            )[0],
            oid: id,
            name: placeName,
            lat: Number.parseFloat(x),
            lng: Number.parseFloat(y),
          },
        }),
      ),
    );
    return result;
  }

  // async getOrCreatePlaceByAddress(address: string) {
  //   const exising = await this.prismaService.place.findUnique({
  //     where: { address },
  //   });
  //   if (exising) return exising;
  //   if (total_count === 0) throw new BadRequestException('address not found');
  //   if (total_count > 1) throw new BadRequestException('ambiguous address');
  //   const { address_name, x, y } = item;
  //   // return await this.prismaService.place.create({
  //   // data: { address: address_name,
  //   //   name:
  //   // },
  //   // });
  // }
}
