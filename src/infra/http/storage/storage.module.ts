/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { Uploader } from 'src/domain/fast-feet/application/storage/uploader';
import { EnvModule } from 'src/env/env.module';
import { R2Storage } from './r2-uploader';


@Module({
  imports: [EnvModule],
  providers: [ 
    {
      provide: Uploader,
      useClass: R2Storage
    }
  ],
  exports: [Uploader]
})
export class StorageModule {}
