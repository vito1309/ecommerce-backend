import { TypeOrmModule } from "@nestjs/typeorm";
import { Brand } from "./brand.entity";
import { BrandService } from "./brand.service";
import { BrandController } from "./brand.controller";
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandService],
  controllers: [BrandController],
})

export class BrandModule {}