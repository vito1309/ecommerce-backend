import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "../entities/city.entity";
import { CityService } from "../services/city.service";
import { CityController } from "../controllers/city.controller";
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityService],
  controllers: [CityController],
})

export class CityModule {}