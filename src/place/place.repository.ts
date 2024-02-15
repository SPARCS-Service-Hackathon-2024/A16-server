import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlaceRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService,
  ) {}

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
    return data;
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
