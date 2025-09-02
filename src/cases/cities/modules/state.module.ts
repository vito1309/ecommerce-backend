import { TypeOrmModule } from "@nestjs/typeorm";
import { State } from "../entities/state.entity";
import { StateService } from "../services/state.service";
import { StateController } from "../controllers/state.controller";
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StateService],
  controllers: [StateController],
})

export class StateModule {}