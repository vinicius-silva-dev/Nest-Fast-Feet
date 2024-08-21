/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { FetchNearbyPackageUseCase } from 'src/domain/fast-feet/application/use-case/package/fetch-nearby-package'
// import { z } from 'zod';

// const envSchema = z.object({
//   latitude: z.coerce.number(),
//   longitude: z.coerce.number()
// })

// type Distance = z.infer<typeof envSchema>

@Controller('/package/:latitude/:longitude')
export class FetchNearbyPackageController {
  constructor(private fetchNearbyUseCase: FetchNearbyPackageUseCase) {}

  @Get()
  async fetchNearby(
    @Param('latitude') latitude: number,
    @Param('longitude') longitude: number,
  ) {

    const result = await this.fetchNearbyUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude
    })

    if (!result) {
      throw new Error('Package not found')
    }

    return result._package
  }
}
