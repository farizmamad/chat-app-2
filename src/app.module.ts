import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiversModule } from './broadcasters/broadcasters.module';

@Module({
  imports: [ReceiversModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
