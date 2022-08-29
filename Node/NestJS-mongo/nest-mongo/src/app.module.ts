import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/products.module';

@Module({
  imports: [ProductModule, MongooseModule.forRoot(
    'mongodb+srv://luiss:12345@cluster0.tqpnazj.mongodb.net/nestJSDemo'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
