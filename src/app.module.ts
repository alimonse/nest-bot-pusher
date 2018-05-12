import { BotService } from './bot/bot.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  components: [BotService],
})
export class AppModule {}
